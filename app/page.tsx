import { Container } from "./components/Container/Container";
import { FeaturedPost } from "./components/FeaturedPost/FeaturedPost";
import PostsList from "./components/PostsList/PostsList";

export default function Home() {
    return (
        <Container>
            <FeaturedPost></FeaturedPost>
            <PostsList></PostsList>
        </Container>
    )
}
