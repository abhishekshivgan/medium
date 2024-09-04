import { useNavigate } from "react-router-dom"


interface Inputs {
    isOpen: boolean;
    onClose: () => void;
}

export function SigninPopup({ isOpen, onClose }: Inputs) {
    const navigate = useNavigate();

    const handleClick = () => {
        onClose();
        navigate("/signin");
    };

    if (!isOpen) {
        return null;
    }

    return <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">Please Sign In</h2>
            <p className="mb-6">You need to sign in to write blog</p>
            <button
                onClick={handleClick}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
            >
                Sign In
            </button>
            <button
                onClick={onClose}
                className="bg-gray-300 text-black py-2 px-4 rounded ml-4 hover:bg-gray-400 transition-colors duration-300"
            >
                Close
            </button>
        </div>
    </div>
}

