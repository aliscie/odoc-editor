import {Editor, Element as SlateElement, Point, Range, Transforms} from "slate";
import {SHORTCUTS} from "./mark_down";

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
                if (['1.', '2.'].includes(beforeText)) {
                    const list: any = {
                        type: 'numbered-list',
                        children: [],
                    }
                    Transforms.wrapNodes(editor, list, {
                        match: (n: any) =>
                            !Editor.isEditor(n) &&
                            SlateElement.isElement(n) &&
                            n.type === 'list-item',
                    })
                } else if (type === 'list-item') {
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