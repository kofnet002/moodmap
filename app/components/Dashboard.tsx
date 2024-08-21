import { Fugaz_One } from "next/font/google";
import { FC } from "react";
import Calender from "./Calendar";

interface PageProps { }

const fugaz = Fugaz_One({ subsets: ["latin"], weight: "400" });

const Dashboard: FC<PageProps> = () => {
    const statuses: { [key: string]: number | string } = {
        num_days: 14,
        time_remaining: '13:14:26',
        date: new Date().toDateString()
    }

    const moods: { [key: string]: string } = {
        '&*@#$': '😭',
        'Sad': '🥲',
        'Existing': '😶',
        'Good': '😊',
        'Elated': '😍',
    }

    return (
        <div className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16">
            <div className="grid grid-cols-3 bg-pink-50 text-pink-500 p-4 gap-4">
                {Object.keys(statuses).map((status: string, statusIndex: number) => {
                    return (
                        <div key={statusIndex} className="p-4 flex flex-col gap-1 sm:gap-2">
                            <p className="font-medium uppercase text-xs sm:text-sm">{status.replaceAll('_', ' ')}</p>
                            <p className={`${fugaz.className} text-base sm:text-lg truncate`}>{statuses[status]}</p>
                        </div>
                    )
                })}
            </div>

            <h4 className={`${fugaz.className} text-5xl sm:text-6xl md:text-7xl text-center`}>
                How do you <span className="textGradient">feel</span> today?
            </h4>

            <div className="flex items-stretch flex-wrap gap-4">
                {Object.keys(moods).map((mood: string, moodIndex: number) => {
                    return (
                        <button key={moodIndex} className={`flex-1 p-4 px-3 rounded-lg purpleShadow duration-200 bg-pink-50 hover:bg-pink-100 text-center flex flex-col gap-2 items-center`}>
                            <p className="text-4xl sm:text-5xl md:text-6xl">{moods[mood]}</p>
                            <p className={`${fugaz.className} text-pink-500 text-xs sm:text-sm md:text-base`}>{mood}</p>
                        </button>
                    )
                })}
            </div>
            <Calender />
        </div>
    )
}

export default Dashboard;