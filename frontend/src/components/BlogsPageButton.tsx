import { useNavigate } from "react-router-dom"

export function BlogsPageButton() {
    const navigate = useNavigate()

    function handleClick() {
        navigate("/blogs")
    }

    return <button onClick={handleClick} type="button" className="text-black font-normal rounded-full text-sm px-1 py-1 text-center mr-3">
        Blogs
    </button>
}