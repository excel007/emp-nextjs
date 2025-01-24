import { relations } from "drizzle-orm/relations";
import { department, employee } from "./schema";

export const employeeRelations = relations(employee, ({one}) => ({
	department: one(department, {
		fields: [employee.iddepartment],
		references: [department.id]
	}),
}));

export const departmentRelations = relations(department, ({many}) => ({
	employees: many(employee),
}));