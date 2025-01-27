import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Plus, File } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

interface NoteEditorProps {
  onClose: () => void;
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

export const NoteEditor = ({ onClose }: NoteEditorProps) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  useEffect(() => {
    const storedNotes = localStorage.getItem(STORAGE_KEY);
    if (!storedNotes) {
      setNotes(DEFAULT_NOTES);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_NOTES));
    } else {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  useEffect(() => {
    if (notes.length > 0 && !selectedNote) {
      setSelectedNote(notes[0]);
    }
  }, [notes, selectedNote]);

  const createNewNote = () => {
    const newNote: Note = {
      id: Date.now(),
      title: `New Note ${notes.length + 1}`,
      content: "",
      createdAt: new Date().toISOString()
    };
    
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    setSelectedNote(newNote);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
    toast.success("New note created!");
  };

  const updateNoteContent = (content: string) => {
    if (!selectedNote) return;

    const updatedNotes = notes.map(note => 
      note.id === selectedNote.id ? { ...note, content } : note
    );
    
    setNotes(updatedNotes);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
  };

  return (
    <SidebarProvider>
      <div className="flex w-full h-full bg-background">
        <Sidebar>
          <SidebarHeader className="border-b border-border p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Notes</h2>
              <Button variant="ghost" size="icon" onClick={createNewNote}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>All Notes</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {notes.map((note) => (
                    <SidebarMenuItem key={note.id}>
                      <SidebarMenuButton
                        onClick={() => setSelectedNote(note)}
                        className={selectedNote?.id === note.id ? "bg-accent" : ""}
                      >
                        <File className="h-4 w-4" />
                        <span>{note.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col h-full">
          <div className="border-b border-border p-4">
            <h1 className="text-xl font-semibold">{selectedNote?.title}</h1>
          </div>
          <div className="flex-1">
            <textarea
              className="w-full h-full p-4 resize-none focus:outline-none"
              value={selectedNote?.content || ""}
              onChange={(e) => updateNoteContent(e.target.value)}
              placeholder="Start writing..."
            />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};