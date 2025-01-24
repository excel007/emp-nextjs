import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { db } from "../../lib/db/db";
import { department } from "../../lib/db/schema";
import { createAction } from "../../lib/actions/employee";
import { asc } from "drizzle-orm";

export default async function Page() {
    const departments = await db.select().from(department).orderBy(asc(department.name));
    return (
        <div className="flex flex-col items-center px-4">
            <h1 className="text-3xl font-bold mb-6">
                Create a new employee
            </h1>
            <form className="grid gap-4 max-w-xs w-full p-6 bg-white shadow-lg rounded-lg" action={createAction}>
                <Label>First name</Label>
                <Input type="text" id="firstname" name="firstname" placeholder="enter first name" />
                <Label>Last name</Label>
                <Input type="text" id="lastname" name="lastname" placeholder="enter last name" />
                <Label>Salary</Label>
                <Input type="text" id="salary" name="salary" placeholder="99999" />
                <Label>Department</Label>
                <Select id="iddepartment" name="iddepartment">
                    <SelectTrigger className="w-[180px]" >
                        <SelectValue placeholder="choose" />
                    </SelectTrigger>
                    <SelectContent>
                        {departments.map((department) => (
                                <SelectItem key={department.id} value={department.id?.toString() || ''}>{department.name}</SelectItem>
                            ))}
                    </SelectContent>
                </Select>
                <Button type="submit" className="w-full">Submit</Button>
            </form>
        </div>
    );
}