"use server"

import prisma from "@repo/db/client"
import { authOptions } from "../auth"
import { getServerSession } from "next-auth"

export default async function onRamptx(amount: number, provider: string): Promise<{ message: string }> {
    const session = await getServerSession(authOptions)
    const token = Math.random().toString(36).substring(2, 15)
    const userId = session?.user?.id
    if(!userId){
        throw new Error("User not authenticated")
    }
console.log(userId, amount, provider, token)
    prisma.onRampTransaction.create({
        data: {
            userId : Number(userId),
            amount : amount * 100,
            provider,
            status: "Processing",
            startTime: new Date(),
            token: token, // Generate a random token
        }
    })

    return {
        message : "Transaction created successfully",
    }
}