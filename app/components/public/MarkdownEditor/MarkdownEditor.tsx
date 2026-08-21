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
import '@mdxeditor/editor/style.css'

type SafeMarkdownProps = {
    rawMdxString: string
}

export function SafeMarkdownEditor({ rawMdxString }: SafeMarkdownProps) {
    return (
        <MDXEditor
            className='markdown-editor'
            markdown={rawMdxString}
            plugins={[
                toolbarPlugin({
                    toolbarClassName:
                        'markdown-toolbar',
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
            contentEditableClassName="prose prose-invert min-h-[400px] p-4 border border-white"
        />
    )
}
