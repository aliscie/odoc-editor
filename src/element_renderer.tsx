import React, {useRef} from 'react';
import {Quote} from "./components/quote";

class RendererProps {
    tag: any;
    content?: string;
    children?: any;
    attributes?: Record<string, string>;


}


function EditorRenderer(props: RendererProps) {
    const {tag, content, attributes = {}, children} = props;
    let Tag = tag || "span";
    switch (tag) {
        case "quote":
            return <Quote {...props}>{children}</Quote>;
        // case "table":
        //     return <table/>;
        // case "image":
        //     return <img/>;
        // case "video":
        //     return <video/>;
        // case "audio":
        //     return <audio/>;
        // case "link":
        //     return <a/>;
        // case "code":
        //     return <code/>;
        // case "math":
        //     return <math/>;
        // case "list":
        //     return <ul/>;
        // case "code":
        //     return <code/>;
        default:
            return (<Tag
                style={{margin: 0}}
                {...props}
                placeholder={"enter somthing..."}
                {...attributes}>{children}</Tag>)
    }
}

export default EditorRenderer;