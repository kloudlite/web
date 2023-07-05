import classNames from "classnames";
import { BrandLogo } from "~/components/branding/brand-logo.jsx";
import { Button } from "~/components/atoms/button.jsx";
import { ArrowLeft, Envelope, EnvelopeFill, GithubLogoFill, GitlabLogoFill, GoogleLogo } from "@jengaicons/react";
import { useSearchParams, Link } from "@remix-run/react";
import { TextInput, PasswordInput } from "~/components/atoms/input.jsx";

const CustomGoogleIcon = (props) => {
    return <GoogleLogo {...props} weight={4}></GoogleLogo>
}

export default ({ }) => {
    const [searchParams, setSearchParams] = useSearchParams()
    return <div className={classNames("flex flex-col items-center justify-center min-h-full")}>
        <div className={classNames("flex flex-1 flex-col items-center self-stretch justify-center px-5 py-16 border-b border-border-default")}>
            <div className="flex flex-col items-stretch justify-center gap-8 md:w-[400px]">
                <BrandLogo darkBg={false} size={60} />
                <div className="flex flex-col items-stretch gap-8 border-b pb-8 border-border-default">
                    <div className="flex flex-col gap-2 items-center md:px-12">
                        <div className={classNames("text-text-strong heading3xl text-center")}>Signup to Kloudlite</div>
                        <div className="text-text-soft bodySm text-center">To access your DevOps console, Please provide your login credentials.</div>
                    </div>
                    {searchParams.get('mode') == "email"
                        ?
                        <div className="flex flex-col items-stretch gap-5">
                            <TextInput label={"Name"} placeholder={"Full name"} />
                            <div className="flex flex-col gap-5 items-stretch md:flex-row">
                                <TextInput label={"Company Name"} className={"flex-1"} />
                                {/* <NumberInput label={"Company Size"} className={"flex-1"} min={1} /> */}
                            </div>
                            <TextInput label={"Email"} placeholder={"ex: john@company.com"} />
                            <PasswordInput label={"Password"} placeholder={"XXXXXX"} />
                            <Button size={"large"} variant={"primary"} content={<span className="bodyLg-medium">Continue with Email</span>} IconComp={EnvelopeFill} block LinkComponent={Link} />
                        </div>
                        :
                        <div className="flex flex-col items-stretch gap-5">
                            <Button size={"large"} variant={"basic"} content={<span className="bodyLg-medium">Continue with GitHub</span>} IconComp={GithubLogoFill} href={"https://google.com"} block LinkComponent={Link} />
                            <Button size={"large"} variant={"primary"} content={<span className="bodyLg-medium">Continue with GitLab</span>} IconComp={GitlabLogoFill} block LinkComponent={Link} />
                            <Button size={"large"} variant={"secondary"} content={<span className="bodyLg-medium">Continue with Google</span>} IconComp={CustomGoogleIcon} block LinkComponent={Link} />
                        </div>}
                </div>
                {searchParams.get('mode') == "email"
                    ?
                    <Button size={"large"} variant={"outline"} content={<span className="bodyLg-medium">Other Signup options</span>} IconComp={ArrowLeft} href={"/signup"} block LinkComponent={Link} />
                    :
                    <Button size={"large"} variant={"outline"} content={<span className="bodyLg-medium">Signup with Email</span>} IconComp={Envelope} href={"/signup/?mode=email"} block LinkComponent={Link} />}

                <div className="bodyMd text-text-soft text-center">
                    By signing up, you agree to the <Link to="/terms" className="underline">Terms of Service</Link> and <Link className="underline" to="/privacy">Privacy Policy</Link>.
                </div>

            </div>
        </div>
        <div className="py-8  px-5 flex flex-row items-center justify-center self-stretch">
            <div className="bodyMd text-text-default">Already have an account?</div>
            <Button content={"Login"} variant={"primary-plain"} size="medium" href={"/login"} LinkComponent={Link} />
        </div>
    </div >
}