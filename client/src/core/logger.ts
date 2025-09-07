
export enum LogLevel {
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  DEBUG = "DEBUG"
}

export class Logger {
  private context: string;

  constructor(context: string) {
    this.context = context;
  }

  private format(level: LogLevel, message: string) {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] [${this.context}] ${message}`;
  }

  info(message: string) {
    console.log(this.format(LogLevel.INFO, message));
  }

  warn(message: string) {
    console.warn(this.format(LogLevel.WARN, message));
  }

  error(message: string) {
    console.error(this.format(LogLevel.ERROR, message));
  }

  debug(message: string) {
    // Можна контролювати через NODE_ENV
    if (process.env.NODE_ENV === "development") {
      console.debug(this.format(LogLevel.DEBUG, message));
    }
  }
}
