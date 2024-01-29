import { memo } from "react"
const CustomizeImageBtn = ({ children, onClick, title, className }: { children: React.ReactNode, onClick: () => void, title: string, className?: string }) => {
    return (
        <button
            className={"p-2 rounded-md cursor-pointer text-sm flex items-center gap-2 group hover:scale-110 transform transition-all " + className}
            style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.9)'
            }}
            onClick={onClick}
            title={title}
        >
            {children}
        </button>
    )
}

export default memo(CustomizeImageBtn)