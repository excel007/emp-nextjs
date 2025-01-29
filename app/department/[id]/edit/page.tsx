import { db } from "@/app/lib/db/db";
import { department } from "@/app/lib/db/schema";
import { eq } from "drizzle-orm";

import { StepBackIcon } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"
import Link from "next/link";
import { editAction } from "../../../lib/actions/department";


export default async function editDepartment({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const idDepartment = parseInt(id);
    if (isNaN(idDepartment)) {
        throw new Error('Invalid Invoice ID')
    }

    const [result] = await db.select().from(department).where(eq(department.id, idDepartment));
    console.log(result);

    return (
        <div>
            <div className="flex justify-between w-full p-8">
                <h1 className="text-3xl">Detail Department id #{idDepartment}</h1>
            </div>
            <h2 className="font-bold text-lg mb-4">Edit</h2>
            <Separator className="w-1/2" />
            <div className="grid grid-cols-2 gap-4">

                <form className="grid gap-4 max-w-xs w-full p-6 rounded-lg" action={editAction}>
                    <Label>Department name</Label>
                    <input type="hidden" id="id" name="id" defaultValue={result.id} />
                    <Input type="text" id="name" name="name" defaultValue={result.name} />
                    <Button type="submit" className="w-full">Submit</Button>
                </form>
            </div>
            <Button variant={"ghost"} asChild>
                <Link href={`/department/${result.id}`}>
                    <StepBackIcon className="h-4 w-4" />
                    go back
                </Link>
            </Button>
        </div>

    );
}