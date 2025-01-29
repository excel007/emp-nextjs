import { pgTable, serial, varchar, foreignKey, numeric, integer } from "drizzle-orm/pg-core"
// import { sql } from "drizzle-orm"



export const department = pgTable("department", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
});

export const employee = pgTable("employee", {
	id: serial().primaryKey().notNull(),
	firstname: varchar({ length: 50 }).notNull(),
	lastname: varchar({ length: 50 }).notNull(),
	salary: numeric({ precision: 8, scale:  2 }).notNull(),
	iddepartment: integer().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.iddepartment],
			foreignColumns: [department.id],
			name: "employee_iddepartment_department_id_fk"
		}),
]);
