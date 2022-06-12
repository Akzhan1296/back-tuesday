import { BloggerItemDBType, CommentDBType, CommentWithPostId, PostItemDBType, UserDBType } from "../types/types";

export const transferIdToString = (obj: any) => {
  const { _id, ...rest } = obj;

  return { id: _id.toString(), ...rest };
}