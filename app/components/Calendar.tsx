'use client'

import { gradients, baseRating, demoData } from "@/util";
import { Fugaz_One } from "next/font/google";
import { FC, useState } from "react";

interface PageProps {
    demo?: boolean;
    completeData: any;
}

const months = { 'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr', 'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug', 'September': 'Sept', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec' };
const monthsArr = Object.keys(months);
const now = new Date();
const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

const Calender: FC<PageProps> = ({ demo, completeData }) => {
    const currentMonth = now.getMonth();
    const [selectedMonth, setSelectedMonth] = useState(Object.keys(months)[currentMonth]);
    const [selectedYear, setSelectedYear] = useState(now.getFullYear());

    // const year = 2024;
    // const month = 'August';

    const monthNow = new Date(selectedYear, Object.keys(months).indexOf(selectedMonth), 1);
    const firstDayOfMonth = monthNow.getDay();
    const daysInMonth = new Date(selectedYear, Object.keys(selectedMonth).indexOf(selectedMonth) + 1, 0).getDate();
    const daysToDisplay = firstDayOfMonth + daysInMonth;
    const numRows = Math.floor(daysToDisplay / 7) + (daysToDisplay % 7 ? 1 : 0);

    const numericalMonth = monthsArr.indexOf(selectedMonth);
    const data = completeData[selectedYear]?.[numericalMonth] || {};

    const handleMonthIncrement = (val: number) => {
        // val is either 1 or -1
        // if we hit the bounds of the monts, then we can just adjust the year that is displayed instead
        if (numericalMonth + val < 0) {
            // set month value = 11 and decrement the year
            setSelectedYear(curr => curr - 1);
            setSelectedMonth(monthsArr[monthsArr.length - 1]);
            return;
        } else if (numericalMonth + val > 11) {
            // set month value = 0 and increment the year
            setSelectedYear(curr => curr + 1);
            setSelectedMonth(monthsArr[0]);
            return;
        } else {
            setSelectedMonth(monthsArr[numericalMonth + val]);
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-5 gap-4">
                <button onClick={() => handleMonthIncrement(-1)} className="mr-auto text-pink-400 text-lg sm:text-xl duration-200 hover:opacity-60">
                    <i className="fa-solid fa-circle-chevron-left"></i>
                </button>
                <p className={`text-center col-span-3 whitespace-nowrap capitalize textGradient ${fugaz.className}`}>{selectedMonth}, {selectedYear}</p>
                <button onClick={() => handleMonthIncrement(+1)} className="ml-auto text-pink-400 text-lg sm:text-xl duration-200 hover:opacity-60">
                    <i className="fa-solid fa-circle-chevron-right"></i>
                </button>
            </div>

            <div className="flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:py-10">
                {[...Array(numRows).keys()].map((_, rowIndex: number) => {
                    return (
                        <div key={rowIndex} className="grid grid-cols-7 gap-1">
                            {dayList.map((dayOfWeek: string, dayOfWeekIndex: number) => {
                                let dayIndex = rowIndex * 7 + dayOfWeekIndex - (firstDayOfMonth - 1);
                                let dayDisplay = dayIndex > daysInMonth ? false : rowIndex === 0 && dayOfWeekIndex < firstDayOfMonth ? false : true;
                                let isToday = dayIndex === now.getDate();

                                if (!dayDisplay) {
                                    return <div className="bg-white" key={dayOfWeekIndex} />;
                                }

                                let color = demo
                                    ? gradients.pink[baseRating[dayIndex]]
                                    : dayIndex in data
                                        ? gradients.pink[data[dayIndex]]
                                        : 'white';

                                return (
                                    <div
                                        style={{ background: color }}
                                        key={dayOfWeekIndex}
                                        className={`text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg ${isToday ? 'border-pink-800' : 'border-pink-100'} ${color === 'white' ? 'text-pink-400' : 'text-white'
                                            }`}
                                    >
                                        <p>{dayIndex}</p>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Calender;
