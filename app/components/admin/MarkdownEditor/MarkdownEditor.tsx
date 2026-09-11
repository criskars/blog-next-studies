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
    type MDXEditorMethods,
} from '@mdxeditor/editor'
import { languages } from '@codemirror/language-data'
import { useEffect, useRef } from 'react'

type SafeMarkdownProps = {
    rawMdxString: string
    onValueChange?: (value: string) => void
}

export function SafeMarkdownEditor({
    rawMdxString,
    onValueChange,
}: SafeMarkdownProps) {
    const editorRef = useRef<MDXEditorMethods>(null)

    useEffect(() => {
        editorRef.current?.setMarkdown(rawMdxString)
    }, [rawMdxString])
    return (
        <MDXEditor
            onChange={onValueChange}
            className="mdxeditor-theme"
            contentEditableClassName="mdx-content"
            markdown={rawMdxString}
            placeholder="Write your content here..."
            autoFocus={false}
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
