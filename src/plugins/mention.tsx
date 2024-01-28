import React, {useCallback, useEffect, useRef, useState} from 'react'
import {Editor, Range, Transforms} from 'slate'
import {ReactEditor, useFocused, useSelected,} from 'slate-react'
import {Portal} from "../components/editor_components";
import {stringSimilarity} from 'string-similarity-js'; // Import string similarity function

// import {Portal} from '../components'
// import {MentionElement} from './custom-types'

const useMention = (options: any = CHARACTERS, trigger: any, editor: any, insert: any) => {
    const ref: any = useRef<HTMLDivElement | null>()
    const [target, setTarget]: any = useState<Range | undefined>()
    const [index, setIndex] = useState(0)
    const [search, setSearch] = useState('')
    // const mentionRenderElement = useCallback((props: any) => <Element {...props} />, [])
    // const mentionRenderLeaf = useCallback((props: any) => <Leaf {...props} />, [])
    // const editor = useMemo(
    //     () => withMentions(withReact(withHistory(createEditor()))),
    //     []
    // )

    // const chars = options.filter((c: any) => {
    //         if (typeof c !== 'string') {
    //             c = c.type;
    //         }
    //         return c.toLowerCase().startsWith(search.toLowerCase())
    //     }
    // ).slice(0, 10)

    const chars = options.map((c: any) => {
        let type = ""
        if (typeof c !== 'string') {
            type = c.type;
        }
        const similarity = stringSimilarity(search.toLowerCase(), type.toLowerCase());
        return {value: c, similarity};
    })
        .sort((a: any, b: any) => b.similarity - a.similarity)
        .slice(0, 10)
        .map((item: any) => item.value);

    const mentionOnKeyDown = useCallback(
        (event: any) => {
            if (target && chars.length > 0) {
                switch (event.key) {
                    case 'ArrowDown':
                        event.preventDefault()
                        const prevIndex = index >= chars.length - 1 ? 0 : index + 1
                        setIndex(prevIndex)
                        break
                    case 'ArrowUp':
                        event.preventDefault()
                        const nextIndex = index <= 0 ? chars.length - 1 : index - 1
                        setIndex(nextIndex)
                        break
                    case 'Tab':
                    case 'Enter':
                        event.preventDefault()
                        Transforms.select(editor, target)
                        insert(editor, chars[index])
                        setTarget(null)
                        break
                    case 'Escape':
                        event.preventDefault()
                        setTarget(null)
                        break
                }
            }
        },
        [chars, editor, index, target]
    )

    useEffect(() => {
        if (target && chars.length > 0) {
            const el = ref.current
            const domRange: any = ReactEditor.toDOMRange(editor, target)
            const rect = domRange.getBoundingClientRect()
            el.style.top = `${rect.top + window.pageYOffset + 24}px`
            el.style.left = `${rect.left + window.pageXOffset}px`
        }
    }, [chars.length, editor, index, search, target])

    let MentionPortal = target && chars.length > 0 && (
        <Portal>
            <div
                ref={ref}
                style={{
                    top: '-9999px',
                    left: '-9999px',
                    position: 'absolute',
                    zIndex: 1,
                    padding: '3px',
                    borderRadius: '4px',
                    boxShadow: '0 1px 5px rgba(0,0,0,.2)',
                }}
                data-cy="mentions-portal"
            >
                {chars.map((char: any, i: any) => (
                    <div
                        key={char.type || char}
                        onClick={() => {
                            Transforms.select(editor, target)
                            console.log({char})
                            insert(editor, char.type || char)
                            setTarget(null)
                        }}
                        style={{
                            padding: '1px 3px',
                            borderRadius: '3px',
                            background: i === index ? 'rgb(57 91 135)' : 'transparent',
                        }}
                    >
                        {char.type || char}
                    </div>
                ))}
            </div>
        </Portal>
    )
    let mentionOnChange = () => {
        const {selection} = editor

        if (selection && Range.isCollapsed(selection)) {
            const [start] = Range.edges(selection)
            const wordBefore = Editor.before(editor, start, {unit: 'word'})
            const before = wordBefore && Editor.before(editor, wordBefore)
            const beforeRange = before && Editor.range(editor, before, start)
            const beforeText = beforeRange && Editor.string(editor, beforeRange)
            const beforeMatch = beforeText && beforeText.match(trigger)
            const after = Editor.after(editor, start)
            const afterRange = Editor.range(editor, start, after)
            const afterText = Editor.string(editor, afterRange)
            const afterMatch = afterText.match(/^(\s|$)/)

            if (beforeMatch && afterMatch) {
                setTarget(beforeRange)
                setSearch(beforeMatch[1])
                setIndex(0)
                return
            }
        }

        setTarget(null)
    }
    return [
        // editor,
        MentionPortal,
        mentionOnChange,
        // mentionRenderElement,
        // mentionRenderLeaf,
        mentionOnKeyDown]


}

export const withMentions = (editor: any) => {
    const {isInline, isVoid, markableVoid} = editor

    editor.isInline = (element: any) => {
        return element.type === 'mention' ? true : isInline(element)
    }

    editor.isVoid = (element: any) => {
        return element.type === 'mention' ? true : isVoid(element)
    }

    editor.markableVoid = (element: any) => {
        return element.type === 'mention' || markableVoid(element)
    }

    return editor
}

export const insertMention = (editor: any, character: any) => {
    const mention: any = {
        type: 'mention',
        character,
        children: [{text: ''}],
    }
    Transforms.insertNodes(editor, mention)
    Transforms.move(editor)
}


// Borrow Leaf renderer from the Rich Text example.
// In a real project you would get this via `withRichText(editor)` or similar.
const Leaf = ({attributes, children, leaf}: any) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>
    }

    if (leaf.code) {
        children = <code>{children}</code>
    }

    if (leaf.italic) {
        children = <em>{children}</em>
    }

    if (leaf.underline) {
        children = <u>{children}</u>
    }

    return <span {...attributes}>{children}</span>
}


export const Mention = ({attributes, children, element}: any) => {
    const selected = useSelected()
    const focused = useFocused()
    const style: React.CSSProperties = {
        padding: '3px 3px 2px',
        margin: '0 1px',
        verticalAlign: 'baseline',
        display: 'inline-block',
        borderRadius: '4px',
        backgroundColor: '#da0909',
        fontSize: '0.9em',
        boxShadow: selected && focused ? '0 0 0 2px #B4D5FF' : 'none',
    }
    // See if our empty text child has any styling marks applied and apply those
    if (element.children[0].bold) {
        style.fontWeight = 'bold'
    }
    if (element.children[0].italic) {
        style.fontStyle = 'italic'
    }
    return (
        <span
            {...attributes}
            contentEditable={false}
            data-cy={`mention-${element.character.replace(' ', '-')}`}
            style={style}
        >
      @{element.character}
            {children}
    </span>
    )
}


export const CHARACTERS = [
    'Zam Wesell',
    'Zev Senesca',
    'Ziro the Hutt',
    'Zuckuss',
]

export default useMention