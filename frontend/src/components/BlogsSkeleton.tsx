

export function BlogsSkeleton() {


    return <div>
        <div className="m-2 p-4 shadow-sm border-b-2 border-black: transparent">
            <div className="flex pb-2">
                <div className="flex flex-col justify-center">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                </div>
                <div className="pl-2 font-light text-xs flex flex-col justify-center">
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                </div>
                <div className="pl-2 font-light text-xs flex flex-col justify-center text-slate-500">
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                </div>
            </div>

            <div className="text-2xl font-bold cursor-pointer">
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
            </div>


            <div className="text-sm font-normal pb-2">
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
            </div>
            <div className="text-xs font-light pb-1">
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            </div>
        </div>
    </div>







}