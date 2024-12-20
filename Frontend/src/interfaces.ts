/** @format */

export interface newGameInitialData {
  name: string;
  type: string;
  creators: string[];
  generateMainArticle: boolean;
  generateContent: boolean;
  dataForGeneration?: Details[] | [];
  mcqs?: mcq[];
}

export interface Game extends newGameInitialData {
  _id?: string;
  content: mcq[] | WordFill[] | MatchMaker[] | Hangman[] | Timeline[] | Debate[];

}

export interface mcq {
  question: string;
  options: string[];
  answer: string;
}

export interface WordFill {
  sentence: string;
  missingWord: string;
  fakeWords: string[];
}

export interface gamePlayData {
  _id: string;
  gameId: string;
  userId: string;
  sessionAttempts: number; 
  timeTaken: number[];
}


export interface MatchMaker {
  pairs: { left: string; right: string }[];
  solvedTimes: number;
  sessionAttempts: number;
}

export interface Hangman {
  word: string;
  solvedTimes: number;
  sessionAttempts: number;
}

export interface Timeline {
  events: { date: string; event: string }[];
  solvedTimes: number;
  sessionAttempts: number;
}

export interface Debate {
  topic: string;
  solvedTimes: number;
  sessionAttempts: number;
}

export interface Chapter {
  title: string;
  content: string;
  games: Game[];
}

// export interface Article {
//   title: string;
//   author: string;
//   chapters: Chapter[];
// }

export type gameId = string;
// Interface for the main object structure
export interface GeneralArticle {
  _id?: string;
  creators: User[];
  parent: string | null;
  children: GeneralArticle[] | string[] | RootChildArticle[]; // Assuming children can be of type Article or string (ID)
  siblings: GeneralArticle[] | string[]; // Assuming siblings are represented by their IDs
  details: Details;
  games: gameId[]; // Assuming games can be of any type, you may need to define a more specific type based on your data.
  __v?: number;
}

export interface RootArticle extends GeneralArticle {
  children: RootChildArticle[];
  siblings: string[];
}

export interface RootChildArticle extends GeneralArticle {
  children: string[];
  siblings: string[];
}

export interface CurrentArticle extends GeneralArticle {
  children: GeneralArticle[];
  siblings: GeneralArticle[];
}

export interface User {
  _id?: string;
  username: string;
  email: string;
}

// Interface for the details object
export interface Details {
  _id?: string;
  title: string;
  author?: string;
  content: string; // Assuming content can be of any type, you may need to define a more specific type based on your data.
  edit: string;
  __v?: number;
}
