export interface IDBWords {
  [name: string]: Word;
}

export interface Word {
  en: string;
  ru: string;
}

export type FileExtensions =
  | ".html"
  | ".js"
  | ".css"
  | ".json"
  | ".png"
  | ".jpg"
  | ".gif"
  | ".svg"
  | ".ico";

export type JSONString<T> = string & { __jsonType?: T };
