import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'

const jwtSecretKey = process.env.JWT_SECRET_KEY || 'default-secret-key'
const jwtEncodeKey = new TextEncoder().encode(jwtSecretKey)

const loginExpiration = parseInt(
    process.env.LOGIN_EXPIRATION_SECONDS || '86400',
    10
)
const loginExpirationString = process.env.LOGIN_EXPIRATION_STRING || '1d'
const cookieName = process.env.LOGIN_COOKIE_NAME || 'loginSession'

export async function createLoginCookie(email: string) {
    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        jwtEncodeKey,
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
    )
    const jwtSign = await crypto.subtle.sign(
        { name: 'HMAC', hash: 'SHA-256' },
        cryptoKey,
        new TextEncoder().encode(email + ' - ' + loginExpirationString)
    )

    // not full token for now, just the signature part, since we are not using a full JWT structure
    const token = Buffer.from(jwtSign).toString('base64')

    const cookieStore = await cookies()
    cookieStore.set(cookieName, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: loginExpiration,
    })
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
