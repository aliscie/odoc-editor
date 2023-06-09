declare class RendererProps {
    tag: any;
    content?: string;
    children?: any;
    attributes?: Record<string, string>;
}
declare function EditorRenderer(props: RendererProps): import("react/jsx-runtime").JSX.Element;
export default EditorRenderer;
