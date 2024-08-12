import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbConnection from "@/lib/dbConnect";
import userModel from "@/models/UserModel";
export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ account, profile }) {
      if (!profile?.email) {
        throw new Error("Email is required for sign in");
      }

      await dbConnection();
      const user = await userModel.findOne({ email: profile.email });
      if (!user) {
        const email = profile.email;
        const name = profile.name;
        const imageUrl = profile.picture;
        const myUser = new userModel({
          email: email,
          name: name,
          imageUrl: imageUrl,
        });
        await myUser.save();
      }
      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
