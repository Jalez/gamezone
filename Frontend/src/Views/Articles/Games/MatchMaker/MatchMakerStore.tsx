import { create } from "zustand";
import memoryCardsTestData from "./memoryCardsData.json";
import { Card } from "../../../../types";

// declare memoryCardsTestData as an array of allMemoryDetails
const allMemoryDetails: data[] = memoryCardsTestData;

// import dotenv from "dotenv";
// dotenv.config();

type data = {
  id: number;
  term: string;
  description: string;
  source: string;
  times_seen: number;
  times_correct: number;
  times_incorrect: number;
};

const shuffle = (array: Card[]) => {
  for (let index = array.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    const temp = array[index];
    array[index] = array[randomIndex];
    array[randomIndex] = temp;
  }
};

const moveCards = (
  source: any[],
  destination: any[],
  max: number,
  shuffleFlag: boolean
) => {
  while (destination.length < max && source.length > 0) {
    const newCard = source.shift();
    if (newCard) {
      destination.push(newCard);
    }
  }
  if (shuffleFlag) {
    shuffle(destination);
  }
};

// if we are testing the store, we want to use the test data
// const allMemoryCards = process.env.NODE_ENV === "test" ? allMemoryDetails : [];
type MatchMakerStore = {
  currentTermCards: Card[];
  currentDescriptionCards: Card[];
  nextTermCards: Card[];
  nextDescriptionCards: Card[];
  remainingTermCards: Card[];
  remainingDescriptionCards: Card[];
  activeTermCard: Card | null;
  activeDescriptionCard: Card | null;
  updateCurrentCards: () => void;
  setRemainingTermCards: (remainingTermCards: Card[]) => void;
  setRemainingDescriptionCards: (remainingDescriptionCards: Card[]) => void;
  setActiveTermCard: (activeTermCard: Card | null) => void;
  setActiveDescriptionCard: (activeDescriptionCard: Card | null) => void;
  createMemoryCards: (memoryCards: data[]) => void;
  compareActiveCards: () => void;
};

export const useMatchMakerStore = create<MatchMakerStore>((set) => ({
  currentTermCards: [],
  currentDescriptionCards: [],
  nextTermCards: [],
  nextDescriptionCards: [],
  remainingTermCards: [],
  remainingDescriptionCards: [],
  activeTermCard: null,
  activeDescriptionCard: null,
  updateCurrentCards: () => {
    set((state) => {
      const currentTermCards = state.currentTermCards;
      const currentDescriptionCards = state.currentDescriptionCards;
      const nextTermCards = state.nextTermCards;
      const nextDescriptionCards = state.nextDescriptionCards;
      const remainingTermCards = state.remainingTermCards;
      const remainingDescriptionCards = state.remainingDescriptionCards;

      moveCards(remainingTermCards, nextTermCards, 3, true);
      moveCards(remainingDescriptionCards, nextDescriptionCards, 3, true);

      moveCards(nextTermCards, currentTermCards, 7, false);
      moveCards(nextDescriptionCards, currentDescriptionCards, 7, false);

      // If there are less than 7 cards in the currentTermCards array, move cards from the remainingTermCards array
      if (currentTermCards.length < 7) {
        moveCards(remainingTermCards, currentTermCards, 7, true);
        moveCards(remainingDescriptionCards, currentDescriptionCards, 7, true);
      }

      return {
        currentTermCards,
        currentDescriptionCards,
        nextTermCards,
        nextDescriptionCards,
        remainingTermCards,
        remainingDescriptionCards,
      };
    });
  },

  setRemainingTermCards: (remainingTermCards) => set({ remainingTermCards }),
  setRemainingDescriptionCards: (remainingDescriptionCards) =>
    set({ remainingDescriptionCards }),
  setActiveTermCard: (activeTermCard) => set({ activeTermCard }),
  setActiveDescriptionCard: (activeDescriptionCard) =>
    set({ activeDescriptionCard }),
  createMemoryCards: (memoryCards: data[]) => {
    // Loop through all the memoryCards
    const remainingTermCards: Card[] = [];
    const remainingDescriptionCards: Card[] = [];

    for (let index = 0; index < memoryCards.length; index++) {
      const card = memoryCards[index];
      remainingTermCards.push({
        id: card.id,
        text: card.term,
        matched: false,
      });
      remainingDescriptionCards.push({
        id: card.id,
        text: card.description,
        matched: false,
      });
    }

    shuffle(remainingTermCards);
    shuffle(remainingDescriptionCards);
    set({
      remainingTermCards,
      remainingDescriptionCards,
    });
  },
  compareActiveCards: () => {
    set((state) => {
      const activeTermCard = state.activeTermCard;
      const activeDescriptionCard = state.activeDescriptionCard;
      const currentTermCards = state.currentTermCards;
      const currentDescriptionCards = state.currentDescriptionCards;

      if (activeTermCard === null || activeDescriptionCard === null)
        return state;
      if (activeTermCard.id === activeDescriptionCard.id) {
        const updatedTermCards = currentTermCards.map((card) => {
          if (card.text === activeTermCard.text) {
            return { ...card, matched: true };
          }
          return card;
        });
        const updatedDescriptionCards = currentDescriptionCards.map((card) => {
          if (card.text === activeDescriptionCard.text) {
            return { ...card, matched: true };
          }
          return card;
        });
        return {
          ...state,
          currentTermCards: updatedTermCards,
          currentDescriptionCards: updatedDescriptionCards,
          activeTermCard: null,
          activeDescriptionCard: null,
        };
      } else {
        return {
          ...state,
          activeTermCard: null,
          activeDescriptionCard: null,
        };
      }
    });
  },
}));
