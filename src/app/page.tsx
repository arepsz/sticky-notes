import { prisma } from "@/db";
import Link from "next/link";
import { StockyNote } from "@/components/StickyNote";

function getNotes() {
  return prisma.note.findMany()
}

async function updateTitle(id: string, title: string) {
  "use server"

  await prisma.note.update({where: {id}, data: {title}})
}

async function updateNote(id: string, note: string) {
  "use server"

  await prisma.note.update({where: {id}, data: {note}})
}

async function deleteNote(id: string) {
  "use server"

  await prisma.note.delete({where: {id}})
}

export default async function Home() {
  const notes = await getNotes()

  return (
    <>
    <header className = "flex justify-between items-center mb-4">
      <h1 className="text-2x1 font-bold text-xl">My notes</h1>
      <Link className="border border-slate-300 border-slate-300 px-2
      py-1 rounded hover:bg-slate-700 focus-withing:bg-slate-700 outline-none" href="/new">New note</Link>
    </header>
    <ul className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 overflow-y-scroll w-full h-full">
      {notes.map(note =>(
        <StockyNote key={note.id} {...note} updateTitle={updateTitle} updateNote={updateNote} deleteNote={deleteNote}/>
      ))}
    </ul>
    </>
  )
}