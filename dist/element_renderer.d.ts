import React from 'react';
declare class RendererProps {
    tag: any;
    content?: string;
    children?: any;
    attributes?: Record<string, string>;
}
declare function EditorRenderer(props: RendererProps): React.JSX.Element;
export default EditorRenderer;
