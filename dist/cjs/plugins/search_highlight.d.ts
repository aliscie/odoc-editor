declare const SearchHighlightingExample: (searchOptions: string, search: string | undefined) => {
    decorate: ([node, path]: [any, any]) => any[];
};
export default SearchHighlightingExample;
