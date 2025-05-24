import db from "@repo/db/client"
import bcrypt from "bcrypt"
import  CredentialsProvider  from "next-auth/providers/credentials"

export default function authOption() {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                phone: { label: "Phone Number", type: "text", placeholder: "Phone Number" },
                password: { label: "Password", type: "password", placeholder: "Password" }
            },

            async authorize(credentials:any){
                const hashedPassword = await bcrypt.hash(credentials.password, 10)

                const existingUser = await db.user.findFirst({
                    where: {
                        phone: credentials.phone,
                    }
                })

                if(existingUser){
                    const isPasswordCorrect = await bcrypt.compare(credentials.password, existingUser.password)

                    if(isPasswordCorrect){
                        return {
                            id: existingUser.id,
                            name: existingUser.name,
                            email: existingUser.email,
                        }
                    } else {
                        throw new Error("Invalid password")
                    }

                    try {
                        const user = await db.user.create({
                            data: {
                                number: credentials.phone,
                                password: hashedPassword,
                            }
                        })
                        return {
                            id: user.id.toString(),
                            name: user.name,
                            email: user.email,
                        }
                    } catch (error) {
                        console.log(error)
                        throw new Error("Invalid credentials")      
                    }
                    return null
                }
            }
        })
    ]

    secret: process.env.JWT_SECRET 
    call
}