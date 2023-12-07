import { Key, ReactNode } from "react"
import { cn } from "../utils/commons"

const ProgressCircle = ()=>{
    return <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M1.82422 6.11513C1.82422 3.8026 3.6989 1.92792 6.01143 1.92792C8.32397 1.92792 10.1986 3.8026 10.1986 6.11513C10.1986 8.42767 8.32397 10.3023 6.01143 10.3023C3.6989 10.3023 1.82422 8.42767 1.82422 6.11513ZM6.01143 0.927917C3.14661 0.927917 0.824219 3.25031 0.824219 6.11513C0.824219 8.97995 3.14661 11.3023 6.01143 11.3023C8.87625 11.3023 11.1986 8.97995 11.1986 6.11513C11.1986 3.25031 8.87625 0.927917 6.01143 0.927917ZM9.13624 6.11513C9.13624 7.84091 7.73722 9.23994 6.01144 9.23994C4.28565 9.23994 2.88663 7.84091 2.88663 6.11513C2.88663 4.38935 4.28565 2.99032 6.01144 2.99032C7.73722 2.99032 9.13624 4.38935 9.13624 6.11513Z" fill="#71717A"/>
  </svg>
  }

const ProgressTracker = ({items}:{items:{render:()=>ReactNode, id:Key}[]})=>{
    return <div className="flex flex-col">
    {items.map((item, index)=>
    (
    <div key={item.id} className="flex flex-row gap-xl">
        <div className={cn("flex flex-col items-center", index === 0 ? "pt-[6px]":"")}>
            <ProgressCircle/>
            <div className="border-r border-dashed flex-1"></div>
        </div>
        <div className={cn(index !== items.length - 1 ? "pb-3xl": "", index !== 0 ? "-mt-[6px]":"")}>
            {item.render()}
        </div>
    </div>
    )
    )}
</div>
}

export default ProgressTracker