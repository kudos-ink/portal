
"use client";

import { GithubLoginButton } from "react-social-login-buttons";
import { signIn, signOut, useSession } from "next-auth/react";


const GitHubLoginButton: React.FC = () => {
  const { data: session } = useSession();
  return (
    <div>
      {session ? (
        <div>
          <span>Hi {session.user?.name}</span>
          <button onClick={() => signOut()}>Sign out</button>
          {/* TODO: 
          Show dropdown with "profile", "create task" and "logout"
          */}
        </div>
      ) : (
        // use custom button instead of this library one from "react-social-login-buttons"
        <GithubLoginButton iconSize={"20"} className="font-semibold"  size="m" onClick={() => signIn("github")}>
           <span>Login</span>
        </GithubLoginButton>
      )}
    </div>
  );
};

export default GitHubLoginButton;