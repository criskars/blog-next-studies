import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import remarkMdxRemoveExpressions from 'remark-mdx-remove-expressions'
import TaskCheckbox from '../TaskCheckbox/TaskCheckbox'

type SafeMarkdownProps = {
    rawMdxString: string
}

export default async function SafeMarkdown({
    rawMdxString,
}: SafeMarkdownProps) {
    const options: MDXRemoteProps['options'] = {
        mdxOptions: {
            remarkPlugins: [
                remarkGfm,
                [
                    remarkMdxRemoveExpressions,
                    { onlyDangerousExpressions: true },
                ],
            ],
            rehypePlugins: [
                [
                    rehypeSanitize,
                    {
                        ...defaultSchema,
                        tagNames: [...(defaultSchema.tagNames || [])],
                    },
                ],
            ],
        },
    }

    return (
        <div className="[&_li.task-list-item]:list-none [&_li.task-list-item]:ml-0 [&_li.task-list-item]:pl-0 [&_li.task-list-item::marker]:content-['']">
        <MDXRemote
            source={rawMdxString}
            options={options}
            components={{
                input: (props) => {
                    if (props.type === 'checkbox') {
                        return <TaskCheckbox {...props} />
                    }
                    return <input {...props} />
                }
            }}
        />
        </div>
    )
}
