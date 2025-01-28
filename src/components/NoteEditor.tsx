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
import { Plus, File, Trash2, Bold, Italic, List, ListOrdered } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useNotesStore } from "@/store/useNotesStore";
import { Input } from "./ui/input";
import { Editor, EditorState, RichUtils, convertToRaw, convertFromHTML, ContentState } from "draft-js";
import "draft-js/dist/Draft.css";

interface NoteEditorProps {
  onClose: () => void;
}

type ToolbarButtonProps = {
  icon: React.ReactNode;
  onToggle: () => void;
  active: boolean;
  label: string;
}

const ToolbarButton = ({ icon, onToggle, active, label }: ToolbarButtonProps) => (
  <Button
    variant="ghost"
    size="icon"
    onClick={onToggle}
    className={`h-7 px-2 hover:bg-accent ${active ? "bg-accent" : ""}`}
    aria-label={label}
  >
    {icon}
  </Button>
);

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
  
  const [editorState, setEditorState] = useState(() => {
    if (selectedNote?.content) {
      try {
        const contentState = convertFromRaw(JSON.parse(selectedNote.content));
        return EditorState.createWithContent(contentState);
      } catch (e) {
        console.log('Error parsing content:', e);
        return EditorState.createEmpty();
      }
    }
    return EditorState.createEmpty();
  });

  const handleKeyCommand = useCallback((command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  }, []);

  const toggleInlineStyle = useCallback((inlineStyle: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  }, [editorState]);

  const toggleBlockType = useCallback((blockType: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  }, [editorState]);

  useEffect(() => {
    initializeNotes();
  }, [initializeNotes]);

  useEffect(() => {
    if (selectedNote?.content) {
      const blocksFromHTML = convertFromHTML(selectedNote.content);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      setEditorState(EditorState.createWithContent(contentState));
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, [selectedNote]);

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

  const handleEditorChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
    if (selectedNoteId) {
      const contentState = newEditorState.getCurrentContent();
      const rawContent = convertToRaw(contentState);
      updateNoteContent(JSON.stringify(rawContent));
    }
  };

  const currentStyle = editorState.getCurrentInlineStyle();
  const selection = editorState.getSelection();
  const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

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
          <div className="border-b border-border p-2">
            <h1 className="text-xl font-semibold mb-2">{selectedNote?.title}</h1>
            <div className="flex gap-1">
              <ToolbarButton
                icon={<Bold className="h-3.5 w-3.5" />}
                onToggle={() => toggleInlineStyle("BOLD")}
                active={currentStyle.has("BOLD")}
                label="Bold"
              />
              <ToolbarButton
                icon={<Italic className="h-3.5 w-3.5" />}
                onToggle={() => toggleInlineStyle("ITALIC")}
                active={currentStyle.has("ITALIC")}
                label="Italic"
              />
              <ToolbarButton
                icon={<List className="h-3.5 w-3.5" />}
                onToggle={() => toggleBlockType("unordered-list-item")}
                active={blockType === "unordered-list-item"}
                label="Bullet List"
              />
              <ToolbarButton
                icon={<ListOrdered className="h-3.5 w-3.5" />}
                onToggle={() => toggleBlockType("ordered-list-item")}
                active={blockType === "ordered-list-item"}
                label="Numbered List"
              />
            </div>
          </div>
          <div className="flex-1 w-full h-full overflow-auto p-4">
            <Editor
              editorState={editorState}
              onChange={handleEditorChange}
              handleKeyCommand={handleKeyCommand}
              placeholder="Start typing..."
              ariaLabel="Rich text editor"
            />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};