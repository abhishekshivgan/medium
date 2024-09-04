import { BlogsCard } from "../components/BlogsCard";
import { BlogsSkeleton } from "../components/BlogsSkeleton";
import { useBlogs } from "../hooks";

export function Blogs() {

    const { blogs, loading } = useBlogs();

    if (loading) {
        return <div className="flex justify-center min-w-lg">
            <div className="w-4/6">
                <BlogsSkeleton />
                <BlogsSkeleton />
                <BlogsSkeleton />
                <BlogsSkeleton />
            </div>
        </div>

    }

    return <div className="flex justify-center">
        <div className="lg:min-w-md lg:max-w-2xl px-7">
            {blogs?.slice().reverse().map((blog) => {
                const date = new Date(blog.publishedDate);
                const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
                const formattedDate = date.toLocaleDateString('en-GB', options);
                
                return <BlogsCard
                    authorName={blog.author.name[0].toUpperCase() + blog.author.name.slice(1) || "Anonymous"}
                    publishedDate={formattedDate}
                    title={blog.title}
                    content={blog.content}
                    key={blog.id}
                    id={blog.id}
                />
            })}
        </div>
    </div>
}