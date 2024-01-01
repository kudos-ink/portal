import React, { FC } from "react";

interface EmojiProps {
  emoji: string;
  className?: string;
}

const Emoji: FC<EmojiProps> = ({ emoji, className }) => {
  return <span className={`emoji ${className}`}>{emoji}</span>;
};

export default Emoji;
