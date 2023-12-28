import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";

import React from "react";

export default function Row({
  projectName,
  repo,
  issueTitle,
  labels,
  openedDate,
  issueLink,
  image,
}: {
  projectName: string;
  repo: string;
  issueTitle: string;
  labels: string[];
  openedDate: string;
  issueLink: string;
  image: string;
}) {
  return (
    <Card className="my-5">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src={image}
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">{projectName}</p>
          <p className="text-small text-default-500">{repo}</p>
        </div>
      </CardHeader>
      <CardBody>
        <div className="flex justify-between gap-3">
          <p>{issueTitle}</p>

          <div>
            {labels.map((label, index) => {
              return (
                <Chip className="mx-1" key={index + label}>
                  {label}
                </Chip>
              );
            })}
          </div>
          <div className="flex gap-3">
            <div>{openedDate}</div>
            <Link
              isBlock
              showAnchorIcon
              href={issueLink}
              color="foreground"
            ></Link>
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <div className="flex flex-col">
          <p className="text-md">NextUI</p>
          <p className="text-small text-default-500">nextui.org</p>
        </div>
      </CardFooter>
    </Card>
  );
}
