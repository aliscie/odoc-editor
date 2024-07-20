import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {Editable, Slate, withReact} from 'slate-react'
import {toggleFormat} from "../plugins/toolbar";
import plugins from "../plugins/main";
import SearchHighlightingExample from "../plugins/search_highlight";
import {css} from "@emotion/css";
import "./style/main.css"
import useMention, {Mention, withMentions} from "../plugins/mention";
import {withHistory} from "slate-history";
import {createEditor, NodeEntry, Transforms} from "slate";
import useCode, {CodeElementWrapper, CodeOptions, CodeSetNodeToDecorations, prismThemeCss} from "../plugins/code/code";
import useMarkDown, {MarkDownElement, MarkDownOptions} from "../plugins/markdown/mark_down";
import {withMarkDownShortcuts} from "../plugins/markdown/with_markdown";
import withLayout from "./withs/with_layout";
import Autocomplete from "../plugins/auto_complete/auto_complete";
import withId from "./withs/with_id";
import randomString from "../utiles/rand_string";
import withFooter from "./withs/with_footer";


const Element = (props: any) => {
    const {attributes, children, element} = props

    let Tag = element && element.type || "p"
    if (CodeOptions.includes(element && element.type)) {
        return <CodeElementWrapper {...props}/>
    }
    if (MarkDownOptions.includes(element && element.type)) {
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


interface EditorProps {
    renderElement?: any
    onChange?: any,
    searchOptions?: any,
    search?: any,
    data: any
    mentionOptions?: any[]
    componentsOptions?: any
    onInsertComponent?: any,
    autoCompleteOptions?: any,
    insertFooter?: boolean,
    preventSplit?: boolean,
    preventToolbar?: boolean,
    onMention?: (person: any) => void
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
    const editor = useMemo(() => withMentions(withReact(withMarkDownShortcuts(withHistory(withId(withFooter(withLayout(createEditor()))))))), [])
    if (props.preventSplit) {
        editor.insertBreak = () => {
        }
    }


    const insertMention = (editor: any, character: any) => {
        const mention: any = {
            type: 'mention',
            character,
            children: [{text: ''}],
        }
        Transforms.insertNodes(editor, mention)
        Transforms.move(editor)
        props.onMention && props.onMention(mention)
    }

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


    return (
        <Slate
            key={'1'}
            onChange={(e: any) => {
                props.onChange && props.onChange(e)
                mentionOnChange()
                componentsOnChange()
                setValue(e)
            }}

            editor={editor}
            initialValue={value}>
            {props.preventToolbar !== true && plugins()}
            {MentionPortal}
            {ComponentsPortal}
            <Autocomplete words={props.autoCompleteOptions}/>

            <CodeSetNodeToDecorations/>
            <style>{prismThemeCss}</style>
            <Editable
                // style={{height: window.innerHeight}}
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