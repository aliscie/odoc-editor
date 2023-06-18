import React, {useCallback, useMemo} from 'react'
import {Editable, Slate, withReact} from 'slate-react'
import {createEditor,} from 'slate'
import {withHistory} from 'slate-history'
import {toggleFormat} from "../plugins/toolbar";
import plugins from "../plugins/main";
import SearchHighlightingExample from "../plugins/search_highlight";
import {css} from "@emotion/css";
import "./style/main.css"


const Element = (
    props: any
) => {
    const {attributes, children, element} = props
    let custom_renderer = props.renderElement && props.renderElement(props);
    if (custom_renderer) {
        return custom_renderer;
    }

    let Tag = element.type
    switch (Tag) {
        case 'quote':
            return <b {...attributes}>{children}</b>
        default:
            break
    }
    return <Tag {...attributes}>{children}</Tag>
}


interface EditorProps {
    renderElement: any
    onChange?: any,
    searchOptions?: any,
    search?: any,
    data: any
}

const Editor = (props: EditorProps) => {

    const editor = useMemo(() => withHistory(withReact(createEditor())), [])
    let {decorate} = SearchHighlightingExample(props.searchOptions || "", props.search || "");
    const renderElement = useCallback((props: any) => <Element {...props} />, [])

    return (
        <Slate

            onChange={props.onChange}
            editor={editor} initialValue={props.data}>
            {plugins()}
            <Editable
                decorate={decorate}
                // renderElement={props => <Element {...props} />}
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