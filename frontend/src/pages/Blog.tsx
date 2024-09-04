import { useParams } from "react-router-dom";
import { useRecoilValueLoadable} from "recoil";
import { blogAtomFamily } from "../store/atoms/blogAtomFamily";
import { FullBlog } from "../components/FullBlog";
import { BlogSkeleton } from "../components/BlogSkeleton";

export function Blog() {
    const { id } = useParams<{ id?: string }>();

    // Handle case when `id` is not available
    if (!id) {
        return <div>Error: No blog ID provided</div>;
    }

    // Get the current blog state setter and loadable for blog data
    const blogLoadable = useRecoilValueLoadable(blogAtomFamily(id));

    // Handle the loading state
    if (blogLoadable.state === 'loading') {
        return <BlogSkeleton />;
    }


    // Handle the error state
    if (blogLoadable.state === 'hasError') {
        return <div>Error loading blog</div>;
    }

    // Extract blog content from loadable
    interface blogInputs {
        title: string,
        content: string,
        author: {
            name: string
        }
        publishedDate: Date
    }
    const blog: blogInputs = blogLoadable.state === 'hasValue' ? blogLoadable.contents : null;


    // Render the blog content if available
    return (
        <div>
            {blog ? (
                <FullBlog title={blog.title} content={blog.content} author={blog.author.name} publishedDate={blog.publishedDate}/>
            ) : (
                <div>Blog content not available</div>
            )}
        </div>
    );
}
