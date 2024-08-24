import { FC } from "react";

interface PageProps {
}

const Loading: FC<PageProps> = ({ }) => {

    return (
        <div className="flex flex-col flex-1 items-center justify-center h-screen">
            <h1 className="italic text-xl sm:text-2xl md:text-3xl text-center">
                <i className="animate-spin text-pink-500 fa-solid fa-spinner"></i>
            </h1>
        </div>
    )
}

export default Loading;