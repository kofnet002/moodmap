import { FC } from "react";
import type { Metadata } from "next";
import Container from "../components/Container";
import LoginPage from "../components/Login";
import Dashboard from "../components/Dashboard";
import { useAuth } from "../context/AuthContext";

interface PageProps {
}

export const metadata: Metadata = {
    title: "Moodmap | Dashboard",
};

const Page: FC<PageProps> = ({ }) => {

    return (
        <Container>
            <Dashboard />
        </Container>
    )
}

export default Page;