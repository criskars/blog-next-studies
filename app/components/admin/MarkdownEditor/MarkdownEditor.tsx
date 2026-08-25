'use client'

import {
    MDXEditor,
    headingsPlugin,
    listsPlugin,
    quotePlugin,
    markdownShortcutPlugin,
    toolbarPlugin,
    UndoRedo,
    BoldItalicUnderlineToggles,
    ListsToggle,
    InsertTable,
    StrikeThroughSupSubToggles,
    linkPlugin,
    tablePlugin,
} from '@mdxeditor/editor'

type SafeMarkdownProps = {
    rawMdxString: string
}

export function SafeMarkdownEditor({ rawMdxString }: SafeMarkdownProps) {
    return (
        <MDXEditor
            className='mdxeditor-theme'
            markdown={rawMdxString}
            plugins={[
                toolbarPlugin({
                    toolbarContents: () => (
                        <>
                            <UndoRedo />
                            <BoldItalicUnderlineToggles />
                            <StrikeThroughSupSubToggles />
                            <ListsToggle />
                            <InsertTable />
                        </>
                    ),
                }),
                headingsPlugin(),
                listsPlugin(),
                quotePlugin(),
                markdownShortcutPlugin(),

                linkPlugin(),
                tablePlugin(),
            ]}
        />
    )
}
