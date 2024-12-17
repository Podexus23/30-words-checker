import { SourceType } from "./enum.front";

export interface GlobalState {
  source: SourceType;
}

export interface IDBWords {
  [name: string]: Word;
}

export interface Word {
  en: string;
  ru: string;
}

export interface GameState {
  wordsQuantity: number;
  playerMoves: number;
  rightAnswers: number;
}

export type JSONString<T> = string & { __jsonType?: T };

export type GameBasicSettings = "default";

export type MethodsType = "GET" | "POST" | "PUT" | "DELETE";

//tag types
export type InputOptions = {
  type?: string;
  name?: string;
  id?: string;
  placeholder?: string;
  className?: string;
};

export type TagOptions = {
  tagName?: string;
  className?: string;
  textContent?: string;
};

export type LinkOptions = {
  href?: string;
  className?: string;
  textContent?: string;
};

export type FormTagOptions = {
  action?: string;
  method?: MethodsType;
  autocomplete?: AutoFillBase;
  className?: string;
  name?: string;
};

export type ImageOptions = {
  className?: string;
  src: string;
  alt?: string;
};
