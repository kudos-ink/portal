import { Job } from "@/types/job";

// Mock job data - to be replaced with real API calls later
const mockJobs: Job[] = [
  {
    id: 1,
    title: "Senior Rust Developer",
    company: "Parity Technologies",
    description: "We're looking for an experienced Rust developer to work on Substrate and Polkadot core infrastructure. You'll be contributing to the future of decentralized web technologies.",
    location: "Berlin, Germany",
    locationType: "hybrid",
    jobType: "full-time",
    salaryMin: 80000,
    salaryMax: 120000,
    salaryCurrency: "EUR",
    requirements: [
      "5+ years of experience in software development",
      "3+ years of Rust programming experience",
      "Strong understanding of blockchain technology",
      "Experience with async programming and multi-threading",
      "Excellent problem-solving skills"
    ],
    responsibilities: [
      "Design and implement core protocol features",
      "Review code and mentor junior developers",
      "Collaborate with cross-functional teams",
      "Write technical documentation",
      "Optimize performance and ensure code quality"
    ],
    benefits: [
      "Competitive salary and equity",
      "Flexible working hours",
      "Remote-friendly culture",
      "Learning and development budget",
      "Health insurance"
    ],
    applyUrl: "https://parity.io/jobs",
    applyEmail: null,
    project: null,
    tags: ["rust", "blockchain", "substrate", "polkadot"],
    createdAt: "2026-01-10T10:00:00Z",
    updatedAt: null,
    expiresAt: "2026-03-10T10:00:00Z",
    isActive: true,
  },
  {
    id: 2,
    title: "Frontend Developer (React/TypeScript)",
    company: "Acala Network",
    description: "Join our team building the next generation of DeFi applications on Polkadot. We're looking for a talented frontend developer passionate about web3.",
    location: "Remote",
    locationType: "remote",
    jobType: "full-time",
    salaryMin: 70000,
    salaryMax: 100000,
    salaryCurrency: "USD",
    requirements: [
      "3+ years of React development experience",
      "Strong TypeScript skills",
      "Experience with Web3 libraries (ethers.js, polkadot.js)",
      "Understanding of DeFi concepts",
      "Excellent UI/UX sensibilities"
    ],
    responsibilities: [
      "Build and maintain DeFi user interfaces",
      "Integrate with blockchain APIs",
      "Collaborate with designers and backend developers",
      "Ensure cross-browser compatibility",
      "Implement responsive designs"
    ],
    benefits: [
      "100% remote work",
      "Token allocation",
      "Annual company retreats",
      "Cutting-edge tech stack",
      "Collaborative team environment"
    ],
    applyUrl: null,
    applyEmail: "careers@acala.network",
    project: null,
    tags: ["react", "typescript", "web3", "defi"],
    createdAt: "2026-01-12T14:30:00Z",
    updatedAt: null,
    expiresAt: "2026-02-28T23:59:59Z",
    isActive: true,
  },
  {
    id: 3,
    title: "Smart Contract Developer",
    company: "Moonbeam Network",
    description: "Help us build the future of cross-chain smart contracts. We're seeking a developer experienced in Solidity and Substrate to work on our EVM-compatible parachain.",
    location: "United States",
    locationType: "remote",
    jobType: "contract",
    salaryMin: 100,
    salaryMax: 150,
    salaryCurrency: "USD",
    requirements: [
      "Strong Solidity development skills",
      "Experience with Ethereum development tools",
      "Understanding of Substrate framework",
      "Security-first mindset",
      "Experience with testing frameworks"
    ],
    responsibilities: [
      "Develop and audit smart contracts",
      "Implement cross-chain functionality",
      "Write comprehensive tests",
      "Collaborate with the core team",
      "Document contract architectures"
    ],
    benefits: [
      "Competitive hourly rate",
      "Flexible schedule",
      "Work with cutting-edge technology",
      "Potential for full-time conversion"
    ],
    applyUrl: "https://moonbeam.network/careers",
    applyEmail: null,
    project: null,
    tags: ["solidity", "smart-contracts", "evm", "substrate"],
    createdAt: "2026-01-08T09:15:00Z",
    updatedAt: null,
    expiresAt: "2026-02-15T23:59:59Z",
    isActive: true,
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "Subscan",
    description: "We're looking for a DevOps engineer to help scale our blockchain explorer infrastructure. Experience with Kubernetes and cloud platforms required.",
    location: "Singapore",
    locationType: "on-site",
    jobType: "full-time",
    salaryMin: 60000,
    salaryMax: 90000,
    salaryCurrency: "SGD",
    requirements: [
      "3+ years DevOps experience",
      "Kubernetes and Docker expertise",
      "AWS or GCP experience",
      "Infrastructure as Code (Terraform/Ansible)",
      "Monitoring and observability tools"
    ],
    responsibilities: [
      "Manage and scale infrastructure",
      "Implement CI/CD pipelines",
      "Monitor system performance",
      "Ensure high availability",
      "Automate deployment processes"
    ],
    benefits: [
      "Competitive salary",
      "Visa sponsorship available",
      "Modern office in Singapore",
      "Professional development opportunities",
      "Health and dental coverage"
    ],
    applyUrl: null,
    applyEmail: "hr@subscan.io",
    project: null,
    tags: ["devops", "kubernetes", "aws", "infrastructure"],
    createdAt: "2026-01-15T11:00:00Z",
    updatedAt: null,
    expiresAt: "2026-03-15T23:59:59Z",
    isActive: true,
  },
  {
    id: 5,
    title: "Blockchain Intern",
    company: "Web3 Foundation",
    description: "Join our team for a 6-month internship working on various Polkadot ecosystem projects. Perfect for students or recent graduates passionate about blockchain.",
    location: "Zug, Switzerland",
    locationType: "hybrid",
    jobType: "internship",
    salaryMin: 2000,
    salaryMax: 3000,
    salaryCurrency: "CHF",
    requirements: [
      "Currently pursuing or recently completed degree in Computer Science",
      "Basic programming skills (any language)",
      "Interest in blockchain technology",
      "Good communication skills",
      "Eagerness to learn"
    ],
    responsibilities: [
      "Assist with project development",
      "Write documentation",
      "Participate in code reviews",
      "Research blockchain technologies",
      "Support community initiatives"
    ],
    benefits: [
      "Mentorship from industry experts",
      "Exposure to cutting-edge blockchain tech",
      "Potential for full-time offer",
      "Networking opportunities",
      "Flexible working arrangements"
    ],
    applyUrl: "https://web3.foundation/careers",
    applyEmail: null,
    project: null,
    tags: ["internship", "blockchain", "entry-level", "polkadot"],
    createdAt: "2026-01-14T16:00:00Z",
    updatedAt: null,
    expiresAt: "2026-02-14T23:59:59Z",
    isActive: true,
  },
];

// Function to get all jobs
export async function getAllJobs(): Promise<Job[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockJobs.filter(job => job.isActive);
}

// Function to get a single job by ID
export async function getJobById(id: number): Promise<Job | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  const job = mockJobs.find(job => job.id === id);
  return job || null;
}

// Function to filter jobs
export async function getFilteredJobs(filters: {
  jobType?: string;
  locationType?: string;
  tags?: string[];
}): Promise<Job[]> {
  await new Promise(resolve => setTimeout(resolve, 300));

  let filtered = mockJobs.filter(job => job.isActive);

  if (filters.jobType) {
    filtered = filtered.filter(job => job.jobType === filters.jobType);
  }

  if (filters.locationType) {
    filtered = filtered.filter(job => job.locationType === filters.locationType);
  }

  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter(job =>
      filters.tags!.some(tag => job.tags.includes(tag.toLowerCase()))
    );
  }

  return filtered;
}
