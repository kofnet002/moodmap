'use client'

import { FC } from "react";
import { useAuth } from "../context/AuthContext";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Button from "./Button";

interface PageProps { }

const Logout: FC<PageProps> = ({ }) => {
    const { logout, currentUser } = useAuth() as any
    const pathname = usePathname()

    if (!currentUser) {
        return
    }

    if (pathname === "/") {
        return (
            <Link href={'/dashboard'}>
                <Button text="Go to dashboard" />
            </Link>
        )
    }

    return (
        <div onClick={logout}>
            <Button text="Logout" />
        </div>
    )
}

export default Logout;