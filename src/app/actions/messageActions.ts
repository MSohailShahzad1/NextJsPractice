"use server"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import { ContactSchema } from "@/lib/validation"
import { saveMessage } from "@/lib/messageStore"
import { Message } from "@/lib/types"

export async function submitMessage(
    prevState: unknown,
    formData: FormData
) {
    const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message")
    }

    const result = ContactSchema.safeParse(data)

    if (!result.success) {
        const treeErrors = z.treeifyError(result.error);

        // Transform to your desired format
        return {
            error: {
                name: treeErrors.properties?.name?.errors,
                email: treeErrors.properties?.email?.errors,
                message: treeErrors.properties?.message?.errors
            }
        }
    }

    const newMessage: Message = {
        id: crypto.randomUUID(),
        ...result.data,
        createdAt: new Date().toISOString()
    }

    await saveMessage(newMessage)

    revalidatePath("/messages")

    return { success: true }
}
