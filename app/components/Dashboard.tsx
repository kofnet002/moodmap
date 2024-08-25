'use client'

import { Fugaz_One } from "next/font/google";
import { FC, useState, useEffect } from "react";
import Calender from "./Calendar";
import { useAuth } from "../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import LoginPage from "./Login";
import Loading from "./Loading";
import Image from "next/image";

interface PageProps { }

const fugaz = Fugaz_One({ subsets: ["latin"], weight: "400" });

const Dashboard: FC<PageProps> = () => {

    const { currentUser, userDataObj, setUserDataObj, loading } = useAuth() as any
    const [data, setData] = useState<any>({});
    const now = new Date()
    const [timeRemaining, setTimeRemaining] = useState<string>("");


    useEffect(() => {
        const startCountdown = () => {
            const targetTime: Date = new Date();  // Set your target time here
            targetTime.setHours(23, 59, 59);  // Example: target is 23:59:59

            const interval = setInterval(() => {
                const now: Date = new Date();
                const timeDiff = Number(targetTime) - Number(now);  // Get the difference in milliseconds

                if (timeDiff <= 0) {
                    clearInterval(interval);
                    setTimeRemaining("0h : 0m : 0s");
                    return;
                }

                const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
                const seconds = Math.floor((timeDiff / 1000) % 60);

                setTimeRemaining(`${hours}h : ${minutes}m : ${seconds}s`);
            }, 1000);  // Update every second

            return () => clearInterval(interval);  // Cleanup on unmount
        };

        startCountdown();
    }, []);

    const countValues = () => {
        let total_number_of_days = 0;
        let sum_moods = 0;

        for (const year in data) {
            for (const month in data[year]) {
                for (const day in data[year][month]) {
                    total_number_of_days++;
                    sum_moods += data[year][month][day];
                }
            }
        }
        return { "num_days": total_number_of_days, "average_mood": (sum_moods / total_number_of_days).toFixed(1) }
    }

    const statuses: { [key: string]: number | string } = {
        ...countValues(),
        timeRemaining
    }

    const handleSetMood = async (mood: number) => {
        const day = now.getDate()
        const month = now.getMonth()
        const year = now.getFullYear()

        try {
            const newData = { ...userDataObj }
            if (!newData?.[year]) {
                newData[year] = {}
            }
            if (!newData?.[year]?.[month]) {
                newData[year][month] = {}
            }

            newData[year][month][day] = mood

            // update current state
            setData(newData)
            // update global state
            setUserDataObj(newData)
            // update firebase
            const docRef = doc(db, 'users', currentUser.uid)
            const res = await setDoc(docRef, {
                [year]: {
                    [month]: {
                        [day]: mood
                    }
                }
            }, { merge: true })
        } catch (error) {
            console.error("Failed to set data", error)
        }
    }

    const moods: { [key: string]: string } = {
        'Very Sad': '😭',
        'Sad': '🥲',
        'Existing': '😶',
        'Good': '😊',
        'Elated': '😍',
    }

    useEffect(() => {
        if (!currentUser || !userDataObj) return
        setData(userDataObj)
    }, [currentUser, userDataObj])


    if (loading) {
        return <Loading />
    }

    if (!currentUser) {
        return <LoginPage />
    }

    return (
        <div className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16">
            <div className="grid grid-cols-3 bg-pink-50 text-pink-500 sm:p-3 p-4">
                {Object.keys(statuses).map((status: string, statusIndex: number) => {
                    return (
                        <div key={statusIndex} className="p-1 flex flex-col gap-1 sm:gap-2">
                            <p className="font-medium capitalize truncate overflow-ellipsis text-xs sm:text-sm">{status.replaceAll('_', ' ')}</p>
                            <p className={`${fugaz.className} truncate overflow-ellipsis text-base sm:text-lg flex items-center`}>{statuses[status]} {
                                status === 'num_days' ? <Image className="w-5" width={500} height={0} src="/fire.gif" alt="fire-gif" /> : ''
                            }</p>
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
                        <button onClick={() => {
                            const currentMoodValue = moodIndex + 1;
                            handleSetMood(currentMoodValue)
                        }}
                            key={moodIndex} className={`flex-1 p-4 px-3 rounded-lg purpleShadow duration-200 bg-pink-50 hover:bg-pink-100 text-center flex flex-col gap-2 items-center`}>
                            <p className="text-4xl sm:text-5xl md:text-6xl">{moods[mood]}</p>
                            <p className={`${fugaz.className} text-pink-500 text-xs sm:text-sm md:text-base`}>{mood}</p>
                        </button>
                    )
                })}
            </div>
            <Calender demo={false} completeData={data} />
        </div>
    )
}

export default Dashboard;