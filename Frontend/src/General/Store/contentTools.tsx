import { create } from 'zustand';

type data = {
  [key: string]: any;
}

// Define the shared state type and actions
type basicState = {
  isEditing: boolean;
  isSaving: boolean;
  isAdding: boolean;
  hovering: boolean;
  url: string;
  currentData: data;
  data: data;
  setEditing: (editingStatus: boolean) => void;
  setSaving: (savingStatus: boolean) => void;
  setAdding: (addingStatus: boolean) => void;
  setHovering: (hoverStatus: boolean) => void;
  setCurrentData: (data: data) => void;
  setUrl: (url: string) => void;
  setData: (data: data) => void;
  handleEditClick: () => void;
  handleSaveClick: () => void;
  updateCurrentData: (data: data) => void;
};

// Fix: Type the set function properly to allow state updater functions
const createToolsSlice = (
  set: (partial: Partial<basicState> | ((state: basicState) => Partial<basicState>)) => void
): basicState => ({
  isEditing: false,
  isSaving: false,
  isAdding: false,
  hovering: false,
  url: '',
  currentData: {},
  data: {},
  setEditing: (editingStatus) => set({ isEditing: editingStatus }),
  setSaving: (savingStatus) => set({ isSaving: savingStatus }),
  setAdding: (addingStatus) => set({ isAdding: addingStatus }),
  setHovering: (hoverStatus) => set({ hovering: hoverStatus }),
  //Setcurrent data should look for the current data in the data object, if it doesn't exist, add it to the data object with the _id as the key and then set the current data
  setCurrentData: (data) => {
    const currentData = data[data._id];
    if (!currentData) {
      set((state: basicState) => ({
        data: { ...state.data, [data._id]: data },
        currentData: data,
      }));
    } else {
      set({ currentData });
    }
  },
  updateCurrentData: (data) => set((state: basicState) => ({  
    data: { ...state.data, [data._id]: data },
    currentData: data,
  })),
  
  setUrl: (url) => set({ url }),
  setData: (data) => set({ data }),
  // Properly type state and use an updater function
  handleEditClick: () => set((state: basicState) => ({ isEditing: true, isSaving: false })),
  handleSaveClick: () => set({ isEditing: false, isSaving: true }),
});

// Create separate stores for game and content using the same slice
const useGameToolStore = create<basicState>((set) => createToolsSlice(set));
const useContentStore = create<basicState>((set) => createToolsSlice(set));

export { useGameToolStore, useContentStore };
