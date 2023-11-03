import { prisma } from "@/db";
import { redirect } from "next/navigation"
import Link from "next/link";

async function createNote(data: FormData) {
    "use server"

    const title = data.get("title")?.valueOf()
    const note = data.get("note")?.valueOf()
    if(typeof title !== "string" || title.length === 0 || typeof note !== "string" || note.length === 0) {
        return new Error("Invalid Title or Note")
    }

    await prisma.note.create({data: {title, note}})
    redirect("/")
}

export default function Page() {

    return (
        <>
        <div className="flex flex-col items-center justify-center">
            <header className="flex justify-between items-center mb-4">
                <h1 className="text-2x1 font-bold">New note</h1>
            </header>
            <form action={createNote} className="flex gap-2 flex-col w-[600px] mt-5 p-4 py-10 relative bg-sky-700 rounded">
                <input 
                    type="text" 
                    name="title" 
                    className="border border-slate-300 bg-transparent rounded px-2 py-1
                    outline-none focus-within:border-slate-100"
                />
                <textarea  
                    name="note"
                    cols={30}
                    rows={5}
                    className="border border-slate-300 bg-transparent rounded px-2 py-1
                    outline-none focus-within:border-slate-100"
                />
                <div className="flex gap-1 justify-end">
                    <Link href=".." className="border border-slate-300 text-slate-300 px-2 py-1
                    rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">Cancel</Link>
                    <button type="submit" className="border border-slate-300 text-slate-300 px-2 py-1
                    rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">Create</button>
                </div>
            </form>
        </div>
        </>
    )
}