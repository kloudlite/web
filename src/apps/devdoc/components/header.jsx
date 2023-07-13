import { BrandLogo } from "~/components/branding/brand-logo.jsx";
import { Link } from "@remix-run/react";
import { TextInput } from "~/components/atoms/input.jsx";
import { Search } from "@jengaicons/react";
import { Chip } from "~/components/atoms/chip-group.jsx";

export const Header = () => {
    return <div className={"border-b sticky h-docHeaderHeight top-0 z-40 backdrop-blur bg-white/80"}>
        <div className={"flex items-center max-w-7xl mx-auto w-full"}>
            <div className={"flex-grow flex gap-4 p-4"}>
                <BrandLogo detailed />
                <Link prefetch to={"/docs"}>Documentation</Link>
                <Link prefetch to={"/guides"}>Guides</Link>
                <Link prefetch to={"/help"}>Help</Link>
            </div>
            <div className={"flex flex-row gap-4 p-4 items-center"}>

                <TextInput placeholder={"Search"} prefixIcon={Search} suffix={<Chip label={"C+K"} />} />

                <Link prefetch to={"https://google.com"}>Feedback</Link>
                <Link to={"https://google.com"}>Login</Link>
                <Link to={"https://google.com"}>Signup</Link>
            </div>
        </div>
    </div>

}