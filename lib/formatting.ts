import { formatDistance, format } from "date-fns";
import { last } from "lodash";

export function shortAddress(address: any) {
  if (!address) return "";
  if (address?.length < 10) return address;
  return `${address?.substring(0, 6)}...${address?.substring(
    address?.length - 6,
    address?.length
  )}`;
}

export const toSqlDatetime = (date) => {
  const dateWithOffset = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  );
  return dateWithOffset.getTime();
};

export const formatDate = (date, formatter = "MM/dd/yyyy") => {
  return format(new Date(date), formatter);
};

export const generateIntentLink = (link, type, conditions) => {
  if (type === "TWITTER_PROFILE") {
    return `https://twitter.com/intent/follow?screen_name=${last(
      link?.split("/")
    )}`;
  } else if (type === "DISCORD_ACTIVITY") {
    return `https://discord.gg/sparkball`;
  } else if (type === "TWITTER_POST_ENGAGEMENT") {
    const firstType = Object.keys(conditions?.[0])?.[0];
    const values = link?.split("/");
    switch (firstType) {
      case "HAS_LIKED_IN_X":
        return `https://twitter.com/intent/like?tweet_id=${last(values)}`;
      case "HAS_COMMENTED_IN_X":
        return link; // `https://twitter.com/intent/tweet?in_reply_to=${last(values)}`;
      case "HAS_REPOSTED_IN_X":
        return `https://twitter.com/intent/retweet?tweet_id=${last(values)}`;
      default:
        return link;
    }
  }
  return link;
};

export const generateIntentCTA = (link, type, conditions) => {
  if (type === "TWITTER_PROFILE") {
    return `Follow @${last(link?.split("/"))}`;
  } else if (type === "DISCORD_ACTIVITY") {
    return `Join Server`;
  } else if (type === "TWITTER_POST_ENGAGEMENT") {
    const firstType = Object.keys(conditions?.[0])?.[0];
    const values = link?.split("/");
    switch (firstType) {
      case "HAS_LIKED_IN_X":
        return `Like Post`;
      case "HAS_COMMENTED_IN_X":
        return `View Post`;
      case "HAS_REPOSTED_IN_X":
        return `Repost Post`;
      default:
        return "View Post";
    }
  }
  return "View Post";
};
