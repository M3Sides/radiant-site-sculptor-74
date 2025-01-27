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
import { Plus, File, Trash2, Bold, Italic, List } from "lucide-react";
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
  const [editingTitle, setEditingTitle] = useState("");
  const selectedNote = notes.find(note => note.id === selectedNoteId);

  useEffect(() => {
    initializeNotes();
  }, [initializeNotes]);

  const handleTitleClick = (noteId: number, currentTitle: string) => {
    setEditingTitleId(noteId);
    setEditingTitle(currentTitle);
  };

  const handleTitleChange = (noteId: number) => {
    if (editingTitle.trim() !== "") {
      updateNoteTitle(noteId, editingTitle);
    }
    setEditingTitleId(null);
  };

  const formatText = (command: string) => {
    document.execCommand(command, false);
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
                      <div className="flex items-center w-full group/item">
                        <SidebarMenuButton
                          onClick={() => setSelectedNote(note.id)}
                          className={selectedNoteId === note.id ? "bg-accent flex-1" : "flex-1"}
                        >
                          <File className="h-4 w-4" />
                          {editingTitleId === note.id ? (
                            <Input
                              value={editingTitle}
                              onChange={(e) => setEditingTitle(e.target.value)}
                              onBlur={() => handleTitleChange(note.id)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleTitleChange(note.id);
                                }
                              }}
                              autoFocus
                              className="h-7 w-full"
                            />
                          ) : (
                            <span 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTitleClick(note.id, note.title);
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
                          className="h-8 w-8 opacity-0 group-hover/item:opacity-100 hover:bg-destructive hover:text-destructive-foreground transition-opacity"
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
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="icon" onClick={() => formatText('bold')}>
                <Bold className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => formatText('italic')}>
                <Italic className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => formatText('insertUnorderedList')}>
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div
            className="flex-1 w-full h-full p-4 focus:outline-none"
            contentEditable
            onInput={(e) => updateNoteContent(e.currentTarget.innerHTML)}
            dangerouslySetInnerHTML={{ __html: selectedNote?.content || "" }}
          />
        </div>
      </div>
    </SidebarProvider>
  );
};