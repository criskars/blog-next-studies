import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { SignJWT, jwtVerify } from 'jose'

const jwtSecretKey = process.env.JWT_SECRET_KEY || 'default-secret-key'
const jwtEncodeKey = new TextEncoder().encode(jwtSecretKey)

const loginExpiration = parseInt(
    process.env.LOGIN_EXPIRATION_SECONDS || '86400',
    10
)
const loginExpirationString = process.env.LOGIN_EXPIRATION_STRING || '1d'
const cookieName = process.env.LOGIN_COOKIE_NAME || 'loginSession'

export async function createLoginCookie(email: string) {
    console.log('Bytes for key:', Buffer.byteLength(jwtSecretKey, 'utf-8'))
    const jwt = await new SignJWT({ email })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setIssuedAt()
        .setExpirationTime(loginExpirationString)
        .sign(jwtEncodeKey)

    const cookieStore = await cookies()
    cookieStore.set(cookieName, jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: loginExpiration,
    })
}

export async function verifyLoginCookie() {
    const cookieStore = await cookies()
    const jwt = cookieStore.get(cookieName)?.value
    if (!jwt) return false

    try {
        const { payload } = await jwtVerify(jwt, jwtEncodeKey)
        if (!payload || typeof payload !== 'object' || !('email' in payload)) {
            return false
        }
        return payload.email === process.env.LOGIN_EMAIL
    } catch (error) {
        console.error('Error verifying login cookie:', error)
        return false
    }
}

export async function checkAuthentication() {
    const isAuthenticated = await verifyLoginCookie()
    if (!isAuthenticated) {
        redirect('/admin/login?error=auth_required')
    }
    return true
}

export async function deleteLoginCookie() {
    const cookieStore = await cookies()
    cookieStore.set(cookieName, '', {
        expires: new Date(0),
    })
    cookieStore.delete(cookieName)
}

export async function hashPassword(password: string) {
    const hash = await bcrypt.hash(password, 10)
    const base64 = Buffer.from(hash).toString('base64')
    return base64
}

export async function verifyPassword(password: string, base64Hash: string) {
    const hash = Buffer.from(base64Hash, 'base64').toString('utf-8')
    return bcrypt.compare(password, hash)
}
