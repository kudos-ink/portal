export const getIconSrc = (name: string, avatar: string) => {
  const lowerCaseName = name.toLocaleLowerCase();

  const iconMappings: { [key: string]: string } = {
    polkadot: "/images/polkadot-logo.png",
    "substrate-tooling": "/images/substrate-logo.png",
    "substrate-libraries": "/images/substrate-logo.png",
  };

  return iconMappings[lowerCaseName] || avatar;
};
