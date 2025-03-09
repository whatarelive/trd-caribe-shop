"use client"

import { MdSpaceDashboard, MdPerson } from "react-icons/md";
import { Breadcrumbs } from "../ui/breadcrumbs";

export const NavBar = () => {
    return (
        <header className="flex justify-between items-center px-6 w-full h-16 border-b border-neutral-200">
            <div className="flex items-center gap-4">
                <div className="inline-flex items-center gap-2 px-4 pr-14 border-r border-neutral-200">
                    <MdSpaceDashboard size={24} />

                    <h1 className="text-2xl font-medium">
                        Dashboard
                    </h1>
                </div>

                <Breadcrumbs />
            </div>


            <div className="inline-flex items-center gap-2">
                <button className="p-2 rounded-lg bg-neutral-50 border border-neutral-300 cursor-pointer hover:bg-neutral-100 transition-colors">
                    <MdPerson size={24} className="text-neutral-400" />
                </button>
            </div>
        </header>
    )
}
