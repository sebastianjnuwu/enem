import chalk from "chalk";
import {
  Logger as WinstonLogger,
  createLogger as createWinstonLogger,
  format,
  transports,
} from "winston";

const logger = createWinstonLogger({
  level: "info",
  dirname: "./logs",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf((info) => {
      const timestamp = chalk.green(info.timestamp);
      const prefix = `[${chalk.cyan("server")}]`;
      const level =
        {
          error: chalk.red(info.level.toUpperCase()),
          warn: chalk.yellow(info.level.toUpperCase()),
          info: chalk.blue(info.level.toUpperCase()),
        }[info.level] || chalk.white(info.level.toUpperCase());
      const message =
        info.message instanceof Error
          ? chalk.red(
              `Error: ${info.message.message}\nStack: ${info.message.stack}`,
            )
          : info.message;
      return `${timestamp} ${prefix} ${level}: ${message}`;
    }),
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      dirname: "./logs",
      filename: "latest.log",
      format: format.combine(format.uncolorize()),
    }),
  ],
});

export { logger };
