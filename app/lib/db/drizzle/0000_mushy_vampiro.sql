-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "department" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "employee" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstname" varchar(50) NOT NULL,
	"lastname" varchar(50) NOT NULL,
	"salary" numeric(8, 2) NOT NULL,
	"iddepartment" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "employee" ADD CONSTRAINT "employee_iddepartment_department_id_fk" FOREIGN KEY ("iddepartment") REFERENCES "public"."department"("id") ON DELETE no action ON UPDATE no action;
*/