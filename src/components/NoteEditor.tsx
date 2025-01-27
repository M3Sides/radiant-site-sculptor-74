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
import { Plus, File, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useNotesStore } from "@/store/useNotesStore";

interface NoteEditorProps {
  onClose: () => void;
}

export const NoteEditor = ({ onClose }: NoteEditorProps) => {
  const { 
    notes, 
    selectedNoteId,
    initializeNotes, 
    addNote, 
    setSelectedNote,
    updateNoteContent,
    deleteNote
  } = useNotesStore();

  const selectedNote = notes.find(note => note.id === selectedNoteId);

  useEffect(() => {
    initializeNotes();
  }, [initializeNotes]);

  return (
    <SidebarProvider>
      <div className="flex w-full h-full bg-background">
        <Sidebar>
          <SidebarHeader className="border-b border-border p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Notes</h2>
              <Button variant="ghost" size="icon" onClick={addNote}>
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
                      <div className="flex items-center w-full">
                        <SidebarMenuButton
                          onClick={() => setSelectedNote(note.id)}
                          className={selectedNoteId === note.id ? "bg-accent flex-1" : "flex-1"}
                        >
                          <File className="h-4 w-4" />
                          <span>{note.title}</span>
                        </SidebarMenuButton>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => deleteNote(note.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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
          <textarea
            className="flex-1 w-full h-full p-4 resize-none focus:outline-none"
            value={selectedNote?.content || ""}
            onChange={(e) => updateNoteContent(e.target.value)}
            placeholder="Start writing..."
          />
        </div>
      </div>
    </SidebarProvider>
  );
};