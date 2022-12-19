import * as bcrypt from "bcrypt";

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = parseInt(process.env.SALT_ROUNDS ?? "10");
  return await bcrypt.hash(password, saltRounds);
}

export async function isPasswordEqualToHash(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}
