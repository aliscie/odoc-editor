import React from 'react';
import "./style/main.css";
interface EditorProps {
    renderElement?: any;
    onChange?: any;
    searchOptions?: any;
    search?: any;
    data: any;
    mentionOptions?: any[];
    componentsOptions?: any;
    onInsertComponent?: any;
}
declare const Editor: (props: EditorProps) => React.JSX.Element;
export default Editor;
