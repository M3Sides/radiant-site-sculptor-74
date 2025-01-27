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
import { X, Plus, File } from "lucide-react";
import { useState } from "react";

interface NoteEditorProps {
  onClose: () => void;
}

export const NoteEditor = ({ onClose }: NoteEditorProps) => {
  const [notes] = useState([
    { id: 1, title: "Welcome Note", content: "Start writing your first note!" },
    { id: 2, title: "Quick Tips", content: "Click the + button to create a new note." },
  ]);
  const [selectedNote, setSelectedNote] = useState(notes[0]);

  return (
    <SidebarProvider>
      <div className="flex w-full h-full bg-background">
        <Sidebar>
          <SidebarHeader className="border-b border-border p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Notes</h2>
              <Button variant="ghost" size="icon">
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
                        className={selectedNote.id === note.id ? "bg-accent" : ""}
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
          <div className="border-b border-border p-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold">{selectedNote.title}</h1>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1 p-6">
            <textarea
              className="w-full h-full p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              defaultValue={selectedNote.content}
              placeholder="Start writing..."
            />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};