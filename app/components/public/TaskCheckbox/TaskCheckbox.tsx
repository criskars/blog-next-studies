'use client'

export default function TaskCheckbox(
    props: React.InputHTMLAttributes<HTMLInputElement>
) {
    const { checked, ...restProps } = props

    return (
        <input
            {...restProps}
            type="checkbox"
            defaultChecked={Boolean(checked)}
            disabled={false}
            className=""
            onChange={() => {
                return
            }}
        />
    )
}
