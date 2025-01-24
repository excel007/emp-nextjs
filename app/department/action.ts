"use server";
import { db } from "../lib/db/db";
import { department } from "../lib/db/schema";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function createAction(formData: FormData) {
    console.log('formData', formData);
    const name = String(formData.get('name'));

    const results = await db.insert(department).values({
        name
    })
        .returning({
            id: department.id
        })

    redirect(`/department/${results[0].id}`);
}

export async function deleteAction(formData: FormData) {
    const id = Number(formData.get('id') as unknown);

    await db.delete(department)
        .where(eq(department.id,id));

    redirect('/department');
}