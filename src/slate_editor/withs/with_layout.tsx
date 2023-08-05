import {Editor, Element as SlateElement, Node, Transforms} from "slate";
import React from 'react'
// import {ParagraphElement, TitleElement} from './custom-types'

const withLayout = (editor: any) => {
    const {normalizeNode} = editor

    editor.normalizeNode = ([node, path]: any) => {
        if (path.length === 0) {
            // if (editor.children.length <= 1 && Editor.string(editor, [0, 0]) === '') {
            //     // const title: TitleElement = {
            //     const title: any = {
            //         type: 'h1',
            //         children: [{text: 'Untitled'}],
            //     }
            //     Transforms.insertNodes(editor, title, {
            //         at: path.concat(0),
            //         select: true,
            //     })
            // }
            //
            // if (editor.children.length < 2) {
            //     // const paragraph: ParagraphElement = {
            //     const paragraph: any = {
            //         type: 'p',
            //         children: [{text: ''}],
            //     }
            //     Transforms.insertNodes(editor, paragraph, {at: path.concat(1)})
            // }

            for (const item of Node.children(editor, path)) {
                let [child, childPath]: any = item
                let type: string
                const slateIndex: number = childPath[0]
                const enforceType = (type: any) => {
                    if (SlateElement.isElement(child) && child.type !== type) {
                        const newProperties: any = {type}
                        Transforms.setNodes<SlateElement>(editor, newProperties, {
                            at: childPath,
                        })
                    }
                }
                // console.log({x: child.forced && slateIndex == child.index})
                // if (child.forced && slateIndex == child.index) {
                //     enforceType(child.type)
                // }

                // switch (slateIndex) {
                //     case 0:
                //         type = 'h3'
                //         enforceType(type)
                //         break
                //     case 1:
                //         type = 'comment'
                //         enforceType(type)
                //         break
                //     default:
                //         break
                // }
            }
        }

        return normalizeNode([node, path])
    }

    return editor
}

export default withLayout;