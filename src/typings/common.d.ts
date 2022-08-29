// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type ANY = any;

declare type QUERYSTRING =
  | string
  | string[]
  | QueryString.ParsedQs
  | QueryString.ParsedQs[]
  | undefined;

declare type SSLOPTIONTYPE = {
  require: boolean;
  rejectUnauthorized: boolean;
};
