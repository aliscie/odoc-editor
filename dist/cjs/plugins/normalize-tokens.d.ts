/**
 * Copied from prism-react-renderer repo
 * https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/utils/normalizeTokens.js
 * */
import Prism from 'prismjs';
type PrismToken = Prism.Token;
type Token = {
    types: string[];
    content: string;
    empty?: boolean;
};
export declare const normalizeTokens: (tokens: Array<PrismToken | string>) => Token[][];
export {};
