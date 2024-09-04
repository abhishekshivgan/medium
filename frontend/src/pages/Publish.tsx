import { ChangeEvent, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";



export function Publish() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();


    async function postBlog() {
        const res = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
            title,
            content
        }, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        });

        if (res) {
            navigate(`/blog/${res.data.id}`);
        }
    }

    return <div className="mt-5 flex justify-center w-full ">
        <div className="max-w-screen-lg w-full">
            <input type="text" onChange={(e) => { setTitle(e.target.value) }} className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5" placeholder="Title" />
            <BlogBody onChange={(e) => { setContent(e.target.value) }} />
            <div className="flex items-center justify-between px-3 py-2">
                <button onClick={postBlog} type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
                    Publish Post
                </button>
            </div>
        </div>
    </div>
}

function BlogBody({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {

    return <div>
        <form>
            <div className="mt-5 w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 ">
                <div className="px-4 py-2 bg-white rounded-t-lg">
                    <textarea onChange={onChange} rows={15} className="focus:outline-none w-full px-0 text-sm text-gray-900 bg-white" placeholder="Content" required ></textarea>
                </div>
            </div>
        </form>
    </div>
}