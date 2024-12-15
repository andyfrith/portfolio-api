import {
  integer,
  pgSchema,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const portfolioSchema = pgSchema("portfolio");

const timestamps = {
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at"),
  deletedAt: timestamp("deleted_at"),
};

export const superstar = portfolioSchema.table(
  "superstar",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    fullName: varchar({ length: 255 }).notNull(),
    linkedInUrl: varchar({ length: 255 }).notNull(),
    githubUrl: varchar({ length: 255 }).notNull(),
    portfolioUrl: varchar({ length: 255 }).notNull(),
    education: varchar({ length: 255 }).notNull(),
    telephone: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    summary: text("summary").notNull(),
    ...timestamps,
  },
);

export const accolade = portfolioSchema.table(
  "accolade",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    summary: text("summary").notNull(),
    superstarId: integer("superstar_id").references(() => superstar.id),
    ...timestamps,
  },
);

export const insertAccoladeSchema = createInsertSchema(accolade, {
  summary: schema => schema.min(10).max(150),
}).required({ summary: true,
}).omit({
  // superstarId: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const patchAccoladeSchema = insertAccoladeSchema.partial();
export const selectAccoladeSchema = createSelectSchema(accolade);
export const selectSuperstarSchema = createSelectSchema(superstar);
