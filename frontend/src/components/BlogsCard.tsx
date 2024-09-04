import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";

interface BlogsInput {
    authorName: string;
    publishedDate: string;
    title: string;
    content: string
    id: number
}

export function BlogsCard({ authorName, publishedDate, title, content, id}: BlogsInput) {

    return <div className="m-2 p-4 shadow-sm border-b-2 border-black: transparent">
        <div className="flex pb-2">
            <div className="flex flex-col justify-center">
                <Avatar name={authorName} />
            </div>
            <div className="pl-2 font-light text-xs flex flex-col justify-center">
                {authorName}
            </div>
            <div className="pl-2 font-light text-xs flex flex-col justify-center text-slate-500">
                {publishedDate}
            </div>
        </div>
        <Link to={`/blog/${id}`}>
            <div className="text-2xl font-bold cursor-pointer">
                {title}
            </div>
        </Link>

        <div className="text-sm font-normal pb-2">
            {content.length <= 150 ? content : `${content.slice(0, 150)}...`}
        </div>
        <div className="text-xs font-light pb-1">
            {`${Math.ceil(content.length / 1250)} min read`}
        </div>
    </div>
}

