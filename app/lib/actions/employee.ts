"use server";
import { db } from "../db/db";
import { employee } from "../db/schema";

import { eq, ilike, or } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function createAction(formData: FormData) {
    console.log('formData', formData);
    const firstname = String(formData.get('firstname'));
    const lastname = String(formData.get('lastname'));
    const salary = Number(formData.get('salary'));
    const iddepartment = Number(formData.get('iddepartment'));


    const results = await db.insert(employee).values({
        firstname: firstname,
        lastname: lastname,
        salary: salary,
        iddepartment: iddepartment
    })
        .returning({
            id: employee.id
        })
    redirect(`/employee/${results[0].id}`);
}

export async function deleteAction(formData: FormData) {
    const id = Number(formData.get('id') as unknown);

    await db.delete(employee)
        .where(eq(employee.id, id));

    redirect('/employee');
}

export async function editAction(formData: FormData) {
    const id = Number(formData.get('id') as unknown);
    const firstname = String(formData.get('firstname'));
    const lastname = String(formData.get('lastname'));
    const salary = Number(formData.get('salary'));
    const iddepartment = Number(formData.get('iddepartment'));

    await db.update(employee)
        .set({
            firstname: firstname,
            lastname: lastname,
            salary: salary,
            iddepartment: iddepartment
        })
        .where(eq(employee.id, id));

    redirect(`/employee/${id}`);
}

export async function searchAction(keyword: string) {
    const results = await db.select({
        id: employee.id,
        firstname: employee.firstname,
        lastname: employee.lastname,
    })
        .from(employee)
        .where(or(
            ilike(employee.firstname, `%${keyword}%`),
            ilike(employee.lastname, `%${keyword}%`)
        ))
        .orderBy(employee.id);
    return results;
}