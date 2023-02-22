import React, { useState } from 'react'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


function TextEditor() {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  return (
    <div className='w-full'>
        
        
            <Editor 
            editorState={editorState}
            onEditorStateChange={setEditorState}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
          
            />
        
    </div>
  )
}

export default TextEditor