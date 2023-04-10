import path from 'path';
import dotenv from 'dotenv';
import bunyan from 'bunyan';

// Parsing the env file.
dotenv.config({ path: path.resolve(__dirname, '../Config.env') });

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at all

class Config {
  public NODE_ENV: string | undefined;
  public SERVER_PORT: number | undefined;
  public DATABASE: string | undefined;
  public DATABASE_PASSWORD: string | undefined;
  public JWT_TOKEN: string | undefined;
  public SECRET_KEY_ONE: string | undefined;
  public SECRET_KEY_TWO: string | undefined;
  public CLIENT_URL: string | undefined;
  public REDIS_HOST: string | undefined;

  private readonly DEFAULT_DATABASE_URL = 'mongodb://localhost:27017/chatty';

  constructor() {
    this.NODE_ENV = process.env.NODE_ENV || '';
    this.SERVER_PORT = process.env.SERVER_PORT
      ? Number(process.env.SERVER_PORT)
      : undefined;
    this.DATABASE = process.env.DATABASE || this.DEFAULT_DATABASE_URL;
    this.DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || '';
    this.JWT_TOKEN = process.env.JWT_TOKEN || '';
    this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE || '';
    this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO || '';
    this.CLIENT_URL = process.env.CLIENT_URL || '';
    this.REDIS_HOST = process.env.REDIS_HOST || '';
  }

  public createLogger(name: string): bunyan {
    return bunyan.createLogger({ name, level: 'debug' });
  }

  public validateConfig(): void {
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined) {
        throw new Error(`Configuration ${key} is undefined.`);
      }
    }
  }
}

export const config: Config = new Config();
