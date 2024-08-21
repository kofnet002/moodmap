import { FC } from "react";
import type { Metadata } from "next";
import Container from "../components/Container";
import LoginPage from "../components/Login";
import Dashboard from "../components/Dashboard";

interface PageProps {
}

export const metadata: Metadata = {
    title: "Moodmap | Dashboard",
};

const Page: FC<PageProps> = ({ }) => {

    let isAuthenticated = true

    let children = (
        <LoginPage />
    )

    if (isAuthenticated) {
        children = (
            <Dashboard />
        )
    }

    return (
        <Container>
            {children}
        </Container>
    )
}

export default Page;