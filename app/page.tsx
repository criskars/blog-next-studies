import { Suspense } from 'react'
import { Container } from './components/shared/Container/Container'
import { FeaturedPost } from './components/public/FeaturedPost/FeaturedPost'
import PostsList from './components/public/PostsList/PostsList'
import { SpinLoader } from './components/shared/SpinLoader/SpinLoader'

import { drizzle } from 'drizzle-orm/libsql'
import { postsTable } from '@/db/schema'
// import { eq } from 'drizzle-orm'

export default async function Home() {
    const db = drizzle(process.env.DB_FILE_NAME!)

    console.log(await db.select().from(postsTable))

    // const post = {
    //     id: crypto.randomUUID(),
    //     title: 'Teste 1',
    //     excerpt: 'post.excerpt',
    //     coverImageUrl: '/images/bryen_0.png',
    //     createdAt: new Date().toISOString(),
    //     slug: 'jghsudjdtykdtkitiodtot7driuhseoshgo',
    //     author: 'post.author',
    //     published: true,
    //     updatedAt: new Date().toISOString(),
    //     content: 'post.content',
    // }

    // await db.insert(postsTable).values(post)

    // await db
    //     .delete(postsTable)
    //     .where(eq(postsTable.id, '0653cbb5-42f3-47f1-91ec-7dce59c397ea'))

    return (
        <Container>
            <Suspense fallback={<SpinLoader />}>
                <FeaturedPost></FeaturedPost>
                <PostsList></PostsList>
            </Suspense>
        </Container>
    )
}
