export const getIconSrc = (slug: string, avatar: string | null) => {
  const lowerCaseName = slug.toLocaleLowerCase();

  const iconMappings: { [key: string]: string } = {
    astar: "/project-icons/astar.svg",
    polkadot: "/images/polkadot-logo.png",
    "substrate-tooling": "/images/substrate-logo.png",
    "substrate-libraries": "/images/substrate-logo.png",
    "substrate-testing": "/images/substrate-logo.png",
    "substrate-clients": "/images/substrate-logo.png",
    pluto: "/project-icons/pluto.png",
  };

  return iconMappings[lowerCaseName] || avatar;
};
