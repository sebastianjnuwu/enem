import { PrismaClient } from "@prisma/client";
import { logger } from "#services/logger";

const prisma = new PrismaClient();

(async () => {
  await prisma
    .$connect()
    .then(() => {
      return logger.info("Prisma connected to the database");
    })
    .catch((err) => {
      return logger.error(err);
    });
})();

export default prisma;
