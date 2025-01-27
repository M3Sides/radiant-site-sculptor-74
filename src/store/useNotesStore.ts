import { create } from 'zustand';
import { toast } from "sonner";

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

interface NotesStore {
  notes: Note[];
  selectedNoteId: number | null;
  setSelectedNote: (id: number) => void;
  addNote: () => void;
  updateNoteContent: (content: string) => void;
  updateNoteTitle: (id: number, title: string) => void;
  deleteNote: (id: number) => void;
  initializeNotes: () => void;
}

const STORAGE_KEY = 'lovable-notes';
const DEFAULT_NOTES: Note[] = [
  { 
    id: 1, 
    title: "Welcome Note", 
    content: "Start writing your first note!", 
    createdAt: new Date().toISOString() 
  },
  { 
    id: 2, 
    title: "Quick Tips", 
    content: "Click the + button to create a new note.", 
    createdAt: new Date().toISOString() 
  },
];

export const useNotesStore = create<NotesStore>((set, get) => ({
  notes: [],
  selectedNoteId: null,
  
  setSelectedNote: (id) => set({ selectedNoteId: id }),
  
  addNote: () => {
    const { notes } = get();
    const newNote: Note = {
      id: Date.now(),
      title: `New Note ${notes.length + 1}`,
      content: "",
      createdAt: new Date().toISOString()
    };
    
    const updatedNotes = [...notes, newNote];
    set({ notes: updatedNotes, selectedNoteId: newNote.id });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
    toast.success("New note created!");
  },
  
  updateNoteContent: (content) => {
    const { notes, selectedNoteId } = get();
    if (!selectedNoteId) return;
    
    const updatedNotes = notes.map(note => 
      note.id === selectedNoteId ? { ...note, content } : note
    );
    
    set({ notes: updatedNotes });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
  },

  updateNoteTitle: (id, title) => {
    const { notes } = get();
    const updatedNotes = notes.map(note => 
      note.id === id ? { ...note, title } : note
    );
    
    set({ notes: updatedNotes });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
    toast.success("Note title updated!");
  },
  
  deleteNote: (id) => {
    const { notes, selectedNoteId } = get();
    const updatedNotes = notes.filter(note => note.id !== id);
    
    set({ 
      notes: updatedNotes,
      selectedNoteId: id === selectedNoteId ? 
        (updatedNotes[0]?.id || null) : 
        selectedNoteId
    });
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
    toast.success("Note deleted!");
  },
  
  initializeNotes: () => {
    const storedNotes = localStorage.getItem(STORAGE_KEY);
    const initialNotes = storedNotes ? JSON.parse(storedNotes) : DEFAULT_NOTES;
    set({ 
      notes: initialNotes,
      selectedNoteId: initialNotes[0]?.id || null
    });
    
    if (!storedNotes) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_NOTES));
    }
  },
}));