export const typeToLabel = {
  DISCORD_ACTIVITY: "Discord",
  TWITTER_POST_ENGAGEMENT: "X Engagement",
  TWITTER_PROFILE: "Follow",
  OTHER: "Other",
};

export const typeToLinkLabel = {
  DISCORD_ACTIVITY: "Join Server",
  TWITTER_POST_ENGAGEMENT: "View Post",
  TWITTER_PROFILE: "View Profile",
};

export const typeToCTALabel = {
  DISCORD_ACTIVITY: "Verify Join",
  TWITTER_POST_ENGAGEMENT: "Verify Engagement",
  TWITTER_PROFILE: "Verify Follow",
};

/*
claim_amount: 10,
        claimed_amount: 0,
        created_at: "2024-05-12T03:42:14.697000",
        expired: false,
        expires_at: "2024-05-12T04:42:07.664000",
        note: { text: "", title: "" },
        required_role: null,
        role_reward: 1020374152483459103,
        total_amount: 0,
        type: "QUEST",
 */

/*
 requirements: [
        {
          conditions: [{ HAS_LIKED_IN_X: { value: "True" } }],
          link: "https://twitter.com/BrawlerBearz/status/1788974787471028306",
          type: "TWITTER_POST_ENGAGEMENT",
        },
      ],
 */

export const normalizeQuests = (quests = []) => {
  return quests?.map(({ _id, quest_data: data, requirements, submissions }) => {
    return {
      data: {
        id: _id,
        xp: data.claim_amount,
        isExpired: data?.expired,
        activeUntil: data?.expires_at,
        title: data?.note?.title,
        description: data?.note?.text,
        typeKey: requirements?.[0]?.type,
        type:
          typeToLabel[requirements?.[0]?.type || "OTHER"] ?? typeToLabel.OTHER,
      },
      requirements,
      submissions,
    };
  });
};

export const getQuests = async () => {
  try {
    if (!process.env.REALM_ID || !process.env.DRIP_API_KEY) {
      return [];
    }
    const uri = `${process.env.DRIP_BASE_URI}/quests/realms/${process.env.REALM_ID}/quests`;

    return await fetch(uri, {
      method: "GET",
      headers: {
        authorization: `Bearer ${process.env.DRIP_API_KEY}`,
      },
      next: { revalidate: 1 },
    })
      .then((res) => res.json())
      .then(normalizeQuests);
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const getQuestCompletionStatus = async (twitterId, id) => {
  try {
    if (!process.env.REALM_ID || !process.env.DRIP_API_KEY) {
      return null;
    }
    const uri = `${process.env.DRIP_BASE_URI}/quests/realms/${process.env.REALM_ID}/members/${twitterId}/quests/${id}/status`;

    return await fetch(uri, {
      method: "GET",
      headers: {
        authorization: `Bearer ${process.env.DRIP_API_KEY}`,
      },
      next: { revalidate: 60 },
    }).then((res) => res.json());
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getQuestById = async (id) => {
  try {
    if (!process.env.REALM_ID || !process.env.DRIP_API_KEY) {
      return null;
    }
    const uri = `${process.env.DRIP_BASE_URI}/quests/realms/${process.env.REALM_ID}/quests/${id}`;
    return await fetch(uri, {
      method: "GET",
      headers: {
        authorization: `Bearer ${process.env.DRIP_API_KEY}`,
      },
      next: { revalidate: 3600 },
    }).then((res) => res.json());
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const completeQuest = async (memberId, id) => {
  try {
    if (!process.env.REALM_ID || !process.env.DRIP_API_KEY) {
      return null;
    }
    const uri = `${process.env.DRIP_BASE_URI}/quests/realms/${process.env.REALM_ID}/members/${memberId}/quests/${id}/fulfillment`;
    return fetch(uri, {
      method: "POST",
      headers: {
        authorization: `Bearer ${process.env.DRIP_API_KEY}`,
      },
    }).then((res) => res.json());
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const hasGuildMember = async (discordId) => {
  try {
    if (!process.env.REALM_ID || !process.env.DRIP_API_KEY) {
      return null;
    }
    const uri = `${process.env.DRIP_BASE_URI}/quests/realms/${process.env.REALM_ID}/members/${discordId}`;

    return await fetch(uri, {
      method: "GET",
      headers: {
        authorization: `Bearer ${process.env.DRIP_API_KEY}`,
      },
      next: { revalidate: 60 },
    }).then((res) => res.json());
  } catch (e) {
    console.log(e);
    return null;
  }
};
