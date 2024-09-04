

export function Avatar({ name, size = "small" }: { name?: string, size?: string }) {
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-400 rounded-full dark:bg-gray-600 ${size === "big" ? "h-8 w-8" : "h-6 w-6"}`}>
        <span className={`font-sm text-black-600 dark:text-gray-300`}>{name && name[0].toUpperCase() }</span>
    </div>

}