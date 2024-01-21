import Konva from "konva";
import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Image, Transformer } from "react-konva";
import { MdSave, MdDeleteForever } from "react-icons/md";

type CustomizeImageProps = {
    side: string;
    layerImage: HTMLImageElement | null;
    actionType: 'delete-front' | 'delete-back' | 'download-front' | 'download-back' | null;
    type: 'front' | 'back';
};


const CustomizeImage = ({ side, layerImage, actionType, type }: CustomizeImageProps) => {

    const [tshirtImage, setTshirtImage] = useState<HTMLImageElement | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const image = new window.Image();
            image.src = side;
            setTshirtImage(image);
        }
    }, [side]);

    const shapRef = useRef<Konva.Image>(null);
    const layerRef = useRef<Konva.Layer>(null);
    const tr = useRef<Konva.Transformer>(new Konva.Transformer({}));

    useEffect(() => {
        if (layerImage) {
            const imageNode = new Konva.Image({
                x: 50,
                y: 50,
                image: layerImage,
                width: 200,
                height: 200,
                draggable: true,
                id: 'sticker' + type
            });

            if (layerRef.current) {
                // remove old one 
                const findSticker = layerRef.current.findOne('#sticker' + type) as Konva.Image;
                findSticker?.destroy();
                layerRef.current.add(tr.current);
                tr.current.nodes([imageNode]);
                layerRef.current.add(imageNode);
                layerRef.current.batchDraw();
            }

        }
    }, [layerImage])

    const handleDownload = (deleteType: 'front' | 'back') => {
        const dataURL = layerRef.current?.toDataURL();
        const link = document.createElement('a');
        link.download = 'sticker' + deleteType + '.png';
        link.href = dataURL as string;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const handleDelete = (downloadType: 'front' | 'back') => {
        const findSticker = layerRef.current?.findOne('#sticker' + downloadType) as Konva.Image;
        findSticker?.destroy();
        layerRef.current?.batchDraw();
    }

    let isCalled = false;

    useEffect(() => {
        if (!isCalled && actionType) {
            isCalled = true;
            const action = actionType.split('-') as any;
            console.log(action)
            if (action[0] === 'delete') {
                handleDelete(action[1]);
            } else if (action[0] === 'download') {
                handleDownload(action[1]);
            }
        }

    }, [actionType])

    useEffect(() => {
        if (layerRef.current) {
            layerRef.current.on('mouseover', (e) => {
                const findSticker = e.target.getStage()?.findOne('#sticker' + type) as Konva.Image;
                layerRef.current?.add(tr.current);
                tr.current.nodes([findSticker]);
                layerRef.current?.batchDraw();
            });

            layerRef.current.on('mouseout', (e) => {
                layerRef.current?.add(tr.current);
                tr.current.nodes([]);
                layerRef.current?.batchDraw();
            });
        }
    }, [layerRef.current]);

    return (
        <Stage
            width={400}
            height={400}
            id={type}
        >
            <Layer
                ref={layerRef}
            >

                <Image
                    image={tshirtImage as any}
                    width={400}
                    height={400}
                    fill="white"
                    ref={shapRef}
                    id={type}
                />
            </Layer>
        </Stage>
    );
}

export default CustomizeImage;