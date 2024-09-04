


interface Inputs {
    statusCode: number;
    statusText: string
    isOpen: boolean;
    onClose: () => void;
}

export function ErrorPopup({ statusCode, statusText, isOpen, onClose }: Inputs) {


    if (!isOpen) {
        return null;
    }

    return <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">Error {statusCode}</h2>
            <p className="mb-6">{statusText}</p>

            <button
                onClick={onClose}
                className="bg-gray-300 text-black py-2 px-4 rounded ml-4 hover:bg-gray-400 transition-colors duration-300"
            >
                Close
            </button>
        </div>
    </div>
}

