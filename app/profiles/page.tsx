
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <h1>ProfilePage</h1>
      {/* TODO
      
      Show the profile + activity
      */}
      <div>
        {session?.user?.name ? <h2>Hello {session.user.name}!</h2> : null}
        {/* {session?.account?.name ? <h2>Hello {session.user.name}!</h2> : null} */}

        {session?.user?.image ? (
          <Image
            src={session.user.image}
            width={200}
            height={200}
            alt={`Profile Pic for ${session.user.name}`}
            priority={true}
          />
        ) : "not logged in"}
      </div>
    </div>
  );
};

export default ProfilePage;