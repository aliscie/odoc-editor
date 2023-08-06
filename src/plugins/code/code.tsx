import "prismjs-components-importer/cjs/prism-typescript";
import "prismjs-components-importer/cjs/prism-jsx";
import "prismjs-components-importer/cjs/prism-python";

// import 'prismjs/components/prism-javascript'
// import 'prismjs/components/prism-jsx'
// import 'prismjs/components/prism-typescript'
// import 'prismjs/components/prism-tsx'
// import 'prismjs/components/prism-markdown'
// import 'prismjs/components/prism-python'
// import 'prismjs/components/prism-php'
// import 'prismjs/components/prism-sql'
// import 'prismjs/components/prism-java'
import React, {useCallback, useState} from 'react'
import {createEditor, Editor, Element, Node, Range, Transforms,} from 'slate'
import {
    Editable,
    ReactEditor,
    RenderElementProps,
    RenderLeafProps,
    Slate,
    useSlate,
    useSlateStatic,
    withReact,
} from 'slate-react'
import isHotkey from 'is-hotkey'
import {css} from '@emotion/css'
import {Button, Icon} from "../../components/editor_components";
import {normalizeTokens} from "../normalize-tokens";
import Prism from "prismjs";
import codeInitialValue, {CodeBlockType, CodeLineType, ParagraphType} from "./code_initValue";
import {withHistory} from "slate-history";
import Autocomplete from "../auto_complete/auto_complete";


export const useCode = (editor: any) => {
    // const [editor] = useState(() => withHistory(withReact(createEditor())))

    const codeDecorate: any = useDecorate(editor)
    const codeOnKeyDown: any = useOnKeydown(editor)
    return {codeDecorate, codeOnKeyDown}

}


// export const CodeEditorSample = () => {
//     const [editor] = useState(() => withHistory(withReact(createEditor())))
//
//     const codeDecorate: any = useDecorate(editor)
//     const codeOnKeyDown: any = useOnKeydown(editor)
//     return (
//         <Slate editor={editor} initialValue={codeInitialValue}>
//             {/*<ExampleToolbar/>*/}
//             <CodeSetNodeToDecorations/>
//             <Editable
//                 decorate={codeDecorate}
//                 renderElement={CodeElementWrapper}
//                 renderLeaf={codeRenderLeaf}
//                 onKeyDown={codeOnKeyDown}
//             />
//             <style>{prismThemeCss}</style>
//         </Slate>
//     )
// }

export const CodeOptions = [CodeBlockType, CodeLineType];
export const CodeElementWrapper = (props: RenderElementProps) => {
    const {attributes, children, element}: any = props
    const editor: any = useSlateStatic()

    if (element.type === CodeBlockType) {
        const setLanguage = (language: string) => {
            const path = ReactEditor.findPath(editor, element)
            Transforms.setNodes(editor, {language}, {at: path})
        }

        return (
            <div
                {...attributes}
                className={css(`
        font-family: monospace;
        font-size: 16px;
        line-height: 20px;
        margin-top: 0;
        background: rgba(0, 20, 60, .03);
        padding: 5px 13px;
      `)}
                style={{position: 'relative'}}
                spellCheck={false}
            >
                <LanguageSelect
                    value={element.language}
                    onChange={e => setLanguage(e.target.value)}
                />
                {children}
            </div>
        )
    }

    if (element.type === CodeLineType) {
        return (
            <div {...attributes} style={{position: 'relative'}}>
                {children}
            </div>
        )
    }

    const Tag = editor.isInline(element) ? 'span' : 'div'
    return (
        <Tag {...attributes} style={{position: 'relative'}}>
            {children}
        </Tag>
    )
}

const ExampleToolbar = () => {
    return (
        // <Toolbar>
        <CodeBlockButton/>
        // </Toolbar>
    )
}

const CodeBlockButton = () => {
    const editor = useSlateStatic()
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        Transforms.wrapNodes(
            editor,
            {type: CodeBlockType, language: 'html', children: []},
            {
                match: (n: any) => Element.isElement(n) && n.type === ParagraphType,
                split: true,
            }
        )
        Transforms.setNodes(
            editor,
            {type: CodeLineType},
            {match: (n: any) => Element.isElement(n) && n.type === ParagraphType}
        )
    }

    return (
        <Button
            data-test-id="code-block-button"
            active
            onMouseDown={(event: any) => {
                event.preventDefault()
                handleClick(event)
            }}
        >
            <Icon>code</Icon>
        </Button>
    )
}

// export const codeRenderLeaf = (props: RenderLeafProps) => {
//     const {attributes, children, leaf} = props
//     const {text, ...rest} = leaf
//
//     return (
//         <span {...attributes} className={Object.keys(rest).join(' ')}>
//       {children}
//     </span>
//     )
// }

const useDecorate = (editor: any) => {
    return useCallback(([node, path]: any) => {
            if (Element.isElement(node) && node.type === CodeLineType) {
                const ranges = editor.nodeToDecorations.get(node) || []
                return ranges
            }

            return []
        },
        [editor.nodeToDecorations]
    )
}

// const getChildNodeToDecorations: any = ([block, blockPath]: NodeEntry<CodeBlockElement>) => {
const getChildNodeToDecorations: any = ([block, blockPath]: any) => {

    const nodeToDecorations = new Map<Element, Range[]>()

    const text = block.children.map((line: any) => Node.string(line)).join('\n')
    const language = block.language
    const tokens = Prism.tokenize(text, Prism.languages[language])
    const normalizedTokens = normalizeTokens(tokens) // make tokens flat and grouped by line
    const blockChildren = block.children as Element[]

    for (let index = 0; index < normalizedTokens.length; index++) {
        const tokens = normalizedTokens[index]
        const element = blockChildren[index]

        if (!nodeToDecorations.has(element)) {
            nodeToDecorations.set(element, [])
        }

        let start = 0
        for (const token of tokens) {
            const length = token.content.length
            if (!length) {
                continue
            }

            const end = start + length

            const path = [...blockPath, index, 0]
            const range = {
                anchor: {path, offset: start},
                focus: {path, offset: end},
                token: true,
                ...Object.fromEntries(token.types.map(type => [type, true])),
            }

            nodeToDecorations.get(element)!.push(range)

            start = end
        }
    }

    return nodeToDecorations
}

// precalculate editor.nodeToDecorations map to use it inside decorate function then
export const CodeSetNodeToDecorations = () => {
    const editor: any = useSlate()

    const blockEntries: any = Array.from(
        Editor.nodes(editor, {
            at: [],
            mode: 'highest',
            match: (n: any) => Element.isElement(n) && n.type === CodeBlockType,
        })
    )

    const nodeToDecorations = mergeMaps(
        ...blockEntries.map(getChildNodeToDecorations)
    )

    editor.nodeToDecorations = nodeToDecorations

    return null
}

const useOnKeydown = (editor: Editor) => {
    const onKeyDown: React.KeyboardEventHandler = useCallback(
        e => {
            if (isHotkey('tab', e)) {
                // handle tab key, insert spaces
                e.preventDefault()

                Editor.insertText(editor, '  ')
            }
        },
        [editor]
    )

    return onKeyDown
}

const LanguageSelect = (props: JSX.IntrinsicElements['select']) => {
    return (
        <select
            data-test-id="language-select"
            contentEditable={false}
            className={css`
              position: absolute;
              right: 5px;
              top: 5px;
              z-index: 1;
            `}
            {...props}
        >
            <option value="css">CSS</option>
            <option value="html">HTML</option>
            <option value="java">Java</option>
            <option value="javascript">JavaScript</option>
            <option value="jsx">JSX</option>
            <option value="markdown">Markdown</option>
            <option value="php">PHP</option>
            <option value="python">Python</option>
            <option value="sql">SQL</option>
            <option value="tsx">TSX</option>
            <option value="typescript">TypeScript</option>
        </select>
    )
}

const mergeMaps = <K, V>(...maps: Map<K, V>[]) => {
    const map = new Map<K, V>()

    for (const m of maps) {
        for (const item of m) {
            map.set(...item)
        }
    }

    return map
}


// Prismjs theme stored as a string instead of emotion css function.
// It is useful for copy/pasting different themes. Also lets keeping simpler Leaf implementation
// In the real project better to use just css file
export const prismThemeCss = `
/**
 * prism.js default theme for JavaScript, CSS and HTML
 * Based on dabblet (http://dabblet.com)
 * @author Lea Verou
 */

code[class*="language-"],
pre[class*="language-"] {
    color: black;
    background: none;
    text-shadow: 0 1px white;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    font-size: 1em;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;

    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;

    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
}

pre[class*="language-"]::-moz-selection, pre[class*="language-"] ::-moz-selection,
code[class*="language-"]::-moz-selection, code[class*="language-"] ::-moz-selection {
    text-shadow: none;
    background: #b3d4fc;
}

pre[class*="language-"]::selection, pre[class*="language-"] ::selection,
code[class*="language-"]::selection, code[class*="language-"] ::selection {
    text-shadow: none;
    background: #b3d4fc;
}

@media print {
    code[class*="language-"],
    pre[class*="language-"] {
        text-shadow: none;
    }
}

/* Code blocks */
pre[class*="language-"] {
    padding: 1em;
    margin: .5em 0;
    overflow: auto;
}

:not(pre) > code[class*="language-"],
pre[class*="language-"] {
    background: #f5f2f0;
}

/* Inline code */
:not(pre) > code[class*="language-"] {
    padding: .1em;
    border-radius: .3em;
    white-space: normal;
}

.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
    color: slategray;
}

.token.punctuation {
    color: #999;
}

.token.namespace {
    opacity: .7;
}

.token.property,
.token.tag,
.token.boolean,
.token.number,
.token.constant,
.token.symbol,
.token.deleted {
    color: #905;
}

.token.selector,
.token.attr-name,
.token.string,
.token.char,
.token.builtin,
.token.inserted {
    color: #690;
}

.token.operator,
.token.entity,
.token.url,
.language-css .token.string,
.style .token.string {
    color: #9a6e3a;
    // /* This background color was intended by the author of this theme. */
    // background: hsla(0, 0%, 100%, .5);
}

.token.atrule,
.token.attr-value,
.token.keyword {
    color: #07a;
}

.token.function,
.token.class-name {
    color: #DD4A68;
}

.token.regex,
.token.important,
.token.variable {
    color: #e90;
}

.token.important,
.token.bold {
    font-weight: bold;
}
.token.italic {
    font-style: italic;
}

.token.entity {
    cursor: help;
}
`

export default useCode