import { pgTable, serial, varchar, integer, decimal } from 'drizzle-orm/pg-core';

export const department = pgTable('department', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
});

export const employee = pgTable('employee', {
  id: serial('id').primaryKey(),
  firstname: varchar('firstname', { length: 50 }).notNull(),
  lastname: varchar('lastname', { length: 50 }).notNull(),
  salary: decimal('salary', { precision: 8, scale: 2 }).$type<number>().notNull(),
  iddepartment: integer('iddepartment')
    .notNull()
    .references(() => department.id),
});

// แก้ปัญหา type Number หรือ Decimal ของ salary เนื่องจาก js ใช้ float เก็บข้อมูล type นี้ จึงต้องเปลี่ยนให้เป็น string ก่อน แบบ explicit จึงเกิดปัญหา เมื่อ build project
// https://github.com/drizzle-team/drizzle-orm/issues/1042
// https://stackoverflow.com/questions/76876763/drizzle-orm-decimal-mysql-is-a-string/77256865#77256865