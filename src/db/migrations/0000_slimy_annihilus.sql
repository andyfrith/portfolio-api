CREATE SCHEMA "portfolio";
--> statement-breakpoint
CREATE TABLE "portfolio"."accolade" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "portfolio"."accolade_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"summary" text NOT NULL,
	"superstar_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "portfolio"."superstar" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "portfolio"."superstar_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"fullName" varchar(255) NOT NULL,
	"linkedInUrl" varchar(255) NOT NULL,
	"githubUrl" varchar(255) NOT NULL,
	"portfolioUrl" varchar(255) NOT NULL,
	"education" varchar(255) NOT NULL,
	"telephone" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"summary" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	CONSTRAINT "superstar_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "portfolio"."accolade" ADD CONSTRAINT "accolade_superstar_id_superstar_id_fk" FOREIGN KEY ("superstar_id") REFERENCES "portfolio"."superstar"("id") ON DELETE no action ON UPDATE no action;