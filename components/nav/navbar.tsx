"use client";

import NextLink from "next/link";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
} from "@nextui-org/navbar";
import { Chip } from "@nextui-org/chip";
import { MyImage } from "@/components/ui/image";

import { BugReport, CtaButton, FeedbackForms } from "./items";
import Separator from "./separator";
import SocialLinks from "./social-links";

const Navbar = () => {
  return (
    <NextUINavbar maxWidth="xl" position="static" isBordered>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <MyImage
              src="/logo.svg"
              alt="Kudos Logo"
              radius="sm"
              height={45}
              width={45}
            />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <div>
          <Chip variant="bordered">alpha</Chip>
        </div>
        <div className="hidden sm:flex gap-4 items-center">
          <BugReport />
          <FeedbackForms />
          <Separator />
        </div>
        <div className="flex gap-4 items-center">
          <SocialLinks />
          <Separator />
        </div>
        <div className="hidden sm:flex gap-4 items-center">
          <CtaButton />
        </div>
      </NavbarContent>
    </NextUINavbar>
  );
};

export default Navbar;
