import ProfileMetrics from "@/components/profile/profile-metrics";
import ProfileEngagements from "@/components/profile/profile-engagements";
import { notFound } from "next/navigation";
import { getUserByUsername } from "@/api/core/users";
import { ContributorProfile } from "@/types/profile";
import { UserAvatar } from "@/components/table/row";
import { Chip } from "@nextui-org/chip";
import { TwitterIcon, TelegramIcon } from "@/assets/icons";

interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  
  try {
    const user = await getUserByUsername(username);

    if (!user) {
      notFound();
    }

    // Adapt User to ContributorProfile with defaults for missing fields
    const profile: ContributorProfile = {
      ...user,
      skills: user.skills?.filter((s): s is string => !!s) || [],
      interests: user.interests?.filter((i): i is string => !!i) || [],
      bio: user.bio || "",
      isOpenToWork: false,
      metrics: {
        totalContributions: 0,
        contributionsLast30Days: 0,
        rewardsEarned: 0,
        rewardsLast30Days: 0,
        activeEngagements: 0,
        pullRequestsOpened: 0,
        pullRequestsMerged: 0,
        kudosIssuesSolved: 0,
        currentStreakDays: 0,
      },
      engagements: [],
    };

    return (
      <div className="container mx-auto max-w-7xl px-6 pb-12">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           
           {/* Left Column: Identity & Socials */}
           <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-gradient-to-r from-background to-background-200 to-80% p-6 border-[1px] rounded-md flex flex-col items-center text-center gap-4">
                 <UserAvatar
                   src={user.avatar}
                   alt={user.username}
                   className="w-32 h-32 text-large"
                 />
                 <div>
                    <h1 className="text-2xl font-bold">{user.username}</h1>
                    <p className="text-default-500 text-sm">{user.email}</p>
                 </div>
  
                 {profile.bio && (
                   <div className="w-full text-left mt-2 p-3 rounded-md border border-default-100 flex items-center justify-center">
                     <p className="text-sm text-default-600 whitespace-pre-wrap">{profile.bio}</p>
                   </div>
                 )}
  
                 <div className="w-full flex flex-col gap-3 mt-2">
                   {/* Twitter Read-Only */}
                   {profile.twitter && (
                      <a 
                        href={`https://x.com/${profile.twitter}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-md border border-default-200 hover:bg-default-100 transition-colors"
                      >
                         <TwitterIcon size={20} className="text-default-600" />
                         <span className="text-sm font-medium">@{profile.twitter}</span>
                      </a>
                   )}

                   {/* Telegram Read-Only */}
                   {profile.telegram && (
                      <a 
                        href={`https://t.me/${profile.telegram}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-md border border-default-200 hover:bg-default-100 transition-colors"
                      >
                         <TelegramIcon size={20} className="text-default-600" />
                         <span className="text-sm font-medium">{profile.telegram}</span>
                      </a>
                   )}
                 </div>
              </div>
           </div>
  
           {/* Right Column: Metrics, Skills, Engagements */}
           <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* Metrics Block */}
              <ProfileMetrics metrics={profile.metrics} />

              {/* Skills & Interests Block */}
              <div className="bg-gradient-to-r from-background to-background-200 to-80% p-6 border-[1px] rounded-md flex flex-col gap-6">
                 <div>
                    <h3 className="text-lg font-semibold mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.length > 0 ? (
                        profile.skills.map((skill) => (
                          <Chip
                            key={skill}
                            variant="flat"
                            color="primary"
                            className="capitalize"
                          >
                            {skill}
                          </Chip>
                        ))
                      ) : (
                        <p className="text-default-400 text-sm">No skills listed</p>
                      )}
                    </div>
                 </div>
  
                 <div>
                    <h3 className="text-lg font-semibold mb-2">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                       {profile.interests.length > 0 ? (
                          profile.interests.map((interest) => (
                            <Chip
                              key={interest}
                              variant="bordered"
                              color="primary"
                              className="capitalize"
                            >
                              {interest}
                            </Chip>
                          ))
                       ) : (
                          <p className="text-default-400 text-sm">No interests listed</p>
                       )}
                    </div>
                 </div>
              </div>

              {/* Engagements Block */}
              <ProfileEngagements engagements={profile.engagements} />
           </div>
  
         </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    notFound(); 
  }
}
