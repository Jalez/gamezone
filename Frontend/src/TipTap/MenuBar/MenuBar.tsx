
import { Paper, IconButton, Select, MenuItem } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import CodeIcon from '@mui/icons-material/Code';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { BubbleMenu, Editor } from '@tiptap/react';
import { useEffect } from 'react';

type Level = 1 | 2 | 3 | 4 | 5 | 6;

type MenuBarProps = {
  editor: Editor;
};

const MenuBar = ({editor}: MenuBarProps) => {

  useEffect(() => {
    console.log("MenuBar editor instance:", editor);
  }, [editor]);
  
    if (!editor) {
      return null;
    }
  
    return (
      <BubbleMenu tippyOptions={{ duration: 5 }} editor={editor}>
        <Paper
         
          sx={{
            display: 'flex',
            alignItems: 'center',
            borderRadius: 10,
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            width: 'fit-content',
          }}
         >
  
            {/* Bold */}
            <IconButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              color={editor.isActive('bold') ? 'primary' : 'default'}
            >
              <FormatBoldIcon />
            </IconButton>
  
            {/* Italic */}
            <IconButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              color={editor.isActive('italic') ? 'primary' : 'default'}
            >
              <FormatItalicIcon />
            </IconButton>
  
            {/* Strike */}
            <IconButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              disabled={!editor.can().chain().focus().toggleStrike().run()}
              color={editor.isActive('strike') ? 'primary' : 'default'}
            >
              <StrikethroughSIcon />
            </IconButton>
  
            {/* Code */}
            <IconButton
              onClick={() => editor.chain().focus().toggleCode().run()}
              disabled={!editor.can().chain().focus().toggleCode().run()}
              color={editor.isActive('code') ? 'primary' : 'default'}
            >
              <CodeIcon />
            </IconButton>
  
            {/* Paragraph */}
            <Select
              value={editor.isActive('paragraph') ? 'paragraph' : 'heading'}
              onChange={(e) => {
                const level = parseInt(e.target.value);
                if (level) {
                  editor.chain().focus().setHeading({ level: level as Level }).run();
                } else {
                  editor.chain().focus().setParagraph().run();
                }
              }}
            >
              <MenuItem value="paragraph">Paragraph</MenuItem>
              {[1, 2, 3, 4, 5, 6].map((level) => (
                <MenuItem key={level} value={level}>
                  H{level}
                </MenuItem>
              ))}
            </Select>
  
            {/* Blockquote */}
            <IconButton
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              color={editor.isActive('blockquote') ? 'primary' : 'default'}
            >
              <FormatQuoteIcon />
            </IconButton>
  
            {/* Bullet list */}
            <IconButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              color={editor.isActive('bulletList') ? 'primary' : 'default'}
            >
              <FormatListBulletedIcon />
            </IconButton>
  
            {/* Ordered list */}
            <IconButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              color={editor.isActive('orderedList') ? 'primary' : 'default'}
            >
              <FormatListNumberedIcon />
            </IconButton>
  
            {/* Horizontal rule */}
            <IconButton
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
            >
              <HorizontalRuleIcon />
            </IconButton>
  
            {/* Undo */}
            <IconButton
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().chain().focus().undo().run()}
            >
              <UndoIcon />
            </IconButton>
  
            {/* Redo */}
            <IconButton
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().chain().focus().redo().run()}
            >
              <RedoIcon />
            </IconButton>
  
            {/* Purple color (example) */}
            <IconButton
              onClick={() => editor.chain().focus().setColor('#958DF1').run()}
              color={editor.isActive('textStyle', { color: '#958DF1' }) ? 'primary' : 'default'}
            >
              <span style={{ backgroundColor: '#958DF1', width: 24, height: 24, borderRadius: '50%' }}></span>
            </IconButton>
        </Paper>
      </BubbleMenu>
    );
  };
  

export default MenuBar;