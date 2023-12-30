/* eslint-disable jsx-a11y/alt-text */
"use client";
import React, { FC } from "react";
import { Image, ImageProps } from "@nextui-org/image";
import NextImage, { ImageProps as NextImageProps } from "next/image";

type CommonProps = Omit<NextImageProps, "src" | "alt" | "width" | "height"> &
  Omit<ImageProps, "src" | "alt" | "width" | "height">;

interface MyImageProps extends CommonProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}
export const MyImage: FC<MyImageProps> = (props) => {
  return <Image as={NextImage} {...props} />;
};

export default MyImage;
