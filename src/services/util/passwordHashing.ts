import bcrypt from "bcrypt";
import * as process from "process";
export const passwordHashing = async (password: string) => {
  try {
    return await bcrypt.hash(password, process.env.SALT_ROUNDS ?? 10);
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
