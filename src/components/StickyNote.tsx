"use client"
import { useRouter } from "next/navigation"

type StickyNoteProps = {
    id: string
    title: string
    note: string
    updateTitle: (id: string, title: string) => void
    updateNote: (id: string, note: string) => void
    deleteNote: (id: string) => void
}

export function StockyNote({id, title, note, updateTitle, updateNote, deleteNote}: StickyNoteProps) {

    const navigation = useRouter()

    const refreshPage = () => {
        deleteNote(id)
        navigation.refresh()
    }

    return (
            <li className="w-[300px] mt-5 p-4 py-10 relative bg-sky-700 rounded">
                <input id={id} type="text" className="bg-sky-700 border-slate-300 p-2 mb-2 rounded hover:text-black font-bold"
                onChange={e => updateTitle(id, e.target.value)} defaultValue={title}/>
                <textarea id={id} cols={30} rows={5} className="w-[270px] bg-sky-700 border-slate-300 p-2 rounded hover:text-black"
                onChange={e => updateNote(id, e.target.value)} defaultValue={note}/>
                <button className="absolute right-2 top-0 font-bold text-2x1 text-red-500" onClick={refreshPage}>x</button>
            </li>
    )
}