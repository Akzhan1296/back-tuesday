import bcrypt from 'bcrypt'

export const transferIdToString = (obj: any) => {
  const { _id, ...rest } = obj;
  return { id: _id.toString(), ...rest };
}

export const generateHash = async (password: string) => {
  const hash = await bcrypt.hash(password, 10)
  return hash;
};