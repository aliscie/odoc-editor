import React from 'react';
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
    return (
        <div className="App">
            <header className="App-header">
                <Editor data={initialValue}/>
            </header>
        </div>
    );
}

export default App;
