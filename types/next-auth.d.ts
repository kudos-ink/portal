import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string; // Add custom properties to the session object
    user?: {
      name?: string;
      email?: string;
      image?: string;
      id?: string; // Example: if you include the user's GitHub ID
    };
  }

  interface JWT {
    accessToken?: string;
  }
}
