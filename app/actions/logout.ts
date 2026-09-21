'use server'

export async function logoutAction() {
    await new Promise((resolve) => {
        setTimeout(resolve, 2000)
    })
}
