"use client"

import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { Center } from "@repo/ui/center"
import { TextInput } from "@repo/ui/textinput"
import { useState } from "react"
import P2pTransfer from "../app/lib/action/p2pTransfer"

export default function SendCard(){
    const [amount, setAmount] = useState(0)
    const [number, setNumber] = useState(0)

    return(
        <div className="h-[90vh] ">
            <Center>
                <Card title="Send">
                    <div className="min-w-72 pt-2">
                        <TextInput placeholder="Number" label="Number" onChange={(val) => {
                            setAmount(Number(val))
                        }}/>
                        <TextInput placeholder="Amount" label="Amount" onChange={(val) => {
                            setNumber(Number(val))
                        }}/>
                        <div className="pt-4 flex justify-center">
                            <Button onClick={async () => {
                                await P2pTransfer(number, Number(amount)*100)
                            }}>Send</Button>
                        </div>
                    </div>
                </Card>
            </Center>
        </div>
    )
}