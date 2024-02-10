"use client";
import React from "react";
import Email from "./email";
import { container } from "./primitives";

const Community = () => {
  return (
    <div className={`pt-6 flex flex-col gap-4 ${container()}`}>
      <div className="flex flex-col gap-4 items-start overflow-hidden lg:flex-row lg:items-center">
        <div className="flex flex-nowrap overflow-x-auto overflow-y-hidden gap-4 w-full sm:w-auto xl:overflow-visible"></div>
        <div>
          <h3>Stay in the loop</h3>
          <h4>Join the mailling list</h4>
          <Email />
        </div>
        <div> community</div>
      </div>
    </div>
  );
};

export default Community;
