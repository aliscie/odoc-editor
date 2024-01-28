// Autocomplete.tsx
import React, {ReactNode, useEffect, useRef, useState} from "react";
import {Editor, Range, Transforms} from "slate";
import {ReactEditor, useSlateStatic} from "slate-react";
import "./styles.css"
import {Portal} from "../../components/editor_components";

interface AutocompleteProps {
    editor?: any;
    children?: ReactNode;
    attributes?: any; // Replace with appropriate type for your use case
    words?: string[];
}


const Autocomplete: React.FC<AutocompleteProps> = (props) => {
    const editor: any = useSlateStatic()
    let {selection} = editor;
    let words = props.words || [];
    words.sort();

    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [target, setTarget] = useState<any>();
    // const [word, setWord] = useState<string>("");
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<number>(-1);
    const ref: any = useRef<HTMLDivElement | null>()

    useEffect(() => {
        // if (target && chars.length > 0) {
        const el = ref.current
        if (selection && el) {

            const [start] = Range.edges(selection)
            const wordBefore = Editor.before(editor, start, {unit: 'word'})
            const before = wordBefore && Editor.before(editor, wordBefore)
            let target: any = before && Editor.range(editor, before, start)
            setTarget(target);
            const domRange: any = ReactEditor.toDOMRange(editor, target)
            const rect = domRange.getBoundingClientRect()
            el.style.top = `${rect.top + window.pageYOffset + 24}px`
            el.style.left = `${rect.left + window.pageXOffset}px`
        }
        // }
    }, [selection])

    // const enterKey = 13;

    const clearSuggestion = () => {
        setSuggestions([]);
        setSelectedSuggestionIndex(-1);
    };

    const getSuggestions = (currentWord: string): string[] => {
        // const regex = new RegExp("^" + currentWord, "i");
        // return words.filter((word) => regex.test(word));
        return words.filter((word) =>  word.toLowerCase().includes(currentWord.toLowerCase()));
    };


    const handleSuggestionClick = (index: number) => {
        if (selection) {
            // Transforms.delete(editor, {
            //     at: {
            //         anchor: {...selection.anchor, offset: selection.anchor.offset - word.length},
            //         focus: {...selection.focus},
            //     },
            // })
            // setWord("");
            Transforms.select(editor, target)
            Transforms.insertText(editor, suggestions[index]);
            // Clear the current word
        }
        clearSuggestion();
    };


    useEffect(() => {
        if (selection && Range.isCollapsed(selection)) {
            const [start] = Range.edges(selection);
            const wordBefore = Editor.before(editor, start, {unit: 'word'});

            const before = wordBefore && Editor.before(editor, wordBefore);
            const beforeRange = before && Editor.range(editor, before, start);
            let beforeText: any = beforeRange && Editor.string(editor, beforeRange);
            if (beforeText === " ") {
                return;
            }

            if (beforeText) {
                beforeText = beforeText.replace(" ", "");
                const suggestions = getSuggestions(beforeText);
                let is_not_exact = suggestions.length == 1 && suggestions[0] == beforeText;

                if (is_not_exact) {
                    clearSuggestion();
                } else if ((suggestions.length < words.length)) {
                    // setWord(beforeText);
                    setSuggestions(suggestions);
                }
            }
        }
    }, [selection, editor]);

    return (
        <>
            {suggestions.length > 0 &&
                <div
                    style={{
                        top: '-9999px',
                        left: '-9999px',
                        position: 'fixed',
                        zIndex: 1,
                        padding: '3px',
                        borderRadius: '4px',
                        boxShadow: '0 1px 5px rgba(0,0,0,.2)',
                    }}
                    contentEditable={"false"} className="suggestions"
                    ref={ref}

                    // style={dropdownStyle}
                >
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className={`suggestion ${
                                index === selectedSuggestionIndex ? "selected" : ""
                            }`}
                            onMouseDown={(e) => {
                                e.preventDefault();
                                handleSuggestionClick(index)
                            }}
                        >
                            {suggestion}
                        </div>
                    ))}
                </div>
            }
        </>
    );
};

export default Autocomplete;
