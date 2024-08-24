'use client'

import { FC } from "react";
import Button from "./Button";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

interface PageProps { }

const CallToAction: FC<PageProps> = () => {
    const { currentUser } = useAuth() as any

    return (
        <div className="py-4 md:py-12 flex flex-col gap-4 sm:gap-8">
            {currentUser ? (
                <div className="max-w-[600px] w-full mx-auto">
                    <Link href={'/dashboard'}>
                        <Button text="Go to dashboard" dark full />
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-4 w-fit mx-auto">
                    <Link href={'/dashboard'}>
                        <Button text="Sign up" />
                    </Link>
                    <Link href={'/dashboard'}>
                        <Button text="Log in" dark />
                    </Link>
                </div>
            )}
        </div>
    )
}

export default CallToAction;