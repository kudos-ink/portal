"use client";

import React, { useState } from "react";
import { Spinner } from "@nextui-org/spinner";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Select, SelectItem } from "@nextui-org/select";
import { Job } from "@/types/job";
import { JobCard } from "./job-card";

interface JobListProps {
  initialJobs: Job[];
}

export const JobList = ({ initialJobs }: JobListProps) => {
  const [jobs] = useState<Job[]>(initialJobs);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(initialJobs);
  const [selectedJobType, setSelectedJobType] = useState<string>("all");
  const [selectedLocationType, setSelectedLocationType] = useState<string>("all");

  const jobTypes = [
    { value: "all", label: "All Types" },
    { value: "full-time", label: "Full-time" },
    { value: "part-time", label: "Part-time" },
    { value: "contract", label: "Contract" },
    { value: "internship", label: "Internship" },
  ];

  const locationTypes = [
    { value: "all", label: "All Locations" },
    { value: "remote", label: "Remote" },
    { value: "hybrid", label: "Hybrid" },
    { value: "on-site", label: "On-site" },
  ];

  const handleFilterChange = (jobType: string, locationType: string) => {
    let filtered = jobs;

    if (jobType !== "all") {
      filtered = filtered.filter(job => job.jobType === jobType);
    }

    if (locationType !== "all") {
      filtered = filtered.filter(job => job.locationType === locationType);
    }

    setFilteredJobs(filtered);
  };

  const handleJobTypeChange = (value: string) => {
    setSelectedJobType(value);
    handleFilterChange(value, selectedLocationType);
  };

  const handleLocationTypeChange = (value: string) => {
    setSelectedLocationType(value);
    handleFilterChange(selectedJobType, value);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Select
          label="Job Type"
          placeholder="Select job type"
          selectedKeys={[selectedJobType]}
          onChange={(e) => handleJobTypeChange(e.target.value)}
          className="max-w-xs"
        >
          {jobTypes.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </Select>

        <Select
          label="Location Type"
          placeholder="Select location type"
          selectedKeys={[selectedLocationType]}
          onChange={(e) => handleLocationTypeChange(e.target.value)}
          className="max-w-xs"
        >
          {locationTypes.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </Select>
      </div>

      {/* Job Count */}
      <div className="mb-6">
        <p className="text-default-600">
          Showing <span className="font-semibold">{filteredJobs.length}</span> {filteredJobs.length === 1 ? 'job' : 'jobs'}
        </p>
      </div>

      {/* Job Cards */}
      <div className="flex flex-col gap-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))
        ) : (
          <div className="text-center text-default-500 py-16">
            <h3 className="text-xl font-semibold">No jobs found</h3>
            <p>Try adjusting your filters to see more results.</p>
          </div>
        )}
      </div>
    </div>
  );
};
