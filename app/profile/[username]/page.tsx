import { getProfileByUsername } from "@/lib/api/profile";
import ProfileHeader from "@/components/profile/profile-header";
import ProfileMetrics from "@/components/profile/profile-metrics";
import ProfileSkills from "@/components/profile/profile-skills";
import ProfileEngagements from "@/components/profile/profile-engagements";
import { notFound } from "next/navigation";

interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  const profile = await getProfileByUsername(username);

  if (!profile) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-5xl px-6 pb-12 flex flex-col gap-8">
      <ProfileHeader profile={profile} />
      
      <ProfileMetrics metrics={profile.metrics} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileSkills 
          skills={profile.skills} 
          interests={profile.interests} 
        />
        <ProfileEngagements 
          engagements={profile.engagements} 
        />
      </div>
    </div>
  );
}
