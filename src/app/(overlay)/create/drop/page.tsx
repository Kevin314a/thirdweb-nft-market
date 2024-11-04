'use server'

import { DropForm } from "@/components/Drop";
import { deployDrop } from "@/server-actions/drop";

export default async function CreateDropPage() {
  return (
    <div className="max-w-[1920px] flex-col md:flex-row mx-auto xl:px-10 px-4 z-20">
      <div className="mb-4 flex flex-col">
        <span className="text-4xl text-white">Create a Drop</span>
        <span className="text-sm text-golden-1000">Add exclusive items, set availability, and share something unique with your audience.<br />Start creating your drop below!</span>
      </div>
      <DropForm deployDrop={deployDrop} />
    </div>
  );
}