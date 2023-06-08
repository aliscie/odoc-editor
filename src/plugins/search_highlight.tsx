import React, {useCallback} from 'react'
import {Text} from 'slate'

const SearchHighlightingExample = (search: string | undefined) => {
    const decorate = useCallback(
        // @ts-ignore
        ([node, path]) => {
            const ranges: any[] = []

            if (search && Text.isText(node)) {
                const {text} = node
                const parts = text.split(search)
                let offset = 0

                parts.forEach((part, i) => {
                    if (i !== 0) {
                        ranges.push({
                            anchor: {path, offset: offset - search.length},
                            focus: {path, offset},
                            highlight: true,
                        })
                    }

                    offset = offset + part.length + search.length
                })
            }

            return ranges
        },
        [search]
    )

    return {decorate}
}

// @ts-ignore


export default SearchHighlightingExample