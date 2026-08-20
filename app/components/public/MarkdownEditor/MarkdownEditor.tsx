'use client'

import {
    MDXEditor,
    headingsPlugin,
    listsPlugin,
    quotePlugin,
    markdownShortcutPlugin,
    toolbarPlugin,
    UndoRedo,
    linkPlugin,
    tablePlugin,
} from '@mdxeditor/editor'

type SafeMarkdownProps = {
    rawMdxString: string
}

export function SafeMarkdownEditor({ rawMdxString }: SafeMarkdownProps) {
    return (
        <MDXEditor
            markdown={rawMdxString}
            plugins={[
                toolbarPlugin({
                    toolbarContents: () => <UndoRedo />,
                }),
                headingsPlugin(),
                listsPlugin(),
                quotePlugin(),
                markdownShortcutPlugin(),

                linkPlugin(),
                tablePlugin(),
            ]}
             contentEditableClassName="prose prose-invert min-h-[200px] p-4 border border-white"
        />
    )
}
