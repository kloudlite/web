export const SubHeader = ({ title, actions }) => {
    return (<div>
        <div className="flex flex-col justify-center max-w-296 m-auto">
            <div className="flex flex-row items-center justify-between pb-5 pt-10">
                <div className="text-text-strong headingLg py-1.5">
                    {title}
                </div>
                <div className="flex flex-row items-center justify-center">
                    {actions && actions}
                </div>
            </div>
        </div>
    </div>)
}