import { logger } from "#services/logger";
import compression from "compression";
import body from "body-parser";
import nocache from "nocache";
import User from "#routes/user";
import Plan from "#routes/plan";
import express from "express";
import "express-async-errors";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import "#db/prisma";

const app = express();

app.set("trust proxy", 1);
app.use(helmet());
app.use(cors());
app.use(nocache());
app.use(compression());
app.use(body.json());
app.use(
  body.urlencoded({
    extended: true,
  }),
);
app.use(
  morgan("combined", {
    stream: {
      write: (x) => logger.info(x.trim()),
    },
  }),
);

app.use("/health", (_, res) => {
  res.status(200).send("OK");
});

app.use('/user', User);
app.use('/plan', Plan);

app.listen(process.env.PORT, () => {
  return logger.info(`Server running: http://localhost:${process.env.PORT}`);
});

export default app;
