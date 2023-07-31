import React, {useCallback} from 'react'
import {Editor, Element as SlateElement, Node as SlateNode,} from 'slate'
import {ReactEditor} from 'slate-react'

export const SHORTCUTS: any = {
    '1.': 'list-item',
    '2.': 'list-item',
    '*': 'list-item',
    '-': 'list-item',
    '+': 'list-item',
    '>': 'block-quote',
    '#': 'heading-one',
    '##': 'heading-two',
    '###': 'heading-three',
    '####': 'heading-four',
    '#####': 'heading-five',
    '######': 'heading-six',
}


const useMarkDown = (editor: any) => {

    const markDownHandleDOMBeforeInput = useCallback(
        (e: InputEvent) => {
            queueMicrotask(() => {
                const pendingDiffs = ReactEditor.androidPendingDiffs(editor)

                const scheduleFlush = pendingDiffs?.some(({diff, path}) => {
                    if (!diff.text.endsWith(' ')) {
                        return false
                    }

                    const {text} = SlateNode.leaf(editor, path)
                    const beforeText = text.slice(0, diff.start) + diff.text.slice(0, -1)
                    if (!(beforeText in SHORTCUTS)) {
                        return
                    }

                    const blockEntry = Editor.above(editor, {
                        at: path,
                        match: n => SlateElement.isElement(n) && Editor.isBlock(editor, n),
                    })
                    if (!blockEntry) {
                        return false
                    }

                    const [, blockPath] = blockEntry
                    return Editor.isStart(editor, Editor.start(editor, path), blockPath)
                })

                if (scheduleFlush) {
                    ReactEditor.androidScheduleFlush(editor)
                }
            })
        },
        [editor]
    )
    return {markDownHandleDOMBeforeInput}
    //   return (
    //   <Slate editor={editor} initialValue={initialValue}>
    //     <Editable
    //       onDOMBeforeInput={handleDOMBeforeInput}
    //       renderElement={renderElement}
    //       placeholder="Write some markdown..."
    //       spellCheck
    //       autoFocus
    //     />
    //   </Slate>
    // )
}
export default useMarkDown;

export const MarkDownOptions = [
    "block-quote",
    "bulleted-list",
    "numbered-list",
    "heading-one", "heading-two",
    "heading-three", "heading-four", "heading-five", "heading-six", "list-item"]
export const MarkDownElement = ({attributes, children, element}: any) => {
    switch (element.type) {
        case 'block-quote':
            return <blockquote {...attributes}>{children}</blockquote>
        case 'bulleted-list':
            return <ul {...attributes}>{children}</ul>
        case 'numbered-list':
            return <ol {...attributes}>{children}</ol>
        case 'heading-one':
            return <h1 {...attributes}>{children}</h1>
        case 'heading-two':
            return <h2 {...attributes}>{children}</h2>
        case 'heading-three':
            return <h3 {...attributes}>{children}</h3>
        case 'heading-four':
            return <h4 {...attributes}>{children}</h4>
        case 'heading-five':
            return <h5 {...attributes}>{children}</h5>
        case 'heading-six':
            return <h6 {...attributes}>{children}</h6>
        case 'list-item':
            return <li {...attributes}>{children}</li>
        default:
            return <p {...attributes}>{children}</p>
    }
}