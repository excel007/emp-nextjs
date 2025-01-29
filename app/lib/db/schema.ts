import { pgTable, serial, varchar, integer, decimal } from 'drizzle-orm/pg-core';

export const department = pgTable('department', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
});

export const employee = pgTable('employee', {
  id: serial('id').primaryKey(),
  firstname: varchar('firstname', { length: 50 }).notNull(),
  lastname: varchar('lastname', { length: 50 }).notNull(),
  salary: decimal('salary', { precision: 8, scale: 2 }).notNull(),
  iddepartment: integer('iddepartment')
    .notNull()
    .references(() => department.id),
});

