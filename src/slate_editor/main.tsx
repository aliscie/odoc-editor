import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {Editable, Slate, withReact} from 'slate-react'
import {toggleFormat} from "../plugins/toolbar";
import plugins from "../plugins/main";
import SearchHighlightingExample from "../plugins/search_highlight";
import {css} from "@emotion/css";
import "./style/main.css"
import useMention, {insertMention, Mention, withMentions} from "../plugins/mention";
import {withHistory} from "slate-history";
import {createEditor, NodeEntry, Transforms} from "slate";
import useCode, {CodeElementWrapper, CodeOptions, CodeSetNodeToDecorations, prismThemeCss} from "../plugins/code/code";
import useMarkDown, {MarkDownElement, MarkDownOptions} from "../plugins/markdown/mark_down";
import {withMarkDownShortcuts} from "../plugins/markdown/with_markdown";
import withLayout from "./withs/with_layout";


const Element = (props: any) => {
    const {attributes, children, element} = props

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
            return <b id={element.id}  {...attributes}>{children}</b>
        default:
            break
    }

    let custom_renderer = props.renderElement && props.renderElement(props);
    return custom_renderer
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


const Editor = (props: EditorProps) => {
    let [value, setValue]: any = useState(props.data)
    if (value.length === 0) {
        setValue([{
            type: 'p',
            children: [{text: ''}]
        }])
    }

    // const editor = useMemo(() => withHistory(withReact(createEditor())), [])
    const editor = useMemo(() => withMentions(withReact(withMarkDownShortcuts(withHistory(withLayout(createEditor()))))), [])
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
    const renderElement = useCallback((renderProps: any) => <Element
        {...renderProps} {...props} />, []);


    const combinedDecorate: any = (entry: NodeEntry) => {

        // console.log({selection})
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

    const clickListener = useCallback(() => {
        // const isEmptyParagraphAlreadyAdded = editor.children.some(node => {
        //     return node.text === '';
        // });

        // if (!isEmptyParagraphAlreadyAdded) {
        // Create a new paragraph node
        const newParagraph: any = {
            id: randomString(),
            test: 's',
            type: 'p',
            children: [{text: ''}],
        };


        let is_last_empty = value[value.length - 1]['children'].find((e: any) => e.text === '');
        let click_position = editor.selection && editor.selection.anchor.path[0];
        let is_click_bellow = (value.length - 1) === click_position;

        let position = {
            "anchor": {
                "path": [
                    value.length - 1,
                    0
                ],
                "offset": editor.selection && editor.selection.anchor.offset
            },
            "focus": {
                "path": [
                    value.length - 1,
                    0
                ],
                "offset": editor.selection && editor.selection.focus.offset
            }
        }
        !is_last_empty && is_click_bellow && Transforms.insertNodes(editor, newParagraph, {at: position});
    }, [value, editor]);

    useEffect(() => {
        // Add click event listener to the window
        window.addEventListener('mousedown', clickListener);

        // Clean up the event listener on unmount
        return () => {
            window.removeEventListener('mousedown', clickListener);
        };
    }, [clickListener]);


    return (
        <Slate

            onChange={(e: any) => {
                props.onChange && props.onChange(e)
                mentionOnChange()
                componentsOnChange()
                setValue(e)
            }}

            editor={editor}
            initialValue={value}>
            {plugins()}
            {MentionPortal}
            {ComponentsPortal}
            <CodeSetNodeToDecorations/>
            <style>{prismThemeCss}</style>
            <Editable
                style={{height: window.innerHeight}}
                onKeyDown={(e: any) => {
                    mentionOnKeyDown(e)
                    componentsOnKeyDown(e)
                    // insertAtEnter(e)
                    codeOnKeyDown(e)
                }}
                decorate={combinedDecorate}
                renderElement={renderElement}
                renderLeaf={props => <Leaf {...props} />}
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