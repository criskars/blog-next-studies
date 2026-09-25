'use server'

import { redirect } from 'next/navigation'
import { deleteLoginCookie } from '../lib/login/manage-login'

export async function logoutAction() {
    await deleteLoginCookie()
    redirect('/')
}
