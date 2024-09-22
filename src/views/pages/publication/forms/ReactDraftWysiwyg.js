import { useState } from 'react';
// third-party
import { Editor } from 'react-draft-wysiwyg';
import { ContentState, EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// ==============================|| EDITOR ||============================== //

const ReactDraftWysiwyg = ({ value, onChange }) => {
    const [editorState, setEditorState] = useState(() => {
        return EditorState.createWithContent(ContentState.createFromText(value));
    });

    const onEditorStateChange = (editor) => {
        setEditorState(editor);
        const content = editor.getCurrentContent().getPlainText(); // Get plain text content
        onChange(content); // Pass the content to parent
    };

    return (
        <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
        />
    );
};

export default ReactDraftWysiwyg;
