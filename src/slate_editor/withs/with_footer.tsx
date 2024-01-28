import React from 'react'
import randomString from "../../utiles/rand_string";

const withFooter = (editor: any) => {
    // const {apply, insertNode, insertNodes} = editor;
    //
    // editor.insertNode = (node: any) => {
    //     insertNode(node);
    // };
    //
    // editor.apply = (operation: any) => {
    //     let value = editor.children;
    //     const isEmptyParagraphAlreadyAdded = editor.children.some((node: any) => {
    //         return node.text === '';
    //     });
    //     //
    //     if (!isEmptyParagraphAlreadyAdded) {
    //         const newParagraph: any = {
    //             id: randomString(),
    //             test: 's',
    //             type: 'p',
    //             children: [{text: ''}],
    //         };
    //
    //
    //         let is_last_empty = value[value.length - 1]['children'].find((e: any) => e.text === '');
    //         let click_position = editor.selection && editor.selection.anchor.path[0];
    //         let is_click_bellow = (value.length - 1) === click_position;
    //
    //         let new_operation = {
    //             type: 'insert_node',
    //             path: [value.length],
    //             node: newParagraph,
    //             properties: {
    //                 id: newParagraph.id
    //             }
    //         }
    //         !is_last_empty && is_click_bellow && apply(new_operation);
    //         // focused on the new element
    //         editor.selection = {
    //             "anchor": {
    //                 "path": [
    //                     value.length - 1,
    //                     0
    //                 ],
    //                 "offset": 0
    //             },
    //             "focus": {
    //                 "path": [
    //                     value.length - 1,
    //                     0
    //                 ],
    //                 "offset": 0
    //
    //             }
    //         }
    //
    //     }
    //
    //     return apply(operation);
    // };

    return editor;

}

export default withFooter;