import {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import "./styles.scss";
import { Box } from "@mui/material";
import ErrorBoundary from "../Error";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import ListItem from "@tiptap/extension-list-item";
import Color from "@tiptap/extension-color";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import MenuBar from "./MenuBar/MenuBar";

const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      backgroundColor: {
        default: null,
        parseHTML: (element) =>
          element.getAttribute("data-background-color"),
        renderHTML: (attributes) => {
          return {
            "data-background-color": attributes.backgroundColor,
            style: `background-color: ${attributes.backgroundColor}`,
          };
        },
      },
    };
  },
});

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  Table.configure({
    resizable: true,
  }),
  TableRow,
  CustomTableCell,
  TableHeader,
];




type TipTapProps = {
  content?: string;
  edit?: string;
  isEditing?: boolean;
  onUpdate?: (content: string) => void;
  chapterId?: string;
};

const TipTap = ({
  content,
  edit,
  isEditing,
  onUpdate,
  chapterId,
}: TipTapProps) => {
  const [date, setDate] = useState(new Date(parseInt(edit || "0")));

  useEffect(() => {
    setDate(new Date(parseInt(edit || "0")));
  }, [edit]);

  // Memoize the onUpdate handler
  const onUpdateHandler = useCallback(
    ({ editor }: { editor: Editor }) => {
      const html = editor.getHTML();
      onUpdate && onUpdate(html);
    },
    [onUpdate]
  );

  // Memoize the editor options
  const editorOptions = useMemo(
    () => ({
      extensions: extensions,
      onUpdate: onUpdateHandler,
    }),
    [onUpdateHandler, content]
  );

  const editor = useEditor(editorOptions, []);

  // Update editable state when isEditing changes
  useEffect(() => {
    if (editor) {
      editor.setEditable(!!isEditing);
    }
  }, [isEditing, editor]);

  // Set initial content when editor is ready
  useEffect(() => {
    if (editor && editor.isEmpty) {
      editor.commands.setContent(content || "");
    }
  }, [editor]);

  // Use ref to track previous chapterId
  const prevChapterIdRef = useRef(chapterId);

  // Update editor content only when chapterId changes
  useEffect(() => {
    if (editor && chapterId !== prevChapterIdRef.current) {
      editor.commands.setContent(content || "");
      prevChapterIdRef.current = chapterId;
    }
  }, [chapterId, content, editor]);

  if (!editor) {
    return null;
  }
  console.log("isEditing", isEditing);

  return (
    <>
    <ErrorBoundary>
      <div>
        <EditorContent editor={editor} />
        <MenuBar editor={editor} />
      </div>
      <Box className="last-edited">
        Last saved edit at: {date.toLocaleString()}
      </Box>
   </ErrorBoundary>
    </>
  );
};
export default TipTap;
