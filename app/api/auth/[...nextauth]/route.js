import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import User from '@models/users'
import { connectToDB } from "@utils/database";

// clientId = 807439362254-ua2ppgrga5sd6lv56220vu4c0sk0baqg.apps.googleusercontent.com
// client sectret = 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

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session}) {
            const sessionUser = await User.findOne({email: session.user.email});
    
            session.user.id = sessionUser._id.toString();
            return session; 
        },
        async signIn({ profile}) {
            try {
                // every next js route is known as serverless route :- serverless -> lambda -> dynamodb
                await connectToDB();
    
                // check if user already exist
                const userExists = await User.findOne({email: profile.email});
    
                // if not add to database
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "".toLowerCase()),
                        image: profile.picture
                    });
                }
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
});

export {handler as GET, handler as POST }