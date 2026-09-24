'use server'

import { error } from 'console'
import { mkdir, writeFile } from 'fs/promises'
import { extname, resolve } from 'path'
import { checkAuthentication } from '../lib/login/manage-login'

export type UploadImageActionResult = {
    url: string
    error: string
}

export async function uploadImage(
    formData: FormData
): Promise<UploadImageActionResult> {
    const makeResult = ({ url = '', error = '' }) => ({ url, error })
    const isAuthenticated = await checkAuthentication()

    if (!isAuthenticated) {
        return makeResult({
            url: '',
            error: 'User not authenticated.',
        })
    }

    if (!(formData instanceof FormData)) {
        return makeResult({ error: 'Invalid data' })
    }

    const file = formData.get('postCoverImage')

    if (!(file instanceof File)) {
        return makeResult({ error: 'Invalid file' })
    }

    const uploadMaxSize = 1 * 1024 * 1024
    if (file.size > uploadMaxSize) {
        return makeResult({ error: 'File too large' })
    }

    if (!file.type.startsWith('image/')) {
        return makeResult({ error: 'Invalid image' })
    }

    const imageExtension = extname(file.name)
    const uniqueImageName = `${Date.now()}${imageExtension}`

    const uploadDir = process.env.IMAGE_UPLOAD_DIRECTORY || 'uploads'
    const uploadFullPath = resolve(process.cwd(), 'public', uploadDir)
    await mkdir(uploadFullPath, { recursive: true })

    const fileArrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(fileArrayBuffer)

    const fileFullPath = resolve(uploadFullPath, uniqueImageName)

    await writeFile(fileFullPath, buffer)

    const imgServerUrl =
        process.env.IMAGE_SERVER_URL || 'http://localhost:3000/uploads'
    const url = `${imgServerUrl}/${uniqueImageName}`

    console.log(error, url)

    return makeResult({ url })
}
