import {Element} from "slate";


export const ParagraphType = 'paragraph'
export const CodeBlockType = 'code-block'
export const CodeLineType = 'code-line'


export const toChildren = (content: string) => [{text: content}]
const toCodeLines = (content: string): Element[] =>
    content
        .split('\n')
        .map(line => ({type: CodeLineType, children: toChildren(line)}))


const codeInitialValue: any[] = [
//     {
//         // forced: true,
//         // index: 1,
//         type: 'comment',
//         children: toChildren(
//             "Here's one containing a single paragraph block with some text in it:"
//         ),
//     },
//     {
//         "type": "code-block",
//         "language": "typescript",
//         "children": [
//
//             {
//                 "type": "code-line",
//                 "children": [{"text": ""}]
//             },
//
//         ]
//     },
//
//     // {
//     //     type: CodeBlockType,
//     //     language: 'jsx',
//     //     children: toCodeLines(`// Add the initial value.
//
// // const initialValue = [
// //   {
// //     type: 'paragraph',
// //     children: [{ text: 'A line of text in a paragraph.' }]
// //   }
// // ]
// //
// // const App = () => {
// //   const [editor] = useState(() => withReact(createEditor()))
// //
// //   return (
// //     <Slate editor={editor} initialValue={initialValue}>
// //       <Editable />
// //     </Slate>
// //   )
// // }`),
// //     },
// //     {
// //         type: ParagraphType,
// //         children: toChildren(
// //             'If you are using TypeScript, you will also need to extend the Editor with ReactEditor and add annotations as per the documentation on TypeScript. The example below also includes the custom types required for the rest of this example.'
// //         ),
// //     },
//     {
//         type: CodeBlockType,
//         language: 'typescript',
//         children: toCodeLines(`
// // TypeScript users only add this code
// import { BaseEditor, Descendant } from 'slate'
// import { ReactEditor } from 'slate-react'
// type CustomElement = { type: 'paragraph'; children: CustomText[] }
// type CustomText = { text: string }
// declare module 'slate' {
//   interface CustomTypes {
//     Editor: BaseEditor & ReactEditor
//     Element: CustomElement
//     Text: CustomText
//   }
// }
// `),
//     },
    {
        type: 'div',
        children: toChildren('There you have it!'),
        id: 'unique_id',
    },

]
export default codeInitialValue