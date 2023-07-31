import React, {useCallback, useMemo} from 'react'
import {Editable, Slate, withReact} from 'slate-react'
import {toggleFormat} from "../plugins/toolbar";
import plugins from "../plugins/main";
import SearchHighlightingExample from "../plugins/search_highlight";
import {css} from "@emotion/css";
import "./style/main.css"
import useMention, {insertMention, Mention, withMentions} from "../plugins/mention";
import {withHistory} from "slate-history";
import {createEditor, Editor as SlateEditor, NodeEntry, Transforms} from "slate";
import useCode, {CodeElementWrapper, CodeOptions, CodeSetNodeToDecorations, prismThemeCss} from "../plugins/code/code";
import useMarkDown, {MarkDownElement, MarkDownOptions} from "../plugins/markdown/mark_down";
import {withMarkDownShortcuts} from "../plugins/markdown/with_markdown";


const Element = (props: any) => {
    const {attributes, children, element} = props
    let custom_renderer = props.renderElement && props.renderElement(props);
    if (custom_renderer) {
        return custom_renderer;
    }
    let Tag = element.type || "p"
    if (CodeOptions.includes(element.type)) {
        return <CodeElementWrapper {...props}/>
    }
    if (MarkDownOptions.includes(element.type)) {
        return <MarkDownElement {...props} />
    }


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

function randomString() {
    return Math.random().toString(36).substring(7);
}


interface EditorProps {
    renderElement?: any
    onChange?: any,
    searchOptions?: any,
    search?: any,
    data: any
    mentionOptions?: any[]
    componentsOptions?: any
    onInsertComponent?: any
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
    const editor = useMemo(() => withMentions(withReact(withMarkDownShortcuts(withHistory(createEditor())))), [])
    let [MentionPortal,
        mentionOnChange,
        mentionOnKeyDown] = useMention(props.mentionOptions, /^@(\w+)$/, editor, insertMention);

    let {codeDecorate, codeOnKeyDown} = useCode(editor)
    const insertComponent = (editor: any, component: any) => {
        const mention: any = {
            ...component,
        }
        props.onInsertComponent && props.onInsertComponent(editor, component)
        Transforms.insertNodes(editor, mention)
        Transforms.move(editor)
    }
    let [ComponentsPortal,
        componentsOnChange,
        componentsOnKeyDown] = useMention(props.componentsOptions, /^\/(\w+)$/, editor, insertComponent);

    // let editor = mentionEditor;
    let {decorate} = SearchHighlightingExample(props.searchOptions || "", props.search || "");
    const renderElement = useCallback((renderProps: any) => <Element {...renderProps} {...props} />, [])


    // a functoin that get the current slateNode
    function getType(editor: any) {
        let type = "";
        let [match] = SlateEditor.nodes(editor, {
            match: (n: any) => {
                n.type && (type = n.type)
                return false;
            },
        })
        return type
    }

    // function insertAtEnter(e: KeyboardEvent) {
    //
    //     if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
    //         e.preventDefault()
    //         let id = randomString();
    //         let type = "p";
    //         e.preventDefault()
    //         const component: any = {
    //             id,
    //             type,
    //             children: [{text: ''}],
    //         }
    //         let at = [editor.selection.anchor.path[0] + 1]
    //         Transforms.insertNodes(editor, component,
    //             {at}
    //         )
    //         Transforms.move(editor)
    //
    //     } else if (e.key === "Enter" && e.shiftKey) {
    //         e.preventDefault()
    //         editor.insertText("\n")
    //     } else if (e.key === 'Enter') {
    //         let id = randomString();
    //         let type = getType(editor);
    //         e.preventDefault()
    //         const mention: any = {
    //             id,
    //             type,
    //             children: [{text: ''}],
    //         }
    //         Transforms.insertNodes(editor, mention)
    //         document.getElementById(id)?.focus()
    //     }
    // }


    const combinedDecorate: any = (entry: NodeEntry) => {
        const decorations: Range[] = [];

        // Concatenate the decorations arrays
        decorations.push(
            ...decorate(entry),
            ...codeDecorate(entry)
        );

        // Return the combined decorations
        return decorations;
    };
    let {markDownHandleDOMBeforeInput} = useMarkDown(editor);

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
            <CodeSetNodeToDecorations/>
            <style>{prismThemeCss}</style>
            <Editable
                onKeyDown={(e: any) => {
                    mentionOnKeyDown(e)
                    componentsOnKeyDown(e)
                    // insertAtEnter(e)
                    codeOnKeyDown(e)
                }}
                decorate={combinedDecorate}
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
                        default:
                            return markDownHandleDOMBeforeInput(event)
                    }
                }}
            />
        </Slate>
    )
}


// @ts-ignore
const Leaf = ({attributes, children, leaf}) => {
    // const {attributes, children, leaf} = props
    const {text, ...rest} = leaf

    if (leaf.bold) {
        children = <strong>{children}</strong>
    }

    if (leaf.italic) {
        children = <em>{children}</em>
    }

    if (leaf.underlined) {
        children = <u>{children}</u>
    }
    let classNames = css`
      font-weight: ${leaf.bold && 'bold'};
      background-color: ${leaf.highlight && '#ffeeba'};
    `;
    return <span
        {...attributes}
        {...(leaf.highlight && {'data-cy': 'search-highlighted'})}
        className={
            `${Object.keys(rest).join(' ')} ${classNames}`
        }
    >
      {children}
    </span>
}


export default Editor