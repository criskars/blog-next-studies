import { Suspense } from 'react'
import { Container } from './components/Container/Container'
import { FeaturedPost } from './components/FeaturedPost/FeaturedPost'
import PostsList from './components/PostsList/PostsList'
import { SpinLoader } from './components/SpinLoader/SpinLoader'

import 'dotenv/config'
import { drizzle } from 'drizzle-orm/libsql'
import { postsTable } from '@/db/schema'

export default async function Home() {
    const db = drizzle(process.env.DB_FILE_NAME!)

    const posts = await db.select().from(postsTable)

    console.log(posts)

    return (
        <Container>
            <Suspense fallback={<SpinLoader />}>
                <FeaturedPost></FeaturedPost>
                <PostsList></PostsList>
            </Suspense>
        </Container>
    )
}
