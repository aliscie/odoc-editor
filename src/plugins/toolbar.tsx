import {BaseEditor, Editor, Range, Text, Transforms} from "slate";
import React, {useEffect, useRef} from "react";
import {useFocused, useSlate} from "slate-react";
import {Button, Icon, Menu, Portal} from "../components/editor_components";
import {css} from "@emotion/css";

export const toggleFormat = (editor: BaseEditor, format: string) => {
    const isActive = isFormatActive(editor, format)
    Transforms.setNodes(
        editor,
        {[format]: isActive ? null : true},
        {match: Text.isText, split: true}
    )
}

const isFormatActive = (editor: BaseEditor, format: string) => {
    // @ts-ignore

    const [match] = Editor.nodes(editor, {
        // @ts-ignore
        match: n => n[format] === true,
        mode: 'all',
    })
    return !!match
}
export const HoveringToolbar = () => {
    const ref = useRef<HTMLDivElement | null>()
    const editor = useSlate()
    const inFocus = useFocused()

    useEffect(() => {
        const el = ref.current
        const {selection} = editor

        if (!el) {
            return
        }

        if (
            !selection ||
            !inFocus ||
            Range.isCollapsed(selection) ||
            Editor.string(editor, selection) === ''
        ) {
            el.removeAttribute('style')
            return
        }

        const domSelection = window.getSelection()
        // @ts-ignore
        const domRange = domSelection.getRangeAt(0)
        const rect = domRange.getBoundingClientRect()
        el.style.opacity = '1'
        el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`
        el.style.left = `${rect.left +
        window.pageXOffset -
        el.offsetWidth / 2 +
        rect.width / 2}px`
    })

    return (
        <Portal>
            <Menu
                ref={ref}
                className={css`
                  padding: 8px 7px 6px;
                  position: absolute;
                  z-index: 1;
                  top: -10000px;
                  left: -10000px;
                  margin-top: -6px;
                  opacity: 0;
                  background-color: #222;
                  border-radius: 4px;
                  transition: opacity 0.75s;
                `}
                onMouseDown={(e: { preventDefault: () => void }) => {
                    // prevent toolbar from taking focus away from editor
                    e.preventDefault()
                }}
            >
                <FormatButton format="bold" icon="B"/>
                <FormatButton format="italic" icon="I"/>
                <FormatButton format="underlined" icon="U"/>
            </Menu>
        </Portal>
    )
}

// @ts-ignore
const FormatButton = ({format, icon}) => {
    const editor = useSlate()
    return (
        <Button
            reversed
            active={isFormatActive(editor, format)}
            onClick={() => toggleFormat(editor, format)}
        >
            <Icon>{icon}</Icon>
        </Button>
    )
}