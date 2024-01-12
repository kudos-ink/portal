import NextLink from "next/link";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { Chip } from "@nextui-org/chip";
import { Link } from "@nextui-org/link";
import BugIcon from "@/assets/icons";
import { MyImage } from "@/components/ui/image";
import { SITE_CONFIG } from "@/data/config";

export const Navbar = () => {
  return (
    <NextUINavbar maxWidth="xl" position="sticky" isBordered>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <MyImage
              className="border rounded-small"
              src="/logo.png"
              alt="Kudos Logo"
              radius="sm"
              height={45}
              width={45}
            />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem>
          <Chip variant="bordered">alpha</Chip>
        </NavbarItem>
        <NavbarItem className="hidden sm:flex gap-2">
          <Link
            isExternal
            href={SITE_CONFIG.links.bugReport}
            target="_blank"
            aria-label="Bug report"
            title="Report a bug"
          >
            <Tooltip content="Report a bug">
              <Button
                size="sm"
                isIconOnly
                aria-label="Report a bug"
                variant="flat"
              >
                <BugIcon className="text-default-500" />
              </Button>
            </Tooltip>
          </Link>
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
