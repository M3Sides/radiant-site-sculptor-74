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
import { useEffect, useState } from "react";
import { useNotesStore } from "@/store/useNotesStore";
import { Input } from "./ui/input";

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
    updateNoteTitle,
    deleteNote
  } = useNotesStore();

  const [editingTitleId, setEditingTitleId] = useState<number | null>(null);
  const selectedNote = notes.find(note => note.id === selectedNoteId);

  useEffect(() => {
    initializeNotes();
  }, [initializeNotes]);

  const handleTitleClick = (noteId: number) => {
    setEditingTitleId(noteId);
  };

  const handleTitleChange = (noteId: number, newTitle: string) => {
    updateNoteTitle(noteId, newTitle);
    setEditingTitleId(null);
  };

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
                      <div className="flex items-center w-full group">
                        <SidebarMenuButton
                          onClick={() => setSelectedNote(note.id)}
                          className={selectedNoteId === note.id ? "bg-accent flex-1" : "flex-1"}
                        >
                          <File className="h-4 w-4" />
                          {editingTitleId === note.id ? (
                            <Input
                              value={note.title}
                              onChange={(e) => handleTitleChange(note.id, e.target.value)}
                              onBlur={() => setEditingTitleId(null)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleTitleChange(note.id, e.currentTarget.value);
                                }
                              }}
                              autoFocus
                              className="h-7 w-full"
                            />
                          ) : (
                            <span 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTitleClick(note.id);
                              }}
                              className="cursor-text"
                            >
                              {note.title}
                            </span>
                          )}
                        </SidebarMenuButton>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 hover:bg-destructive hover:text-destructive-foreground transition-opacity"
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