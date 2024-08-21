import { gradients, baseRating, demoData } from "@/util";
import { FC } from "react";

interface PageProps {
    demo?: boolean;
}

const months = { 'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr', 'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug', 'September': 'Sept', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec' };
const now = new Date();
const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Calender: FC<PageProps> = ({ demo }) => {
    const year = 2024;
    const month = 'August';
    const monthNow = new Date(year, Object.keys(months).indexOf(month), 1);
    const firstDayOfMonth = monthNow.getDay();
    const daysInMonth = new Date(year, Object.keys(month).indexOf(month) + 1, 0).getDate();

    const daysToDisplay = firstDayOfMonth + daysInMonth;
    const numRows = Math.floor(daysToDisplay / 7) + (daysToDisplay % 7 ? 1 : 0);

    return (
        <div className="flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:py-10">
            {Array.from(Array(numRows)).map((_, rowIndex: number) => {
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
                                : dayIndex in demoData
                                    ? gradients.pink[demoData[dayIndex]]
                                    : 'white';

                            return (
                                <div
                                    style={{ background: color }}
                                    key={dayOfWeekIndex}
                                    className={`text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg ${isToday ? 'border-pink-400' : 'border-pink-100'} ${color === 'white' ? 'text-pink-400' : 'text-white'
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
    );
};

export default Calender;
