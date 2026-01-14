"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getCurrentUser, updateEmailNotifications, updateProfile, User } from "@/api/core/users";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Chip } from "@nextui-org/chip";
import { Checkbox } from "@nextui-org/checkbox";
import { Spinner } from "@nextui-org/spinner";
import { UserAvatar } from "@/components/table/row";
import { TwitterIcon, TelegramIcon } from "@/assets/icons";
import {
  emojiMapForTechnologies,
  FPurposes,
  emojiMapForStackLevels
} from "@/data/filters";

const BIO_MAX_LENGTH = 160;

export default function ProfilePage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form State
  const [user, setUser] = useState<User | null>(null);
  const [bio, setBio] = useState("");
  const [twitter, setTwitter] = useState("");
  const [telegram, setTelegram] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [emailNotifs, setEmailNotifs] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!session?.accessToken) return;
      try {
        setLoading(true);
        const u = await getCurrentUser(session.accessToken as string);
        setUser(u);
        
        // Initialize form state
        setBio(u.bio || "");
        setTwitter(u.twitter || "");
        setTelegram(u.telegram || "");
        setSkills((u.skills || []).filter((s): s is string => !!s));
        setInterests((u.interests || []).filter((i): i is string => !!i));
        setEmailNotifs(u.email_notifications_enabled);
      } catch (e: any) {
        setError(e?.message || "Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [session]);

  const handleSave = async () => {
    if (!session?.accessToken) return;
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      // 1. Update Profile Fields
      const updatedUser = await updateProfile(session.accessToken as string, {
        bio,
        twitter: twitter || null,
        telegram: telegram || null,
        skills,
        interests,
      });

      // 2. Update Email Preferences
      await updateEmailNotifications(session.accessToken as string, emailNotifs);
      
      setUser({ ...updatedUser, email_notifications_enabled: emailNotifs });
      setSuccess("Profile updated successfully!");
    } catch (err: any) {
      setError(err?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const toggleSkill = (skill: string) => {
    setSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill) 
        : [...prev, skill]
    );
  };

  const toggleInterest = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest) 
        : [...prev, interest]
    );
  };

  const cleanHandle = (value: string) => {
    // Remove @, empty spaces, and full URLs if pasted
    let handle = value.trim();
    if (handle.startsWith("@")) handle = handle.slice(1);
    
    // Simple logic to strip url if user pasted full link
    const xPrefix = "x.com/";
    const tPrefix = "t.me/";
    if (handle.includes(xPrefix)) handle = handle.split(xPrefix)[1] || "";
    if (handle.includes(tPrefix)) handle = handle.split(tPrefix)[1] || "";
    
    return handle;
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto p-6 text-center text-danger">
        {error || "Please log in to view your profile"}
      </div>
    );
  }

  const skillOptions = Object.keys(emojiMapForTechnologies);
  const interestOptions = [
    ...FPurposes,
    ...Object.keys(emojiMapForStackLevels)
  ];

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

               <div className="w-full text-left mt-2">
                 <Textarea
                    label="About"
                    placeholder="What are you building? What do you like working on?"
                    value={bio}
                    onValueChange={(v) => setBio(v.slice(0, BIO_MAX_LENGTH))}
                    minRows={3}
                    maxRows={3}
                    variant="bordered"
                    description={`${bio.length}/${BIO_MAX_LENGTH}`}
                 />
               </div>

               <div className="w-full flex flex-col gap-4 mt-2">
                 <div>
                    <Input
                      placeholder="cyphernetician"
                      value={twitter}
                      onValueChange={(v) => setTwitter(cleanHandle(v))}
                      startContent={
                        <div className="flex items-center gap-2 text-default-400">
                          <TwitterIcon size={16} />
                          <span className="text-small">x.com/</span>
                        </div>
                      }
                      variant="bordered"
                      size="sm"
                    />
                    {twitter && (
                      <div className="text-tiny text-default-400 mt-1 pl-1 text-left truncate">
                        Links to: <span className="text-primary hover:underline">https://x.com/{twitter}</span>
                      </div>
                    )}
                 </div>

                 <div>
                    <Input
                      placeholder="username"
                      value={telegram}
                      onValueChange={(v) => setTelegram(cleanHandle(v))}
                      startContent={
                        <div className="flex items-center gap-2 text-default-400">
                           <TelegramIcon size={16} />
                           <span className="text-small">t.me/</span>
                        </div>
                      }
                      variant="bordered"
                      size="sm"
                    />
                     {telegram && (
                      <div className="text-tiny text-default-400 mt-1 pl-1 text-left truncate">
                        Links to: <span className="text-primary hover:underline">https://t.me/{telegram}</span>
                      </div>
                    )}
                 </div>
               </div>
            </div>

            {/* Save Button for Mobile / Small Screens */}
            <div className="block lg:hidden">
              <Button 
                color="primary" 
                className="w-full"
                isLoading={saving}
                onPress={handleSave}
              >
                Save Changes
              </Button>
            </div>
         </div>

         {/* Right Column: Skills, Interests, Settings */}
         <div className="lg:col-span-8 flex flex-col gap-6">
            
            <div className="bg-gradient-to-r from-background to-background-200 to-80% p-6 border-[1px] rounded-md flex flex-col gap-6">
               <div>
                  <h3 className="text-lg font-semibold mb-1">Skills</h3>
                  <p className="text-small text-default-500 mb-4">Select your technical stack.</p>
                  <div className="flex flex-wrap gap-2">
                    {skillOptions.map((skill) => {
                       const isSelected = skills.includes(skill);
                       return (
                         <Chip
                           key={skill}
                           variant={isSelected ? "solid" : "bordered"}
                           color={isSelected ? "primary" : "default"}
                           className="cursor-pointer transition-colors"
                           onClick={() => toggleSkill(skill)}
                         >
                           {skill}
                         </Chip>
                       );
                    })}
                  </div>
               </div>

               <div>
                  <h3 className="text-lg font-semibold mb-1">Interests</h3>
                  <p className="text-small text-default-500 mb-4">What ecosystem areas are you interested in?</p>
                  <div className="flex flex-wrap gap-2">
                     {interestOptions.map((interest) => {
                       const isSelected = interests.includes(interest);
                       return (
                         <Chip
                           key={interest}
                           variant={isSelected ? "solid" : "bordered"}
                           color={isSelected ? "secondary" : "default"}
                           className="cursor-pointer transition-colors"
                           onClick={() => toggleInterest(interest)}
                         >
                           {interest}
                         </Chip>
                       );
                    })}
                  </div>
               </div>
            </div>

            <div className="bg-gradient-to-r from-background to-background-200 to-80% p-6 border-[1px] rounded-md flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex flex-col">
                 <span className="font-semibold">Preferences</span>
                 <Checkbox 
                   isSelected={emailNotifs} 
                   onValueChange={setEmailNotifs}
                   classNames={{ label: "text-small text-default-500" }}
                 >
                   Receive email notifications
                 </Checkbox>
              </div>

              <div className="flex items-center gap-4">
                 {success && <span className="text-success text-small font-medium">{success}</span>}
                 {error && <span className="text-danger text-small font-medium">{error}</span>}
                 
                 <Button 
                   color="primary" 
                   isLoading={saving}
                   isDisabled={loading}
                   onPress={handleSave}
                   className="min-w-[120px]"
                 >
                   Save Changes
                 </Button>
              </div>
            </div>
         </div>

       </div>
    </div>
  );
}