/* eslint-disable camelcase */
export default interface Message {
  mid: string;
  rid: string;
  uid: string;
  content: string;
  type: string;
  created_at: Date;
  updated_at: Date;
}
