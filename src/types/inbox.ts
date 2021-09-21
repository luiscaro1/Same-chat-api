/* eslint-disable camelcase */
export default interface Message {
  mid: string;
  rid: string;
  uid: string;
  content: string;
  type: string;
  created_at: Date | undefined | null;
  updated_at: Date | undefined | null;
  files: Array<File> | undefined | null;
}
