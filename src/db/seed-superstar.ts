import db from "@/db";
import { superstar } from "@/db/schema";

export type NewSuperstar = typeof superstar.$inferInsert;

export const insertSuperstar = async (newSuperstar: NewSuperstar) => {
  return db.insert(superstar).values(newSuperstar).returning();
};

async function main() {
  await insertSuperstar({
    fullName: "Andy Frith",
    linkedInUrl: "https://www.linkedin.com/in/goodapplemedia/",
    githubUrl: "https://github.com/andyfrith",
    portfolioUrl: "https://github.com/andyfrith",
    education: "BBA. MIS, 1996. University of Georgia",
    telephone: "310.906.6096",
    email: "afrith.denver.usa@gmail.com",
    summary: "This is my summary.",
  });
  console.log("insert superstar success");
  process.exit();
}

main();
