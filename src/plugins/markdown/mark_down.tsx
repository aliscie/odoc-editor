import React, {useCallback} from 'react'
import {Editor, Element as SlateElement, Node as SlateNode, Point, Range, Transforms,} from 'slate'
import {ReactEditor} from 'slate-react'

const SHORTCUTS: any = {
    // '1.': 'numbered-list',
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

export const withMarkDownShortcuts = (editor: any) => {
    const {deleteBackward, insertText} = editor

    editor.insertText = (text: any) => {
        const {selection} = editor

        if (text.endsWith(' ') && selection && Range.isCollapsed(selection)) {
            const {anchor} = selection
            const block = Editor.above(editor, {
                match: n => SlateElement.isElement(n) && Editor.isBlock(editor, n),
            })
            const path = block ? block[1] : []
            const start = Editor.start(editor, path)
            const range = {anchor, focus: start}
            const beforeText: any = Editor.string(editor, range) + text.slice(0, -1)
            const type: any = SHORTCUTS[beforeText]

            if (type) {
                Transforms.select(editor, range)

                if (!Range.isCollapsed(range)) {
                    Transforms.delete(editor)
                }
                // const newProperties: Partial<SlateElement> = {
                const newProperties: any = {
                    type,
                }
                Transforms.setNodes<SlateElement>(editor, newProperties, {
                    match: n => SlateElement.isElement(n) && Editor.isBlock(editor, n),
                })

                if (type === 'list-item') {
                    // const list: BulletedListElement = {
                    const list: any = {
                        type: 'bulleted-list',
                        children: [],
                    }
                    Transforms.wrapNodes(editor, list, {
                        match: (n: any) =>
                            !Editor.isEditor(n) &&
                            SlateElement.isElement(n) &&
                            n.type === 'list-item',
                    })
                }
                // if (type === 'numbered-list') {
                //     // const list: BulletedListElement = {
                //     const list: any = {
                //         type: 'numbered-list',
                //         children: [],
                //     }
                //     Transforms.wrapNodes(editor, list, {
                //         match: (n: any) =>
                //             !Editor.isEditor(n) &&
                //             SlateElement.isElement(n) &&
                //             n.type === 'list-item',
                //     })
                // }

                return
            }
        }

        insertText(text)
    }

    editor.deleteBackward = (...args: any) => {
        const {selection} = editor

        if (selection && Range.isCollapsed(selection)) {
            const match = Editor.above(editor, {
                match: n => SlateElement.isElement(n) && Editor.isBlock(editor, n),
            })

            if (match) {
                const [block, path]: any = match
                const start = Editor.start(editor, path)

                if (
                    !Editor.isEditor(block) &&
                    SlateElement.isElement(block) &&
                    block.type !== 'paragraph' &&
                    Point.equals(selection.anchor, start)
                ) {
                    // const newProperties: Partial<SlateElement> = {
                    const newProperties: any = {
                        type: 'paragraph',
                    }
                    Transforms.setNodes(editor, newProperties)

                    if (block.type === 'list-item') {
                        Transforms.unwrapNodes(editor, {
                            match: (n: any) =>
                                !Editor.isEditor(n) &&
                                SlateElement.isElement(n) &&
                                n.type === 'bulleted-list',
                            split: true,
                        })
                    }


                    return
                }
            }

            deleteBackward(...args)
        }
    }

    return editor
}
export const MarkDownOptions = [
    "block-quote",
    "bulleted-list",
    // "numbered-list",
    "heading-one", "heading-two",
    "heading-three", "heading-four", "heading-five", "heading-six", "list-item"]
export const MarkDownElement = ({attributes, children, element}: any) => {
    switch (element.type) {
        case 'block-quote':
            return <blockquote {...attributes}>{children}</blockquote>
        case 'bulleted-list':
            return <ul {...attributes}>{children}</ul>
        // case 'numbered-list':
        //     return <ol {...attributes}>{children}</ol>
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