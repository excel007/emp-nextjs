import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { DepartmentChart } from "../components/report/DepartmentChart";

import { db } from "../lib/db/db";
import { employee, department } from "../lib/db/schema";
import { eq, sql, asc, desc, avg } from "drizzle-orm";

type Result = { departmentName: string, employeeCount: number, avgSalary: number | null };

export default async function Page() {
    const results: Result[] = await db.select({
        departmentName: department.name,
        employeeCount: sql`COUNT(${employee.id})`.as<number>("count"),
        avgSalary: sql`AVG(${employee.salary})`.as<number | null>("avg")
    })
        .from(department)
        .leftJoin(employee, eq(department.id, employee.iddepartment))
        .groupBy(department.name);

    return (
        <div>
            <div className="flex justify-between w-full p-8">
                <h1 className="text-3xl font-bold">Reporting #1 ...</h1>
            </div>
            <div>
                <DepartmentChart data={results} />
            </div>
            <Table>
                <TableCaption>A Number of employees.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">no</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead className="w-[200px] text-center">Average Salary</TableHead>
                        <TableHead className="w-[200px] text-center">Number of employees</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {results.map((result, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>{result.departmentName}</TableCell>
                            <TableCell className="text-center">{Number(result.avgSalary ?? 0).toFixed(2)}</TableCell>
                            <TableCell className="text-center">{result.employeeCount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}