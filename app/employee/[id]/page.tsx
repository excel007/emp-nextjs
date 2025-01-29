import { db } from "@/app/lib/db/db";
import { employee } from "@/app/lib/db/schema";
import { eq } from "drizzle-orm";

import { Button } from "@/components/ui/button";
import { EditIcon, DeleteIcon ,StepBackIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator"
import Link from "next/link";

import { deleteAction } from "../../lib/actions/employee";
export default async function departmentPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const idEmployee = parseInt(id);
    if (isNaN(idEmployee)) {
        throw new Error('Invalid Employee ID')
    }

    const [result] = await db.select().from(employee).where(eq(employee.id, idEmployee));

    return (
        <div>
            <div className="flex justify-between w-full p-8">
                <h1 className="text-3xl">Detail Employee id #{result.id}</h1>
                <div>
                    <Button variant={"ghost"} asChild>
                        <Link href={`/employee`}>
                            <StepBackIcon className="h-4 w-4" />
                            go back
                        </Link>
                    </Button>
                    <Button variant={"ghost"} className="inline-flex gap-2" asChild>
                        <Link href={`/employee/${result.id}/edit`}>
                            <EditIcon className="h-4 w-4" />
                            Edit
                        </Link>
                    </Button>
                    <div className="inline-flex gap-2">
                        <form action={deleteAction}>
                            <input type="hidden" name="id" value={result.id} />
                            <Button type="submit" variant={"ghost"} className="inline-flex gap-2">
                                <DeleteIcon className="h-4 w-4" />
                                Delete
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
            <h2 className="font-bold text-lg mb-4">Detail</h2>
            <Separator className="w-1/2" />
            <div className="grid grid-cols-2 gap-4">

                <ul className="grid gap-2">
                    <li className="flex gap-4">
                        <strong className="block w-60 flex-shrink-0 font-medium text-sm">Name</strong>
                        <span>{result.firstname} {result.lastname}</span>
                    </li>
                    <li className="flex gap-4">
                        <strong className="block w-60 flex-shrink-0 font-medium text-sm">Salary</strong>
                        <span>{result.salary}</span>
                    </li>
                    <li className="flex gap-4">
                        <strong className="block w-60 flex-shrink-0 font-medium text-sm">Salary</strong>
                        <span>{result.salary}</span>
                    </li>
                </ul>
            </div>
        </div>

    );
}