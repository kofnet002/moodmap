import { Fugaz_One } from "next/font/google";
import { FC } from "react";

interface PageProps {
    text: string
    dark?: boolean
    full?: boolean
}

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

const Button: FC<PageProps> = ({ text, dark, full }) => {
    return (
        <button className={`${fugaz.className}
            rounded-full overflow-hidden duration-200 hover:opacity-60 border-2 border-solid border-pink-600
            ${dark ? 'text-white bg-pink-600' : 'text-pink-600'}
            ${full ? 'grid place-items-center w-full' : ''}
        `}>
            <p className={`px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3`}>
                {text}
            </p>
        </button>
    )
}

export default Button;