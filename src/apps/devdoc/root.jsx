import Root, {links as baseLinks} from "~/lib/app-setup/root"
import authStylesUrl from "./styles/index.css";
import { Link } from "@remix-run/react";
import { Sidebar } from "./components/sidebar";
import {BrandLogo} from "~/root/src/stories/components/branding/brand-logo";
import {Header} from "./components/header";

export const links = ()=>{
    return [
        ...baseLinks(),
        {rel: "stylesheet", href: authStylesUrl}
    ]
}

const Layout = ({children})=>{
    return (
        <div className="flex flex-col">
            <Header />
            <div className={"flex flex-row min-h-screen max-w-7xl mx-auto w-full"}>
                <Sidebar />
                <div className={"pl-docSidebarWidth flex flex-grow flex-col"}>
                    {children}
                    <div>Footer</div>
                </div>
            </div>
        </div>
    )
}

export default ({...props})=>{
    return (
        <Root {...props} Wrapper={Layout} />
    )
};