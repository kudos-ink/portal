"use client";
import React from "react";
import Email from "./email";
import { container, subtitle, title } from "./primitives";

const Community = () => {
  return (
    <div className={`pt-6 flex flex-col gap-4 ${container()}`}>
      <div className="flex flex-col gap-4 items-start overflow-hidden lg:flex-row lg:items-center">
        <div className="flex flex-nowrap overflow-x-auto overflow-y-hidden gap-4 w-full sm:w-auto xl:overflow-visible"></div>
        <div>
          <h3 className={subtitle()}>Stay in the loop</h3>
          <h4 className="pb-4">
            Join our mailing list to stay in the loop with our newest feature
            releases.
          </h4>
          <Email />
        </div>
        <div>
          <h3 className={subtitle()}>Join the community</h3>
        </div>
      </div>
    </div>
  );
};

export default Community;
