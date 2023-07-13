export const SubHeader = ({ title, actions }) => {
    return (<div>
        <div className="flex flex-col justify-center max-w-296 m-auto">
            <div className="flex flex-row items-center justify-between pb-3xl pt-6xl">
                <div className="text-text-strong headingLg">
                    {title}
                </div>
                <div className="flex flex-row items-center justify-center">
                    {actions && actions}
                </div>
            </div>
        </div>
    </div>)
}