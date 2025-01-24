
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CirclePlus, Eye } from "lucide-react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { db } from "../lib/db/db";
import { department } from "../lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { deleteAction } from "./action";

export default async function Page() {
    const results = await db.select().from(department);
    // const results = await db.execute(sql`select * from department`);
    console.log(results);

    return (
        <div>
            <div className="flex justify-between w-full p-8">
                <h1 className="text-3xl font-bold">Departments</h1>
                <Button variant={"ghost"} className="inline-flex gap-2" asChild>

                    <Link href="/department/new">
                        <CirclePlus className="h-4 w-4" />
                        Create Department
                    </Link>
                </Button>
            </div>
            <Table>
                <TableCaption>A list of departments.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="w-[50px] text-center">View</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {results.map((department) => (


                        <TableRow key={department.id}>
                            <TableCell className="font-medium">{department.id}</TableCell>
                            <TableCell>{department.name}</TableCell>
                            <TableCell className="text-center">
                                <Button variant={"ghost"} className="inline-flex gap-2" asChild>
                                    <Link href={`/department/${department.id}`}>
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