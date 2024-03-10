import "dotenv/config";
import bcrypt from "bcrypt";
import * as process from "process";
export const passwordHashing = async (password: string) => {
  try {
    const salt =
      parseInt(process.env.SALT_ROUNDS ? process.env.SALT_ROUNDS : "10") ?? 10;
    return await bcrypt.hash(password, salt);
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const passwordCompare = async (password: string, hash: string) => {
  if (!password || !hash) {
    return null;
  }
  try {
    return await bcrypt.compare(password, hash);
  } catch (e) {
    console.error(e);
    return null;
  }
};
