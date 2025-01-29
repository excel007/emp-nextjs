import { db } from "@/app/lib/db/db";
import { department, employee } from "@/app/lib/db/schema";
import { eq ,asc } from "drizzle-orm";

import { StepBackIcon } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Link from "next/link";
import { editAction } from "../../../lib/actions/employee";


export default async function editEmployee({ params }: { params: { id: string } }) {
    const { id } = await params;
    const idEmployee = parseInt(id);
    if (isNaN(idEmployee)) {
        throw new Error('Invalid Employee ID')
    }

    const [result] = await db.select().from(employee).where(eq(employee.id, idEmployee));
    const departments = await db.select().from(department).orderBy(asc(department.name));

    return (
        <div>
            <div className="flex justify-between w-full p-8">
                <h1 className="text-3xl">Detail Employee id #{idEmployee}</h1>
            </div>
            <h2 className="font-bold text-lg mb-4">Edit</h2>
            <Separator className="w-1/2" />
            <div className="grid grid-cols-2 gap-4">

                <form className="grid gap-4 max-w-xs w-full p-6 rounded-lg" action={editAction}>
                    <Label>First name</Label>
                    <Input type="text" id="firstname" name="firstname" placeholder="enter first name" defaultValue={result.firstname} />
                    <Label>Last name</Label>
                    <Input type="text" id="lastname" name="lastname" placeholder="enter last name" defaultValue={result.lastname} />
                    <Label>Salary</Label>
                    <Input type="text" id="salary" name="salary" placeholder="99999" defaultValue={result.salary}/>
                    <Label>Department {result.iddepartment}</Label>
                    <Select id="iddepartment" name="iddepartment" defaultValue={result.iddepartment?.toString() || ''}>
                        <SelectTrigger className="w-[180px]" >
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {departments.map((department) => (
                                <SelectItem key={department.id} value={department.id?.toString() || ''}>{department.id}{department.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <input type="hidden" id="id" name="id" defaultValue={result.id} />

                    <Button type="submit" className="w-full">Submit</Button>
                </form>
            </div>
            <Button variant={"ghost"} asChild>
                <Link href={`/employee/${result.id}`}>
                    <StepBackIcon className="h-4 w-4" />
                    go back
                </Link>
            </Button>
        </div>

    );
}