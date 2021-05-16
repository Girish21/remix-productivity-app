import bcrypt from "bcrypt";

const compare = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

const hash = async (password: string) => {
  return bcrypt.hash(password, 10);
};

export { compare, hash };
