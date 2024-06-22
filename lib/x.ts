import { kv } from "@vercel/kv";
import { map } from "lodash";

const TWITTER_APIS = {
  135: {
    host: "twitter135.p.rapidapi.com",
    key: process.env.RAPID_API_KEY,
  },
  241: {
    host: "twitter241.p.rapidapi.com",
    key: process.env.RAPID_API_KEY,
  },
};

export const fetchRelevantTweets = async ({
  terms,
  limit = 100,
  authors = {},
}) => {
  const encodedTerms = `(${terms
    ?.map((i) => `"${i.replace(/@|#/, "")}"`)
    .join(" or ")}) (${map(authors, (author) => author?.xProfile?.username)
    .filter(Boolean)
    .map((name) => `@${name}`)
    .join(" or ")})`;

  const url = `https://${TWITTER_APIS["135"].host}/Search/?q=${encodedTerms}&count=${limit}&type=Latest`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": TWITTER_APIS["135"].key,
      "X-RapidAPI-Host": TWITTER_APIS["135"].host,
    },
  };

  try {
    const cachedData = await kv.get(`relevant-tweets-${encodedTerms}`);

    if (cachedData) {
      return cachedData;
    }

    const response = await fetch(url, options);
    const { data } = await response.json();

    const { instructions } =
      data?.search_by_raw_query?.search_timeline?.timeline || {};

    if (!instructions) {
      return [];
    }

    const tweets = instructions
      ?.find((item) => item.type === "TimelineAddEntries")
      ?.entries?.filter((entry) => {
        return entry?.entryId?.startsWith("tweet-");
      });

    const records = tweets
      ?.map((tweet) => {
        const { conversation_id_str, id_str, created_at, user_id_str } =
          tweet?.content?.itemContent?.tweet_results?.result?.legacy || {};
        if (!authors[user_id_str] || !conversation_id_str) return;
        return {
          createdAt: created_at ? new Date(created_at).getTime() : null,
          conversationId: conversation_id_str,
          tweetId: id_str,
          type: "TWEET",
        };
      })
      .filter(Boolean);

    // Store in cache for 30 seconds
    await kv.set(`relevant-tweets-${encodedTerms}`, records, { ex: 120 });

    return records;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchTweetsByUser = async ({
  xId,
  limit = 100,
  condensed = true,
}) => {
  const url = `https://${TWITTER_APIS["135"].host}/v2/UserTweets/?id=${xId}&count=${limit}`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": TWITTER_APIS["135"].key,
      "X-RapidAPI-Host": TWITTER_APIS["135"].host,
    },
  };

  try {
    const cachedData = await kv.get(`relevant-tweets-by-user-${xId}`);

    if (cachedData) {
      return cachedData;
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      console.error("Issue with getting data");
      return [];
    }

    const { data } = await response.json();

    const { instructions } = data?.user?.result?.timeline_v2?.timeline || {};

    if (!instructions) {
      return [];
    }

    const tweets = instructions
      ?.find((item) => item.type === "TimelineAddEntries")
      ?.entries?.filter((entry) => {
        return entry?.entryId?.startsWith("tweet-");
      });

    const records = tweets
      ?.map((tweet) => {
        const { conversation_id_str, id_str, created_at } =
          tweet?.content?.itemContent?.tweet_results?.result?.legacy || {};
        if (!conversation_id_str) return;
        return {
          createdAt: created_at ? new Date(created_at).getTime() : null,
          conversationId: conversation_id_str,
          tweetId: id_str,
          type: "TWEET",
        };
      })
      .filter(Boolean);

    // Store in cache for 120 seconds
    await kv.set(`relevant-tweets-by-user-${xId}`, records, { ex: 120 });

    return records;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchLikesByUserRapid = async ({ xId }) => {
  const url = `https://${TWITTER_APIS["241"].host}/user-likes?user=${xId}&count=100`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": TWITTER_APIS["241"].key,
      "X-RapidAPI-Host": TWITTER_APIS["241"].host,
    },
  };

  try {
    const response = await fetch(url, options);

    const data = await response.json();

    const { instructions } = data?.result?.timeline || {};

    if (!instructions) {
      throw new Error("Error pulling in reply entries");
    }

    const timeline = instructions?.find(
      (item) => item.type === "TimelineAddEntries"
    );

    if (timeline) {
      const { entries } = timeline || {};
      return entries.reduce((acc, { entryId, content }) => {
        if (entryId.startsWith("tweet-")) {
          const { legacy, views } =
            content?.itemContent?.tweet_results.result || {};
          if (legacy) {
            acc.push({
              author_id: legacy?.user_id_str,
              public_metrics: {
                retweet_count: legacy?.retweet_count || 0,
                reply_count: legacy?.reply_count || 0,
                like_count: 0,
                quote_count: legacy?.quote_count || 0,
                bookmark_count: legacy?.quote_count,
                impression_count: views?.count || 0,
              },
              text: legacy?.full_text,
              conversation_id: legacy?.conversation_id_str,
              id: legacy?.id_str,
              created_at: legacy?.created_at,
            });
          }
        }
        return acc;
      }, []);
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchRepliesByUser = async ({ xId }) => {
  const url = `https://${TWITTER_APIS["241"].host}/user-replies?user=${xId}&count=100`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": TWITTER_APIS["241"].key,
      "X-RapidAPI-Host": TWITTER_APIS["241"].host,
    },
  };

  try {
    const response = await fetch(url, options);

    const data = await response.json();

    const { instructions } = data?.result?.timeline || {};

    if (!instructions) {
      throw new Error("Error pulling in reply entries");
    }

    const timeline = instructions?.find(
      (item) => item.type === "TimelineAddEntries"
    );

    if (timeline) {
      const { entries } = timeline || {};

      return entries.reduce((acc, { entryId, content }) => {
        if (entryId.startsWith("profile-conversation-")) {
          const items = content?.items || [];

          if (items.length > 0) {
            const toStore = items?.reduce((acc, { item }) => {
              const { legacy, views } =
                item?.itemContent?.tweet_results?.result || {};
              if (legacy) {
                const { in_reply_to_user_id_str } = legacy;

                if (
                  in_reply_to_user_id_str &&
                  in_reply_to_user_id_str !== xId
                ) {
                  acc.push({
                    author_id: legacy?.in_reply_to_user_id_str,
                    public_metrics: {
                      retweet_count: legacy?.retweet_count || 0,
                      reply_count: legacy?.reply_count || 0,
                      like_count: 0,
                      quote_count: legacy?.quote_count || 0,
                      bookmark_count: legacy?.quote_count,
                      impression_count: views?.count || 0,
                    },
                    text: legacy?.full_text,
                    conversation_id: legacy?.conversation_id_str,
                    id: legacy?.id_str,
                    created_at: legacy?.created_at,
                  });
                }
              }
              return acc;
            }, []);

            if (toStore?.length > 0) {
              acc = acc.concat(toStore);
            }
          }
        }
        return acc;
      }, []);
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchFollowersByUser = async ({ xId, lastCursorUsed = "" }) => {
  let url = `https://${
    TWITTER_APIS["135"].host
  }/v1.1/FollowersIds/?id=${xId}&count=5000${
    Boolean(lastCursorUsed) ? `&cursor=${lastCursorUsed}` : ""
  }`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": TWITTER_APIS["135"].key,
      "X-RapidAPI-Host": TWITTER_APIS["135"].host,
    },
  };

  let allIds = [];

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    let { ids, next_cursor } = data || {};

    if (!ids) {
      throw new Error("Error pulling in follower entries");
    }

    let lastCursor = next_cursor;
    allIds = allIds.concat(ids);

    while (next_cursor !== 0) {
      lastCursor = next_cursor;
      const url = `https://${TWITTER_APIS["135"].host}/v1.1/FollowersIds/?id=${xId}&count=5000&cursor=${next_cursor}`;
      const response = await fetch(url, options);
      const data = await response.json();
      ({ ids, next_cursor } = data || {});
      allIds = allIds.concat(ids);
    }

    return {
      ids: allIds,
      lastCursor,
    };
  } catch (error) {
    console.error(error);
  }
};

export const fetchFollowingsByUser = async ({ xId, lastCursorUsed = "" }) => {
  let url = `https://${
    TWITTER_APIS["135"].host
  }/v1.1/FollowingIds/?id=${xId}&count=5000${
    Boolean(lastCursorUsed) ? `&cursor=${lastCursorUsed}` : ""
  }`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": TWITTER_APIS["135"].key,
      "X-RapidAPI-Host": TWITTER_APIS["135"].host,
    },
  };

  let allIds = [];

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    let { ids, next_cursor } = data || {};

    if (!ids) {
      throw new Error("Error pulling in follower entries");
    }

    let lastCursor = next_cursor;
    allIds = allIds.concat(ids);

    while (next_cursor !== 0) {
      lastCursor = next_cursor;
      const url = `https://${TWITTER_APIS["135"].host}/v1.1/FollowingIds/?id=${xId}&count=5000&cursor=${next_cursor}`;
      const response = await fetch(url, options);
      const data = await response.json();
      ({ ids, next_cursor } = data || {});
      allIds = allIds.concat(ids);
    }

    return {
      ids: allIds,
      lastCursor,
    };
  } catch (error) {
    console.error(error);
  }
};

export const fetchUserById = async ({ xId }) => {
  const url = `https://${TWITTER_APIS["241"].host}/get-users?users=${xId}`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": TWITTER_APIS["241"].key,
      "X-RapidAPI-Host": TWITTER_APIS["241"].host,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const [user] = data?.result?.data?.users || {};

    if (!user) {
      throw new Error("Error pulling in user");
    }

    return user?.result?.legacy;
  } catch (error) {
    console.error(error);
  }
};
