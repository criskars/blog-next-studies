import { AdminToast } from '@/app/components/admin/AdminToast/AdminToast'
import { LoginForm } from '@/app/components/admin/LoginForm/Loginform'
import Container from '@/app/components/shared/Container/Container'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Login',
    description: 'Login page',
}
export default async function AdminLogin() {
    return (
        <Container>
            <AdminToast>
                <LoginForm />
            </AdminToast>
        </Container>
    )
}
