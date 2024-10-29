import { verify, hash } from "argon2";
export const hashPassword = async (password: string) => hash(password);
export const verifyPassword = async (password: string, hash: string) =>
  verify(hash, password);
