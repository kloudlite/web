import { Avatar } from "~/root/src/stories/components/atoms/avatar.jsx"
import { Button } from "~/root/src/stories/components/atoms/button.jsx"
import { TextInput } from "~/root/src/stories/components/atoms/input.jsx"

export default () => {
    return <div className="flex-1 flex flex-col gap-10">
        <div className="border border-border-default rounded-md p-5 flex flex-col gap-5">
            <span className="text-text-default headingMd">Profile</span>
            <div className="flex flex-row gap-x-5 items-center">
                <Avatar size={"large"} color={'one'} content="" />
                <Button content="Upload photo" variant="basic" />
            </div>
            <TextInput label={"Team name"} placeholder={"Astroman"} />
            <div className="flex flex-row gap-x-5">
                <TextInput label={"Team URL"} placeholder={"team url"} prefix={"kloudlite.com/"} message={"This is your URL namespace within Kloudlite"} className={"flex-1"} />
                <TextInput label={"Team ID"} placeholder={"team id"} message={"Used when interacting with the Kloudlite API"} className={"flex-1"} />
            </div>
        </div>
        <div className="border border-border-danger rounded-md p-5 flex items-start flex-col gap-5">
            <span className="text-text-default headingMd">Delete Account</span>
            <p>
                Permanently remove your personal account and all of its contents from the Kloudlite platform. This action is not reversible, so please continue with caution.
            </p>
            <Button variant="critical" content="Delete" />
        </div>
    </div>
}