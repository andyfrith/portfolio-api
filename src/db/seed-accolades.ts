import db from "@/db";
import { accolade } from "@/db/schema";

export type NewAccolade = typeof accolade.$inferInsert;

export const insertAccolade = async (newAccolade: NewAccolade) => {
  return db.insert(accolade).values(newAccolade).returning();
};

async function main() {
  await insertAccolade({
    summary: "Leader. Thinker. Creator. Innovator.",
    superstarId: 1,
  });
  await insertAccolade({
    summary:
      "Lead teams by empowering and trusting the most important resources, each teammate",
    superstarId: 1,
  });
  await insertAccolade({
    summary:
      "Believe in extreme collaboration within and between teams- unified in vision- to achieve business success",
    superstarId: 1,
  });
  await insertAccolade({
    summary:
      "Passionate when it comes to seeing customer problems solved by delivering an excellent product",
    superstarId: 1,
  });
  await insertAccolade({
    summary:
      "Driven to build exemplary User Experiences and sound application architectures",
    superstarId: 1,
  });
  await insertAccolade({
    summary:
      "Enjoy the challenge of solving complex, multi-dimensional problems affecting team, product and customer",
    superstarId: 1,
  });
  await insertAccolade({
    summary:
      "Pragmatic, not dogmatic when managing the competing priorities that go into building a product",
    superstarId: 1,
  });
  await insertAccolade({
    summary:
      "Life-long learner, not afraid of failure, ready to learn from mistakes",
    superstarId: 1,
  });
  await insertAccolade({
    summary:
      "Always engaged in deliberate practice to be better and achieve greater results",
    superstarId: 1,
  });
  await insertAccolade({
    summary: "10+ years of Product Management, UX Strategy and Design",
    superstarId: 1,
  });
  await insertAccolade({
    summary:
      "15+ years of UI and full-stack software development, multimedia, web and UI Design",
    superstarId: 1,
  });
  await insertAccolade({
    summary:
      "Leverage React, Next.js, Node.js, TypeScript and GraphQL in development of high quality software solutions",
    superstarId: 1,
  });
  console.log("insert accolades success");
  process.exit();
}

main();
