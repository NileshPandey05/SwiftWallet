"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client"

export default async function P2pTransfer(to: number, amount: number){
    const session = getServerSession(authOptions)
    const from = session?.user?.id

    if(!from){
        return{
            message: "Error While Sending"
        }
    }

    const toUser = await prisma.user.findFirst({
        where:{
            number: String(to)
        }
    })

    if(!toUser){
        return{
            message: "User not Found"
        }
    }

    await prisma.$transaction(async (tx) => {
        const fromBalance = await tx.balance.findUnique({
            where: { userId: Number(from) }
        })

        if(!fromBalance || fromBalance.amount < amount){
            throw new Error("Insufficient funds")
        }

        await tx.balance.update({
            where: {
                userId: Number(from)
            },
            data: {
                amount: {
                    decrement: amount
                }
            }
        })

        await tx.balance.update({
            where: {userId: toUser.id},
            data: {amount: {increment: amount}}
        })
    })

}