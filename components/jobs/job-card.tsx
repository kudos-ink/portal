"use client";

import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { Job } from "@/types/job";

interface JobCardProps {
  job: Job;
}

const getJobTypeColor = (jobType: string) => {
  switch (jobType) {
    case 'full-time':
      return 'success';
    case 'part-time':
      return 'warning';
    case 'contract':
      return 'primary';
    case 'internship':
      return 'secondary';
    default:
      return 'default';
  }
};

const getLocationTypeLabel = (locationType: string) => {
  switch (locationType) {
    case 'remote':
      return 'Remote';
    case 'hybrid':
      return 'Hybrid';
    case 'on-site':
      return 'On-site';
    default:
      return locationType;
  }
};

export const JobCard = ({ job }: JobCardProps) => {
  const formatSalary = () => {
    if (!job.salaryMin || !job.salaryMax || !job.salaryCurrency) {
      return null;
    }

    // For hourly rates (contract positions)
    if (job.jobType === 'contract') {
      return `${job.salaryCurrency} ${job.salaryMin}-${job.salaryMax}/hr`;
    }

    // For monthly rates (internships)
    if (job.jobType === 'internship') {
      return `${job.salaryCurrency} ${job.salaryMin.toLocaleString()}-${job.salaryMax.toLocaleString()}/mo`;
    }

    // For annual salaries
    return `${job.salaryCurrency} ${job.salaryMin.toLocaleString()}-${job.salaryMax.toLocaleString()}/yr`;
  };

  const salary = formatSalary();

  return (
    <Card className="w-full bg-gradient-to-r from-background to-background-100 to-80% border-[1px] rounded-md hover:border-primary transition-colors">
      <Link href={`/jobs/${job.id}`} className="cursor-pointer group">
        <CardHeader className="flex flex-col items-start gap-2 p-6 pb-4">
          <div className="flex justify-between items-start w-full">
            <div className="flex-1">
              <h4 className="font-bold text-xl group-hover:text-primary transition-colors">
                {job.title}
              </h4>
              <p className="text-default-600 text-md mt-1">{job.company}</p>
            </div>
          </div>
        </CardHeader>

        <CardBody className="px-6 py-0">
          <p className="text-default-500 line-clamp-2 mb-4">
            {job.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-2">
            <Chip
              size="sm"
              variant="flat"
              color={getJobTypeColor(job.jobType)}
            >
              {job.jobType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </Chip>
            <Chip
              size="sm"
              variant="flat"
              color="default"
            >
              {getLocationTypeLabel(job.locationType)}
            </Chip>
            {salary && (
              <Chip
                size="sm"
                variant="flat"
                color="default"
              >
                {salary}
              </Chip>
            )}
          </div>
        </CardBody>

        <CardFooter className="flex justify-between items-center pt-4 px-6 pb-6 border-t-1 border-default-100 mt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-default-500">{job.location}</span>
          </div>
          <div className="flex flex-wrap gap-1 max-w-[50%]">
            {job.tags.slice(0, 3).map((tag, index) => (
              <Chip
                key={index}
                size="sm"
                variant="bordered"
                className="text-xs"
              >
                {tag}
              </Chip>
            ))}
            {job.tags.length > 3 && (
              <Chip
                size="sm"
                variant="bordered"
                className="text-xs"
              >
                +{job.tags.length - 3}
              </Chip>
            )}
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};
