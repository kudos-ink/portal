"use client";

import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import Link from "next/link";
import { Job } from "@/types/job";

interface JobDetailViewProps {
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

export const JobDetailView = ({ job }: JobDetailViewProps) => {
  const formatSalary = () => {
    if (!job.salaryMin || !job.salaryMax || !job.salaryCurrency) {
      return null;
    }

    if (job.jobType === 'contract') {
      return `${job.salaryCurrency} ${job.salaryMin}-${job.salaryMax}/hr`;
    }

    if (job.jobType === 'internship') {
      return `${job.salaryCurrency} ${job.salaryMin.toLocaleString()}-${job.salaryMax.toLocaleString()}/mo`;
    }

    return `${job.salaryCurrency} ${job.salaryMin.toLocaleString()}-${job.salaryMax.toLocaleString()}/yr`;
  };

  const salary = formatSalary();

  const handleApply = () => {
    if (job.applyUrl) {
      window.open(job.applyUrl, '_blank');
    } else if (job.applyEmail) {
      window.location.href = `mailto:${job.applyEmail}?subject=Application for ${job.title}`;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/jobs">
          <Button variant="light" size="sm">
            ← Back to Jobs
          </Button>
        </Link>
      </div>

      {/* Main Job Card */}
      <Card className="bg-gradient-to-r from-background to-background-100 to-80% border-[1px]">
        <CardHeader className="flex flex-col items-start gap-4 p-8">
          <div className="w-full">
            <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
            <p className="text-xl text-default-600 mb-4">{job.company}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              <Chip
                variant="flat"
                color={getJobTypeColor(job.jobType)}
              >
                {job.jobType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </Chip>
              <Chip
                variant="flat"
                color="default"
              >
                {getLocationTypeLabel(job.locationType)}
              </Chip>
              <Chip
                variant="flat"
                color="default"
              >
                {job.location}
              </Chip>
              {salary && (
                <Chip
                  variant="flat"
                  color="primary"
                >
                  {salary}
                </Chip>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {job.tags.map((tag, index) => (
                <Chip
                  key={index}
                  size="sm"
                  variant="bordered"
                >
                  {tag}
                </Chip>
              ))}
            </div>
          </div>

          {/* Apply Button */}
          <Button
            color="primary"
            size="lg"
            className="w-full sm:w-auto font-semibold"
            onPress={handleApply}
            isDisabled={!job.applyUrl && !job.applyEmail}
          >
            {job.applyUrl ? 'Apply Now' : job.applyEmail ? 'Apply via Email' : 'Application Coming Soon'}
          </Button>
        </CardHeader>

        <Divider />

        <CardBody className="p-8 space-y-6">
          {/* Description */}
          <div>
            <h2 className="text-2xl font-semibold mb-3">About the Role</h2>
            <p className="text-default-600 leading-relaxed">{job.description}</p>
          </div>

          <Divider />

          {/* Requirements */}
          {job.requirements.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-3">Requirements</h2>
              <ul className="list-disc list-inside space-y-2">
                {job.requirements.map((req, index) => (
                  <li key={index} className="text-default-600">{req}</li>
                ))}
              </ul>
            </div>
          )}

          <Divider />

          {/* Responsibilities */}
          {job.responsibilities.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-3">Responsibilities</h2>
              <ul className="list-disc list-inside space-y-2">
                {job.responsibilities.map((resp, index) => (
                  <li key={index} className="text-default-600">{resp}</li>
                ))}
              </ul>
            </div>
          )}

          <Divider />

          {/* Benefits */}
          {job.benefits.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-3">Benefits</h2>
              <ul className="list-disc list-inside space-y-2">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="text-default-600">{benefit}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Apply Button (bottom) */}
          <div className="pt-4">
            <Button
              color="primary"
              size="lg"
              className="w-full sm:w-auto font-semibold"
              onPress={handleApply}
              isDisabled={!job.applyUrl && !job.applyEmail}
            >
              {job.applyUrl ? 'Apply Now' : job.applyEmail ? 'Apply via Email' : 'Application Coming Soon'}
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Additional Info */}
      <div className="mt-6 text-sm text-default-500 text-center">
        <p>
          Posted {new Date(job.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
        {job.expiresAt && (
          <p className="mt-1">
            Application deadline: {new Date(job.expiresAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        )}
      </div>
    </div>
  );
};
