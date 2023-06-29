import React, {useEffect, useMemo} from 'react'
import {withReact} from "slate-react";
import {withYjs, slateNodesToInsertDelta, YjsEditor} from '@slate-yjs/core';
import * as Y from 'yjs';
import {createEditor, Editor, Transforms} from "slate";

const useLiveColab = (initialValue: any) => {
    // Create a yjs document and get the shared type
    // const sharedType = useMemo(() => {
    //     const yDoc = new Y.Doc()
    //     const sharedType = yDoc.get("content", Y.XmlText)
    //
    //     // Load the initial value into the yjs document
    //     sharedType.applyDelta(slateNodesToInsertDelta(initialValue))
    //
    //     return sharedType
    // }, [])
    //
    // // Setup the binding
    // const editor: any = useMemo(() => {
    //     const sharedType = provider.document.get('content', Y.XmlText);
    //     const e = withReact(withYjs(createEditor(), sharedType));
    //
    //     // Ensure editor always has at least 1 valid child
    //     const {normalizeNode} = e;
    //     e.normalizeNode = (entry) => {
    //         const [node] = entry;
    //         if (!Editor.isEditor(node) || node.children.length > 0) {
    //             return normalizeNode(entry);
    //         }
    //
    //         Transforms.insertNodes(
    //             editor,
    //             {
    //                 type: 'paragraph',
    //                 children: [{text: ''}],
    //             },
    //             {at: [0]}
    //         );
    //     };
    // }, []);
    //
    // // const [value, setValue] = useState([])
    //
    // // Connect editor in useEffect to comply with concurrent mode requirements.
    // useEffect(() => {
    //     YjsEditor.connect(editor);
    //     return () => YjsEditor.disconnect(editor);
    // }, [editor]);

    return {}
}

// @ts-ignore


export default useLiveColab