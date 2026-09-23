'use client'

import { loginAction } from '@/app/actions/login'
import { useActionState, useEffect, useRef, useState } from 'react'
import { useAdminToast } from '@/app/components/admin/AdminToast/AdminToast'
import { Form } from 'radix-ui'
import { unstable_PasswordToggleField as PasswordToggleField } from 'radix-ui'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'

export function LoginForm() {

    const [password, setPassword] = useState('')
    const { showToast } = useAdminToast()
    const showToastRef = useRef(showToast)
    const initialState = {
        email: '',
        error: '',
    }
    const [state, submitLogin, isPending] = useActionState(
        loginAction,
        initialState
    )

    useEffect(() => {
        showToastRef.current = showToast
    }, [showToast])

    useEffect(() => {
        if (state.error !== '') {
            showToastRef.current(state.error)
        }
    }, [state])

    const inputStyles =
        'selection:bg-black box-border inline-flex h-8 appearance-none items-center justify-center bg-black p-2 text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none selection:bg-white selection:text-black focus:shadow-[0_0_0_2px] disabled:cursor-not-allowed disabled:opacity-50 disabled:selection:bg-black disabled:selection:text-white'

    const labelStyles =
        'text-[15px] leading-8 font-medium text-white group-focus-within:font-semibold'

    return (
        <Form.Root
            className="flex w-full max-w-sm flex-col items-center justify-center gap-4 bg-black px-4"
            action={submitLogin}
        >
            <Form.Field className="group grid w-full" name="email">
                <div className="flex items-baseline justify-between">
                    <Form.Label className={labelStyles}>Email</Form.Label>
                    <Form.Message
                        className="text-[13px] text-white opacity-80"
                        match="valueMissing"
                    >
                        Please enter your email
                    </Form.Message>
                </div>
                <Form.Control asChild>
                    <input
                        className={inputStyles}
                        type="email"
                        required
                        placeholder="Enter your email"
                        defaultValue={state.email}
                        key={state.email}
                    />
                </Form.Control>
            </Form.Field>
            <Form.Field className="group grid w-full" name="password">
                <div className="flex items-baseline justify-between">
                    <Form.Label className={labelStyles}>Password</Form.Label>
                    <Form.Message
                        className="text-[13px] text-white opacity-80"
                        match="valueMissing"
                    >
                        Please enter your password
                    </Form.Message>
                </div>
                <Form.Control asChild>
                    <input
                        type="hidden"
                        name="password"
                        value={password}
                        readOnly
                    />
                </Form.Control>
                <PasswordToggleField.Root>
                    <div className="relative w-full gap-2 rounded-sm bg-black text-white shadow-[0_0_0_1px_var(--black-a6)] focus-within:shadow-[0_0_0_2px_black] hover:shadow-[0_0_0_1px_black]">
                        <PasswordToggleField.Input
                            className={`${inputStyles} w-full pr-8`}
                            placeholder="Enter your password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <PasswordToggleField.Toggle className="all-[unset] focus-visible:outline-accent-9 absolute top-1/2 right-2 box-border flex aspect-square h-4.5 -translate-y-1/2 items-center justify-center rounded-[0.5px] text-[15px] leading-none text-inherit focus-visible:outline-2 focus-visible:outline-offset-2">
                            <PasswordToggleField.Icon
                                visible={<EyeOpenIcon />}
                                hidden={<EyeClosedIcon />}
                            />
                        </PasswordToggleField.Toggle>
                    </div>
                </PasswordToggleField.Root>
            </Form.Field>
            <Form.Submit asChild>
                <button
                    className="mt-2 box-border inline-flex h-8 w-full items-center justify-center bg-white leading-none font-medium text-black hover:border hover:border-white hover:bg-black hover:text-white focus:bg-black focus:text-white focus:shadow-[0_0_0_2px] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-none disabled:hover:bg-white disabled:hover:text-black"
                    disabled={isPending}
                >
                    Sign in
                </button>
            </Form.Submit>
        </Form.Root>
    )
}
