import { db } from "@/app/lib/db/db";
import { department } from "@/app/lib/db/schema";
import { eq } from "drizzle-orm";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EditIcon, DeleteIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator"
import Link from "next/link";

export default async function departmentPage({ params }: { params: { id: string } }) {
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
                <h1 className="text-3xl">Detail Department id #{result.id}</h1>
                <div>
                    <Button variant={"ghost"} className="inline-flex gap-2" asChild>
                        <Link href="/department/new">
                            <EditIcon className="h-4 w-4" />
                            Edit
                        </Link>
                    </Button>
                    <Button variant={"ghost"} className="inline-flex gap-2" asChild>
                        <Link href="/department/new">
                            <DeleteIcon className="h-4 w-4" />
                            Delete
                        </Link>
                    </Button>
                </div>
            </div>
            <h2 className="font-bold text-lg mb-4">Detail</h2>
            <Separator className="w-1/2" />
            <div className="grid grid-cols-2 gap-4">

                <ul className="grid gap-2">
                    <li className="flex gap-4">
                        <strong className="block w-60 flex-shrink-0 font-medium text-sm">Department Name</strong>
                        <span>{result.name}</span>
                    </li>
                </ul>
            </div>
        </div>

    );
}