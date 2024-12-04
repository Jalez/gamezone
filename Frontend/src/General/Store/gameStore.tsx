// gameStore.ts
import {create} from 'zustand';
import { Game, gameId, User } from '../../interfaces'; // Adjust the path as needed

interface GameStoreState {
    gamesById: { [key: string]: Game };
    gameIds: string[];
    selectedGameId: string | null;
    gameProgress: { [gameId: string]: number }; // Stores currentQuestion per game
  
    // Actions
    initializeGameIds: (gameIds: string[]) => void;
    fetchGameById: (gameId: string) => Promise<void>;
    setSelectedGameId: (gameId: string | null) => void;
    setCurrentQuestion: (gameId: string, questionIndex: number) => void;
    handleAddNewGame: (newGameType: string, user: User) => Promise<void>;
    handleUpdateGame: (updatedGame: Game) => Promise<void>;
    handleRemoveGame: (gameId: string) => Promise<void>;
  }

const useGameStore = create<GameStoreState>((set, get) => ({
    gamesById: {},
    gameIds: [],
    selectedGameId: null,
    gameProgress: {},
  
    initializeGameIds: (gameIds) => {
      set({ gameIds });
      // Optionally prefetch games here
    },

    fetchGameById: async (gameId) => {
        const { gamesById } = get();
        if (gamesById[gameId]) return; // Game already fetched
    
        // Fetch the game from the backend
        const response = await fetch(`http://localhost:3000/api/games/${gameId}`);
        const game = await response.json();
        set((state) => ({
          gamesById: { ...state.gamesById, [gameId]: game },
        }));
      },


  setSelectedGameId: async (gameId) => {
    if (gameId) {
      await get().fetchGameById(gameId);
      // Initialize game progress if not already set
      set((state) => ({
        selectedGameId: gameId,
        gameProgress: {
          ...state.gameProgress,
          [gameId]: state.gameProgress[gameId] || 0,
        },
      }));
    } else {
      set({ selectedGameId: null });
    }
  },


  setCurrentQuestion: (gameId, questionIndex) => {
    set((state) => ({
      gameProgress: {
        ...state.gameProgress,
        [gameId]: questionIndex,
      },
    }));
  },

  handleAddNewGame: async (newGameType, user) => {
    const { gamesById } = get();

    // Create a new game object
    const newGame: Game = {
      creators: [user?._id || ''], // Assuming user has an _id
      name: '', // Will be set below
      type: newGameType,
      content: [], // Initialize based on game type
      dataForGeneration: [],
      generateMainArticle: false,
      generateContent: false,
    };

    // Generate a unique name
    let baseName = newGameType;
    let count = Object.values(gamesById).filter((game) => game.type === newGameType).length;
    newGame.name = count > 0 ? `${baseName} ${count}` : baseName;

    // Initialize content based on game type
    switch (newGameType.toLowerCase()) {
      case 'mcq':
        newGame.content = [
          {
            question: '',
            options: [''],  
            answer: '',
          },
        ];
        break;
      // Initialize other game types accordingly
      default:
        newGame.content = [];
        break;
    }

    // Save new game to backend
    const response = await fetch(`http://localhost:3000/api/games`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newGame),
    });
    const savedGame = await response.json();

    // Update store
    set((state) => ({
      gamesById: { ...state.gamesById, [savedGame._id]: savedGame },
      gameIds: [...state.gameIds, savedGame._id],
      selectedGameId: savedGame._id,
    }));

    // Optionally update the article's game IDs on the backend here
  },

  handleUpdateGame: async (updatedGame) => {
    // Save updated game to backend
    await fetch(`http://localhost:3000/api/games/${updatedGame._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedGame),
    });

    // Update store
    set((state) => ({
      gamesById: { ...state.gamesById, [updatedGame._id as gameId]: updatedGame },
    }));
  },

  handleRemoveGame: async (gameId) => {
    // Remove game from backend
    await fetch(`http://localhost:3000/api/games/${gameId}`, {
      method: 'DELETE',
    });

    // Update store
    set((state) => {
      const newGamesById = { ...state.gamesById };
      delete newGamesById[gameId];
      return {
        gamesById: newGamesById,
        gameIds: state.gameIds.filter((id) => id !== gameId),
        selectedGameId: state.selectedGameId === gameId ? null : state.selectedGameId,
      };
    });

    set((state) => {
        const newGameProgress = { ...state.gameProgress };
        delete newGameProgress[gameId];
        return { gameProgress: newGameProgress };
      });

    // Optionally update the article's game IDs on the backend here
  },
}));

export default useGameStore;
