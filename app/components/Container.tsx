import { FC } from "react";

interface PageProps {
    children: React.ReactNode
}

const Container: FC<PageProps> = ({ children }) => {
    return (
        <main className="p-4 sm:p-8 flex-1 flex flex-col">
            {children}
        </main>
    )
}

export default Container;