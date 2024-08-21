import { Fugaz_One } from "next/font/google";
import { FC } from "react";
import Button from "./Button";
import Calender from "./Calendar";

interface PageProps { }

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });
const Hero: FC<PageProps> = () => {

    return (
        <div className="py-4 md:py-12 flex flex-col gap-4 sm:gap-8">
            <h1 className={`${fugaz.className} text-5xl sm:text-6xl md:text-7xl text-center`}><span className="textGradient">Moodmap</span> helps you track your <span className="textGradient">dialy</span> mood!</h1>

            <p className="text-lg sm:text-xl md:text-2xl text-center w-full mx-auto max-w-[600px]">Create your mood record and see how you feel on <span className="font-semibold">every day of the year.</span></p>

            <div className="grid grid-cols-2 gap-4 w-fit mx-auto">
                <Button text="Sign up" />
                <Button text="Log in" dark />
            </div>

            <Calender />
        </div>
    )
}

export default Hero;