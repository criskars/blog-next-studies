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
    BlockTypeSelect,
    CreateLink,
    linkDialogPlugin,
    InsertImage,
    imagePlugin,
    thematicBreakPlugin,
    InsertThematicBreak,
    codeBlockPlugin,
    codeMirrorPlugin,
    ConditionalContents,
    ChangeCodeMirrorLanguage,
    InsertCodeBlock,
} from '@mdxeditor/editor'
import { languages } from '@codemirror/language-data'

type SafeMarkdownProps = {
    rawMdxString: string
}

export function SafeMarkdownEditor({ rawMdxString }: SafeMarkdownProps) {
    return (
        <MDXEditor
            className="mdxeditor-theme"
            markdown={rawMdxString}
            plugins={[
                toolbarPlugin({
                    toolbarContents: () => (
                        <>
                            <UndoRedo />
                            <BlockTypeSelect />
                            <BoldItalicUnderlineToggles />
                            <StrikeThroughSupSubToggles />
                            <ListsToggle />
                            <InsertTable />
                            <InsertThematicBreak />
                            <CreateLink />
                            <InsertImage />
                            <ConditionalContents
                                options={[
                                    {
                                        when: (editor) =>
                                            editor?.editorType === 'codeblock',
                                        contents: () => (
                                            <ChangeCodeMirrorLanguage />
                                        ),
                                    },
                                    {
                                        fallback: () => (
                                            <>
                                                <InsertCodeBlock />
                                            </>
                                        ),
                                    },
                                ]}
                            />
                        </>
                    ),
                }),
                headingsPlugin(),
                listsPlugin(),
                quotePlugin(),
                markdownShortcutPlugin(),
                linkPlugin(),
                linkDialogPlugin(),
                tablePlugin(),
                imagePlugin(),
                thematicBreakPlugin(),
                codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
                codeMirrorPlugin({
                    codeBlockLanguages: languages,
                }),
            ]}
        />
    )
}
