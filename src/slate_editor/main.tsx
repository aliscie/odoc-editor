import React, {useCallback, useMemo} from 'react'
import {Editable, Slate, withReact} from 'slate-react'
import {toggleFormat} from "../plugins/toolbar";
import plugins from "../plugins/main";
import SearchHighlightingExample from "../plugins/search_highlight";
import {css} from "@emotion/css";
import "./style/main.css"
import useMention, {insertComponent, insertMention, Mention, withMentions} from "../plugins/mention";
import {withHistory} from "slate-history";
import {createEditor} from "slate";


const Element = (props: any) => {
    const {attributes, children, element} = props
    let custom_renderer = props.renderElement && props.renderElement(props);
    if (custom_renderer) {
        return custom_renderer;
    }

    let Tag = element.type || "p"
    switch (Tag) {
        case 'mention':
            return <Mention {...props} />
        case 'quote':
            return <b {...attributes}>{children}</b>
        default:
            break
    }
    return <Tag {...attributes}>{children}</Tag>
}


interface EditorProps {
    renderElement?: any
    onChange?: any,
    searchOptions?: any,
    search?: any,
    data: any
    mentionOptions?: any[]
    componentsOptions?: any
}


// const withLayout = (editor: SlateEditor) => {
//     const {normalizeNode} = editor;
//
//     editor.normalizeNode = ([node, path]) => {
//         if (path.length === 0) {
//             if (editor.children.length <= 1 && SlateEditor.string(editor, [0, 0]) === '') {
//                 const title: any = {
//                     type: 'title',
//                     children: [{text: 'Untitled'}],
//                 };
//                 Transforms.insertNodes(editor, title, {
//                     at: path.concat(0),
//                     select: true,
//                 });
//             }
//
//             if (editor.children.length < 2) {
//                 const paragraph: any = {
//                     type: 'paragraph',
//                     children: [{text: ''}],
//                 };
//                 Transforms.insertNodes(editor, paragraph, {at: path.concat(1)});
//             }
//
//             for (const [child, childPath] of Node.children(editor, path)) {
//                 let type: string;
//                 const slateIndex = childPath[0];
//                 const enforceType = (type: string) => {
//                     if (SlateElement.isElement(child) && child.type !== type) {
//                         const newProperties: Partial<SlateElement> = {type};
//                         Transforms.setNodes<SlateElement>(editor, newProperties, {
//                             at: childPath,
//                         });
//                     }
//                 };
//
//                 switch (slateIndex) {
//                     case 0:
//                         type = 'title';
//                         enforceType(type);
//                         break;
//                     case 1:
//                         type = 'paragraph';
//                         enforceType(type);
//                     default:
//                         break;
//                 }
//             }
//         }
//
//         return normalizeNode([node, path]);
//     };
//
//     return editor;
// };

const Editor = (props: EditorProps) => {
    // const editor = useMemo(() => withHistory(withReact(createEditor())), [])
    const editor = useMemo(() => withMentions(withReact(withHistory(createEditor()))), [])
    let [MentionPortal,
        mentionOnChange,
        mentionOnKeyDown] = useMention(props.mentionOptions, /^@(\w+)$/, editor, insertMention);

    let [ComponentsPortal,
        componentsOnChange,
        componentsOnKeyDown] = useMention(props.componentsOptions, /^\/(\w+)$/, editor, insertComponent);

    // let editor = mentionEditor;
    let {decorate} = SearchHighlightingExample(props.searchOptions || "", props.search || "");
    const renderElement = useCallback((renderProps: any) => <Element {...renderProps} {...props} />, [])

    return (
        <Slate

            onChange={(e: any) => {
                props.onChange && props.onChange(e)
                mentionOnChange()
                componentsOnChange()
            }}

            editor={editor}
            initialValue={props.data}>
            {plugins()}
            {MentionPortal}
            {ComponentsPortal}
            <Editable
                onKeyDown={(e: any) => {
                    mentionOnKeyDown(e)
                    componentsOnKeyDown(e)
                }}
                decorate={decorate}
                renderElement={renderElement}
                renderLeaf={props => <Leaf {...props} />}
                placeholder="Enter some text..."
                onDOMBeforeInput={(event: InputEvent) => {
                    switch (event.inputType) {
                        case 'formatBold':
                            event.preventDefault()
                            return toggleFormat(editor, 'bold')
                        case 'formatItalic':
                            event.preventDefault()
                            return toggleFormat(editor, 'italic')
                        case 'formatUnderline':
                            event.preventDefault()
                            return toggleFormat(editor, 'underlined')
                    }
                }}
            />
        </Slate>
    )
}


// @ts-ignore
const Leaf = ({attributes, children, leaf}) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>
    }

    if (leaf.italic) {
        children = <em>{children}</em>
    }

    if (leaf.underlined) {
        children = <u>{children}</u>
    }

    return <span
        {...attributes}
        {...(leaf.highlight && {'data-cy': 'search-highlighted'})}
        className={css`
          font-weight: ${leaf.bold && 'bold'};
          background-color: ${leaf.highlight && '#ffeeba'};
        `}
    >
      {children}
    </span>
}


export default Editor