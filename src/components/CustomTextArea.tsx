"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, type DraftHandleValue } from "draft-js"
import "draft-js/dist/Draft.css"
import { Button } from "@/components/ui/button"
import { Bold, Italic, Underline, StrikethroughIcon as StrikethroughSquare, List, ListOrdered } from "lucide-react"

type ToolbarButtonProps = {
  icon: React.ReactNode
  onToggle: () => void
  active: boolean
  label: string
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ icon, onToggle, active, label }) => (
  <Button
    variant="ghost"
    size="icon"
    onClick={onToggle}
    className={`p-2 ${active ? "bg-muted" : ""}`}
    aria-label={label}
  >
    {icon}
  </Button>
)

export default function CustomTextArea() {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

  const handleKeyCommand = useCallback((command: string, editorState: EditorState): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      setEditorState(newState)
      return "handled"
    }
    return "not-handled"
  }, [])

  const mapKeyToEditorCommand = useCallback(
    (e: React.KeyboardEvent): string | null => {
      if (e.key === "Tab") {
        const newEditorState = RichUtils.onTab(e, editorState, 4)
        if (newEditorState !== editorState) {
          setEditorState(newEditorState)
        }
        return null
      }
      return getDefaultKeyBinding(e)
    },
    [editorState],
  )

  const toggleInlineStyle = useCallback(
    (inlineStyle: string) => {
      setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle))
    },
    [editorState],
  )

  const toggleBlockType = useCallback(
    (blockType: string) => {
      setEditorState(RichUtils.toggleBlockType(editorState, blockType))
    },
    [editorState],
  )

  const currentStyle = editorState.getCurrentInlineStyle()
  const selection = editorState.getSelection()
  const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType()

  return (
    <div className="border rounded-md shadow-sm">
      <div className="flex flex-wrap gap-1 p-2 border-b bg-muted">
        <ToolbarButton
          icon={<Bold className="h-4 w-4" />}
          onToggle={() => toggleInlineStyle("BOLD")}
          active={currentStyle.has("BOLD")}
          label="Bold"
        />
        <ToolbarButton
          icon={<Italic className="h-4 w-4" />}
          onToggle={() => toggleInlineStyle("ITALIC")}
          active={currentStyle.has("ITALIC")}
          label="Italic"
        />
        <ToolbarButton
          icon={<Underline className="h-4 w-4" />}
          onToggle={() => toggleInlineStyle("UNDERLINE")}
          active={currentStyle.has("UNDERLINE")}
          label="Underline"
        />
        <ToolbarButton
          icon={<StrikethroughSquare className="h-4 w-4" />}
          onToggle={() => toggleInlineStyle("STRIKETHROUGH")}
          active={currentStyle.has("STRIKETHROUGH")}
          label="Strikethrough"
        />
        <ToolbarButton
          icon={<List className="h-4 w-4" />}
          onToggle={() => toggleBlockType("unordered-list-item")}
          active={blockType === "unordered-list-item"}
          label="Bullet List"
        />
        <ToolbarButton
          icon={<ListOrdered className="h-4 w-4" />}
          onToggle={() => toggleBlockType("ordered-list-item")}
          active={blockType === "ordered-list-item"}
          label="Numbered List"
        />
      </div>
      <div className="p-4">
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
          placeholder="Start typing..."
          ariaLabel="Rich text editor"
        />
      </div>
    </div>
  )
}