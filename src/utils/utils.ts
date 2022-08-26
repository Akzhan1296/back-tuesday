export const transferIdToString = (obj: any) => {
  const { _id, ...rest } = obj;

  return { id: _id.toString(), ...rest };
}