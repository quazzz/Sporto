import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {},
            async authorize(credentials){
                const {email,password} = credentials
                try{
                    const user = await prisma.user.findUnique({
                        where: {
                            email : email,
                        },
                    })
                    if(!user){
                        return null
                    }
                    const passwordMatch = await bcrypt.compare(password,user.password)
                    if(!passwordMatch){
                        return null
                    }
                    return {id: user.id.toString(),email: user.email, name: user.name}
                    

                }
                catch(error){
                    console.log('Error',error)
                    throw new Error('Auth error')
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt'
    },
    callbacks:{
        async jwt({token,user}){
            if(user){
                token.id = user.id
            }
            return token
        },
        async session({session,token}){
            session.user.id = token.id
            return session
        },
        secret: process.env.NEXTAUTH_SECRET,
        pages: {
            signIn: '/'
        }
    }
}
const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}