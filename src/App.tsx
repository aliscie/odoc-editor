import React, {useState} from 'react';
import './App.css';
import Editor from "./slate_editor/main";

const initialValue: any[] = [
    {
        type: 'p',
        children: [
            {
                text:
                    'This example shows how you can make a hovering menu appear above your content, which you can use to make text ',
            },
            {text: 'bold', bold: true},
            {text: ', '},
            {text: 'italic', italic: true},
            {text: ', or anything else you might want to do!'},
        ],
    },
    {
        type: 'p',
        children: [
            {text: 'Try it out yourself! Just '},
            {text: 'select any piece of text and the menu will appear', bold: true},
            {text: '.'},
        ],
    },
    {
        type: 'h1',
        // text: "titel is here",
        children: [
            {text: 'titel is here'},
        ],
    },
    {
        type: 'comment',
        children: [
            {text: 'this is from x'},
        ],
    },
    {
        type: 'comment',
        children: [
            {text: ''},
        ],
    },
    {
        type: 'ol',
        children: [
            {type: 'li', children: [{text: "t"}]},
            {type: 'li', children: [{text: "t"}]},
        ],
    },
]


const Element = (props: any) => {
    const {attributes, children, element} = props
    let Tag = element.type
    switch (Tag) {
        case 'table':
            return (
                <table>
                    <tbody {...attributes}>{children}</tbody>
                </table>
            )
        case 'table-row':
            return <tr {...attributes}>{children}</tr>
        case 'table-cell':
            return <td {...attributes}>{children}</td>
        case 'h1':
            return <h1 placeholder={"Enter somthing or hit @ for mentions or / for inserting components"}
                       {...attributes}>{children}</h1>
        case 'comment':
            return <div className={"comment"} {...attributes}>{children}</div>
            break
    }
    return null
}

let table = {
    type: 'table',
    children: [
        {
            type: 'table-row',
            children: [
                {
                    type: 'table-cell',
                    children: [{text: ''}],
                },
                {
                    type: 'table-cell',
                    children: [{text: 'Human', bold: true}],
                },
                {
                    type: 'table-cell',
                    children: [{text: 'Dog', bold: true}],
                },
                {
                    type: 'table-cell',
                    children: [{text: 'Cat', bold: true}],
                },
            ],
        },
        {
            type: 'table-row',
            children: [
                {
                    type: 'table-cell',
                    children: [{text: '# of Feet', bold: true}],
                },
                {
                    type: 'table-cell',
                    children: [{text: '2'}],
                },
                {
                    type: 'table-cell',
                    children: [{text: '4'}],
                },
                {
                    type: 'table-cell',
                    children: [{text: '4'}],
                },
            ],
        },
        {
            type: 'table-row',
            children: [
                {
                    type: 'table-cell',
                    children: [{text: '# of Lives', bold: true}],
                },
                {
                    type: 'table-cell',
                    children: [{text: '1'}],
                },
                {
                    type: 'table-cell',
                    children: [{text: '1'}],
                },
                {
                    type: 'table-cell',
                    children: [{text: '9'}],
                },
            ],
        },
    ],
}

function
App() {
    const [search, setSearch] = useState<string | undefined>()

    return (
        <div className="App">
            <header className="App-header">
                <h1> Editor is here.</h1>
                <input onChange={e => {
                    setSearch(e.target.value)

                }}/>
                <Editor
                    onInsertComponent={(e: any, c: any) => {
                        if (c.type == "ol") {
                            // console.log({x: c.children[0].children[0]})
                            // Transforms.move(e, {at: [0, 0], distance: 0})
                        }

                    }}
                    componentsOptions={[
                        {...table},
                        {type: 'comment'},
                        {type: "quote"},
                        {
                            type: "ol",
                            children: [{type: 'li', children: [{text: ""}]}]
                        },
                    ]}
                    mentionOptions={["Ali", "James", "Aman"]}
                    renderElement={Element}
                    searchOptions={"gi"} search={search} data={initialValue}/>
            </header>
        </div>
    );
}

export default App;
