import  CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
import db from "@repo/db"

export const authOptios = {
    providers: [
        CredentialsProvider({
            name: "Credentials",

            credentials : {
                phone: {label: "Phone number", type: "text", placeholder:"123123123", required: true},
                password: {label: "Password", type: "password", placeholder:"123123123", required: true},
            },

            async authorize(credentials: any){
                const hashedPassword = await bcrypt.hash(credentials.password, 10)
                const existingUser = await db.user.findFirst({
                    where: {
                        number: credentials.phone
                    }
                })

                if(existingUser){
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password)
                    if(passwordValidation){
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            phone: existingUser.number
                        }
                    }
                    return null
                }

                
            }
        })
    ]
}