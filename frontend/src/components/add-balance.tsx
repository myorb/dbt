import { useState } from "react"
import { Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { toast } from "@/hooks/use-toast"
import { addDeposit } from "@/services/balanceService"

export function AddBalance() {
    const [amount, setAmount] = useState(350)
    const [userId, setUserId] = useState("")
    const [profileId, setProfileId] = useState("")

    function onClick(adjustment: number) {
        setAmount(amount + adjustment)
    }

    async function handler() {
        if (!userId || !profileId) {
            toast({
                title: "Error",
                description: "Please fill in all the fields",
            })
            return
        }

        if (amount <= 0) {
            toast({
                title: "Error",
                description: "Please enter a valid amount",
            })
            return
        }

        if (isNaN(parseInt(userId)) || isNaN(parseInt(profileId))) {
            toast({
                title: "Error",
                description: "Please enter a valid number",
            })
            return
        }

        const response = await addDeposit(
            {
                userId: parseInt(userId),
                profileId: parseInt(profileId),
                depositAmount: amount,
            }
        );

        toast({
            title: `You submitted ${amount} $ to user ${userId}`,
            description: (
                <>
                    <h3 className="mt-4 text-md font-bold">Response:</h3>
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(response, null, 2)}</code>
                    </pre>
                </>
            ),
        })
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="outline">Add Balance</Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Add Balance</DrawerTitle>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <div className="flex items-center justify-center space-x-2">
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 shrink-0 rounded-full"
                                onClick={() => onClick(-10)}
                            >
                                <Minus />
                                <span className="sr-only">Decrease</span>
                            </Button>
                            <div className="flex-1 text-center">
                                <div className="text-7xl font-bold tracking-tighter">
                                    {amount} $
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 shrink-0 rounded-full"
                                onClick={() => onClick(10)}
                            >
                                <Plus />
                                <span className="sr-only">Increase</span>
                            </Button>
                        </div>
                        <Label>
                            User ID:
                            <Input
                                type="number"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                placeholder="Enter your User ID"
                            />
                        </Label>
                        <Label>
                            Profile ID:
                            <Input
                                type="number"
                                value={profileId}
                                onChange={(e) => setProfileId(e.target.value)}
                                placeholder="Enter your Profile ID"
                            />
                        </Label>
                    </div>
                    <DrawerFooter>
                        <Button onClick={handler}>Submit</Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
