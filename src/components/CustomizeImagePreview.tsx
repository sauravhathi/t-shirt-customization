import { memo } from "react"
const CustomizeImagePreview = ({ image }: { image: HTMLImageElement | null }) => {
    return (
        <img
            src={image?.src}
            alt="preview"
            title="preview"
            className="object-contain h-10 w-20 md:h-14 rounded-md hover:scale-110 transform transition-all cursor-pointer"
            style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.9)'
            }}
        />
    )
}

export default memo(CustomizeImagePreview)