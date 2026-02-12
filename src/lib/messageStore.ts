import fs from "fs/promises"
import path from "path"
import { Message } from "./types"

const filePath = path.join(process.cwd(), "data/messages.json")

export async function getMessages(): Promise<Message[]> {
    try {
        const data = await fs.readFile(filePath, "utf-8")
        return JSON.parse(data)
    } catch {
        return []
    }
}

export async function saveMessage(message: Message) {
    const messages = await getMessages()
    messages.push(message)
    await fs.mkdir(path.dirname(filePath), { recursive: true })
    await fs.writeFile(filePath, JSON.stringify(messages, null, 2))
}
