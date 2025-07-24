import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

import { prisma } from "@/configs/prisma.config.js";

async function seed() {
  try {
    console.info(`Seed started...\n`);

    /* ------------------------ Delete all previous data ------------------------ */
    console.info(`Delete all previous data...`);
    await prisma.user.deleteMany();
    console.info(`All previous data has been deleted.\n`);

    /* ----------------------------- Create new data ---------------------------- */
    console.info(`Start creating new data...`);

    for (let i = 0; i <= 10; i++) {
      const name = faker.person.fullName();
      const email = faker.internet.email();
      const password = await bcrypt.hash("newpass", 10);
      const profilePic = faker.image.avatar();

      await prisma.user.create({ data: { name, email, password, profilePic } });

      console.info(`${name} data has been created.`);
    }

    console.info(`\nSeed finished successfully`);
  } catch (error) {
    console.error(`Seed error:`, error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
