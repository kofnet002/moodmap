import { FC } from "react";
import type { Metadata } from "next";
import Container from "../components/Container";
import Dashboard from "../components/Dashboard";

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