import React, {useMemo, useState} from 'react'
import {Editable, Slate, withReact} from 'slate-react'
import {createEditor,} from 'slate'
import {withHistory} from 'slate-history'
import {toggleFormat} from "../plugins/toolbar";
import plugins from "../plugins/main";
import SearchHighlightingExample from "../plugins/search_highlight";
import {css} from "@emotion/css";

const Editor = (props: any) => {
    const [search, setSearch] = useState<string | undefined>()
    const editor = useMemo(() => withHistory(withReact(createEditor())), [])
    let {decorate} = SearchHighlightingExample(search);
    return (
        <Slate editor={editor} initialValue={props.data}>
            <input onChange={e => setSearch(e.target.value)}/>
            {plugins()}
            <Editable
                decorate={decorate}
                // renderElement={props => <Element {...props} />}
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