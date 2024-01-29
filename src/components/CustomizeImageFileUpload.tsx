import { memo } from "react"
const CustomizeImageFileUpload = ({ children, onChange, title, className, name }: { children: React.ReactNode, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, title: string, className?: string, name: string }) => {
    return (
        <label
            htmlFor="file-upload"
            className={"flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer hover:shadow-md " + className}
            title={title}>
            {children}
            <input
                type="file"
                accept="image/*"
                id="file-upload"
                name={name}
                onChange={onChange}
                className="hidden"
            />
        </label>
    )
}

export default memo(CustomizeImageFileUpload)