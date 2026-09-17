'use server'

type LoginActionState = {
    email: string
    error: string
}

export async function loginAction(state: LoginActionState, formData: FormData) {
    await new Promise((resolve) => {
        setTimeout(resolve, 2000)
    })
    if (!(formData instanceof FormData)) {
        return {
            email: '',
            error: 'Dados inválidos',
        }
    }

    const email = formData.get('email')?.toString() || ''
    const password = formData.get('password')?.toString() || ''

    const isEmailValid = email === process.env.LOGIN_EMAIL
    const isPasswordValid = password === process.env.LOGIN_PASSWORD

    if (!isEmailValid || !isPasswordValid) {
        return {
            email: formData.get('email')?.toString() || '',
            error: 'Invalid email or password.',
        }
    }

    return {
        email: '',
        error: '',
    }
}
