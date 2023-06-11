import React, {useState} from 'react';
import './App.css';
import Editor from "./slate_editor/main";

const initialValue: any[] = [
    {
        type: 'paragraph',
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
        type: 'paragraph',
        children: [
            {text: 'Try it out yourself! Just '},
            {text: 'select any piece of text and the menu will appear', bold: true},
            {text: '.'},
        ],
    },
]

function App() {
    const [search, setSearch] = useState<string | undefined>()

    return (
        <div className="App">
            <header className="App-header">
                <h1> Editor is here.</h1>
                <input onChange={e => setSearch(e.target.value)}/>
                <Editor searchOptions={"gi"} search={search} data={initialValue}/>
            </header>
        </div>
    );
}

export default App;
