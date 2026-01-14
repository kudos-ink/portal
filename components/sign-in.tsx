
"use client";

import { GithubLoginButton } from "react-social-login-buttons";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useRef } from "react";
import { getCurrentUser, updateCurrentUser, User } from "@/api/core/users";
import {
  getAllNotifications,
  deleteAllNotifications,
  deleteNotificationById,
  Notification,
} from "@/api/core/notifications";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

const GitHubLoginButton: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [userResult, setUserResult] = useState<string>("");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notifResult, setNotifResult] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const token = session?.accessToken as string | undefined;


  const handleToggleNotifications = async () => {
    if (!token || !user) return setUserResult("No token or user");
    try {
      await updateCurrentUser(token, !user.email_notifications_enabled);
      setUser({ ...user, email_notifications_enabled: !user.email_notifications_enabled });
      setUserResult(`Toggled notifications to ${!user.email_notifications_enabled}`);
    } catch (e: any) {
      setUserResult(e?.message || "Failed to toggle notifications");
    }
  };

  const handleFetchNotifications = async () => {
    if (!token) return setNotifResult("No token");
    try {
      const n = await getAllNotifications(token);
      setNotifications(n);
      setNotifResult(JSON.stringify(n, null, 2));
    } catch (e: any) {
      setNotifResult(e?.message || "Failed to fetch notifications");
    }
  };

  const handleDismissAll = async () => {
    if (!token) return setNotifResult("No token");
    try {
      await deleteAllNotifications(token);
      setNotifications([]);
      setNotifResult("All notifications dismissed");
    } catch (e: any) {
      setNotifResult(e?.message || "Failed to dismiss all");
    }
  };

  const handleDismissFirst = async () => {
    if (!token) return setNotifResult("No token");
    if (notifications.length === 0) return setNotifResult("No notifications");
    try {
      await deleteNotificationById(notifications[0].id, token);
      setNotifications((prev) => prev.slice(1));
      setNotifResult(`Dismissed notification ${notifications[0].id}`);
    } catch (e: any) {
      setNotifResult(e?.message || "Failed to dismiss notification");
    }
  };

  // Fetch notifications when dropdown is opened
  const handleDropdownOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      handleFetchNotifications();
    }
  };

  if (!session) {
    return (
      <GithubLoginButton iconSize={"20"} className="font-semibold" size="m" onClick={() => signIn("github")}> 
        <span>Login</span>
      </GithubLoginButton>
    );
  }

  return (
    <Dropdown onOpenChange={handleDropdownOpenChange} ref={dropdownRef}>
      <DropdownTrigger>
        <Button variant="flat" color="default" className="capitalize">
          Hi {session.user?.name}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="User menu" className="min-w-[260px]">
        <DropdownItem key="profile" textValue="Profile" onClick={() => router.push('/profile')}>
          <div className="flex flex-col gap-1">
            <span className="font-semibold">Profile</span>
          </div>
        </DropdownItem>
        <DropdownItem key="subscriptions" textValue="Subscriptions" onClick={() => window.open('/subscriptions')}>
          <div className="flex flex-col gap-1">
            <span className="font-semibold">Subscriptions</span>
            <span className="text-xs">Manage your subscriptions</span>
          </div>
        </DropdownItem>
        <DropdownItem key="notifications" textValue="Notifications" onClick={() => window.open('/notifications')}>
          <div className="flex flex-col gap-1">
            <span className="font-semibold">Notifications</span>
            {notifications.length === 0 ? (
              <span className="text-xs">No notifications</span>
            ) : (
              <span className="text-xs">View all notifications</span>
            )}
          </div>
        </DropdownItem>
        <DropdownItem key="logout" textValue="Logout" onClick={() => signOut()} className="text-danger">
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default GitHubLoginButton;