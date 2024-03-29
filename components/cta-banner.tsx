"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { Skeleton } from "@nextui-org/skeleton";
import { SITE_CONFIG } from "@/data/config";
import { IS_PROJECT_CTA_BANNER_CLOSED } from "@/data/local-storage";
import useClientReady from "@/hooks/useClientReady";

interface ICtaBannerProps {}

const CtaBanner = ({}: ICtaBannerProps) => {
  const isClientReady = useClientReady();
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem(IS_PROJECT_CTA_BANNER_CLOSED, "true");
  };

  useEffect(() => {
    const isBannerClosed =
      localStorage.getItem(IS_PROJECT_CTA_BANNER_CLOSED) === "true";
    setIsVisible(!isBannerClosed);
  }, []);

  if (!isClientReady) {
    return (
      <Skeleton className="w-full rounded-lg">
        <div className="h-16 w-full rounded-lg bg-default-200"></div>
      </Skeleton>
    );
  }

  if (!isVisible) {
    return null;
  }

  return (
    <Card
      classNames={{
        base: "bg-primary",
        body: "flex flex-col items-center justify-center gap-4 lg:flex-row lg:gap-8",
      }}
    >
      <CardBody>
        <p className="text-center font-semibold">
          Maintaining a project? Reach +2000 builders on the #1 Polkadot ⭕️
          ecosystem contribution hub
        </p>
        <div className="flex items-center gap-2">
          <Link
            isExternal
            href={SITE_CONFIG.links.includeProject}
            target="_blank"
            aria-label="Include your project"
            title="Include your project"
          >
            <Button className="font-semibold" color="danger">
              Include your project
            </Button>
          </Link>
          <Button
            className="font-semibold border-large hover:underline"
            color="danger"
            variant="bordered"
            onClick={handleClose}
          >
            Hide this
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default CtaBanner;
