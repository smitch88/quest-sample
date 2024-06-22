export const navigationLinks = ({ isAuthenticated, user }) => {
  return [
    {
      href: "/quests",
      enabled: true,
      label: "Questing",
    },
    {
      href: "/leaderboard",
      enabled: true,
      label: "Leaderboard",
    },
    {
      href: "/fantasy",
      enabled: true,
      label: "Fantasy",
    },
    {
      href: "/mods",
      enabled: true,
      label: "Mods",
    },
    {
      href: "/my-assets",
      enabled: true,
      label: "My Assets",
    },
    {
      href: "/admin",
      enabled:
        isAuthenticated &&
        (user?.scope === "admin" || user?.scope === "moderator"),
      label: "Admin",
    },
  ].filter((item) => item.enabled);
};
