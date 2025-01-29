import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { CirclePlus, Eye, EditIcon } from "lucide-react";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { db } from "../../lib/db/db";
import { employee, department } from "../../lib/db/schema";
import { eq,  asc } from "drizzle-orm";

import { searchAction } from "@/app/lib/actions/employee";
// async function fetchInitialEmployees() {
//     return await db.select({
//         id: employee.id,
//         firstname: employee.firstname,
//         lastname: employee.lastname,
//         departmentName: department.name
//     })
//         .from(employee)
//         .leftJoin(department, eq(employee.iddepartment, department.id))
//         .orderBy(asc(employee.id));
// }

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
    let results = await db.select({
        id: employee.id,
        firstname: employee.firstname,
        lastname: employee.lastname,
        departmentName: department.name
    })
    .from(employee)
    .leftJoin(department, eq(employee.iddepartment, department.id))
    .orderBy(asc(employee.id));

    const { searchText } = await searchParams;
    console.log("############", searchText);

    results = await searchAction(searchText || "");

    console.log('results', results);
    return (
        <div>
            <div className="flex justify-between w-full p-8">
                <h1 className="text-3xl font-bold">Employees</h1>
                <Button variant={"ghost"} className="inline-flex gap-2" asChild>
                    <Link href="/employee/new">
                        <CirclePlus className="h-4 w-4" />
                        Create Employee
                    </Link>
                </Button>
            </div>

            {/* Search form */}
            <form action="/employee/search" className="px-8 pb-4 flex items-center space-x-2">
                <Input
                    type="text"
                    name="searchText"
                    placeholder="Search by name"
                    className="max-w-xs"
                />
                <Button type="submit">Search</Button>
            </form>

            <Table>
                <TableCaption>A list of employees.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead className="w-[50px] text-center">Edit</TableHead>
                        <TableHead className="w-[50px] text-center">View</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {results.map((employee, index) => (
                        <TableRow key={employee.id}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>{employee.firstname} {employee.lastname}</TableCell>
                            <TableCell>{employee.departmentName}</TableCell>
                            <TableCell className="text-center">
                                <Button variant={"ghost"} className="inline-flex gap-2" asChild>
                                    <Link href={`/employee/${employee.id}/edit`}>
                                        <EditIcon className="h-4 w-4" />
                                    </Link>
                                </Button>
                            </TableCell>
                            <TableCell className="text-center">
                                <Button variant={"ghost"} className="inline-flex gap-2" asChild>
                                    <Link href={`/employee/${employee.id}`}>
                                        <Eye className="h-4 w-4" />
                                    </Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}