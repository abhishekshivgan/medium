import { ChangeEvent } from "react";

interface inputData {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string
}

export function LabelledInput({ label, placeholder, onChange, type }: inputData) {
    return <div className="m-3">
        <label className="block mb-1 text-md font-medium text-gray-900 dark:text-white">{label}</label>
        <input onChange={onChange} type={type} className="bg-gray-50 border border-gray-300 text-gray-900 
        text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
        dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
    </div>
}