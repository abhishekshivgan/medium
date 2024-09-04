import React from "react";
import { Avatar } from "./Avatar"

interface fullBlogInputs {
    title: string,
    content: string,
    author?: string,
    publishedDate: Date
}

export function FullBlog({ title, content, publishedDate, author = "Anonymus" }: fullBlogInputs) {
    const date = new Date(publishedDate);
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', options);
    
    return <div>
        <div className="mt-10 flex justify-center">
            <div className="grid grid-cols-12">
                <div className="grid mx-10 my-5 lg:col-span-8 col-span-12">
                    <div className="pb-3 text-4xl font-extrabold lg:text-5xl lg:font-extrabold">
                        {title}
                    </div>
                    <div className="text-sm text-slate-400 pb-3">
                        {formattedDate}
                    </div>
                    <div>
                        {formatContent(content)}
                    </div>
                </div>
                <div className="grid m-10 lg:col-span-4 col-span-12">
                    <div className="w-full min-h-min">
                        <div className="text-sm text-slate-600 pb-3"> Author </div>
                        <div className="flex">
                            <div className="pr-2">
                                <Avatar size={"big"} name={author[0].toUpperCase() + author.slice(1)} />
                            </div>
                            <div className="text-lg font-bold">
                                {author[0].toUpperCase() + author.slice(1)}
                            </div>
                        </div>
                        <div className="pt-1 lg:pl-10  text-slate-400 text-sm">
                            Thank you for sharing your insightful content on the blog! Your contributions are invaluable!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}



function formatContent(content: string) {
    return content.split('\n').map((text, index) => (
        <React.Fragment key={index}>
            {text}
            <br />
        </React.Fragment>
    ));
}