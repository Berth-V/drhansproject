import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import { useRef } from 'react';
import './RichTextEditor.css';

// Convert plain text (no HTML tags) to basic HTML paragraphs
const toEditorHTML = (raw) => {
  if (!raw) return '<p></p>';
  if (/<[a-z][\s\S]*>/i.test(raw)) return raw; // already HTML
  return raw
    .split(/\n{2,}/)
    .map((block) => `<p>${block.replace(/\n/g, '<br>')}</p>`)
    .filter((p) => p !== '<p></p>')
    .join('') || '<p></p>';
};

const ToolbarButton = ({ onClick, active, title, children }) => (
  <button
    type="button"
    title={title}
    onMouseDown={(e) => { e.preventDefault(); onClick(); }}
    className={`rte-toolbar__btn${active ? ' rte-toolbar__btn--active' : ''}`}
  >
    {children}
  </button>
);

const RichTextEditor = ({ value, onChange }) => {
  const lastValue = useRef(value);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: toEditorHTML(value),
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      lastValue.current = html;
      onChange(html);
    },
    // Sync only when the value changes from outside (e.g. switching posts)
    onCreate: ({ editor }) => {
      lastValue.current = editor.getHTML();
    },
  });

  // Sync external value changes (e.g. loading a different post to edit)
  if (editor && value !== lastValue.current) {
    lastValue.current = value;
    editor.commands.setContent(toEditorHTML(value), false);
  }

  if (!editor) return null;

  return (
    <div className="rte">
      <div className="rte-toolbar">
        <ToolbarButton
          title="Alinear izquierda"
          active={editor.isActive({ textAlign: 'left' })}
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
        >
          &#8676;
        </ToolbarButton>
        <ToolbarButton
          title="Centrar"
          active={editor.isActive({ textAlign: 'center' })}
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
        >
          &#8284;
        </ToolbarButton>
        <ToolbarButton
          title="Alinear derecha"
          active={editor.isActive({ textAlign: 'right' })}
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
        >
          &#8677;
        </ToolbarButton>

        <span className="rte-toolbar__sep" />

        <ToolbarButton
          title="Negrita"
          active={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <strong>B</strong>
        </ToolbarButton>
        <ToolbarButton
          title="Cursiva"
          active={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <em>I</em>
        </ToolbarButton>
      </div>

      <EditorContent editor={editor} className="rte-editor" />

      <p className="rte-hint">
        Enter = nuevo párrafo &nbsp;·&nbsp; Shift+Enter = salto de línea
      </p>
    </div>
  );
};

export default RichTextEditor;
