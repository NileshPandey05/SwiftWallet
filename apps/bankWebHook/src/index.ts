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
            prisma.
        ])
    } catch (error) {
        
    }
})