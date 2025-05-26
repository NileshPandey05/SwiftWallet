import prisma from "@repo/db"
import express from "express"

const app = express()

app.post("/hdfcWebhook", (req, res) => {
    const paymentInformation: {
        token: string
        userId: string
        amount: string
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    }
    try {
        prisma.$transaction([
            prisma.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        // You can also get this from your DB
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            prisma.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                }, 
                data: {
                    status: "Success",
                }
            })
        ])

        res.json({
            message: "Captured"
        })

    } catch (e) {
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }
})

app.listen(3002)