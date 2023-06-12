import Editor from './slate_editor/main';
import {runEditor} from "./run_editor";

export default Editor;

if (process.env.NODE_ENV === 'development') {
    runEditor()
}