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

const resizeImage = (image: HTMLImageElement) => {
    if (image.width !== image.height) {
        const ratio = image.width / image.height;
        if (ratio > 1) {
            return {
                width: 200,
                height: 200 / ratio,
            };
        } else {
            return {
                width: 200 * ratio,
                height: 200,
            };
        }
    } else {
        return {
            width: 200,
            height: 200,
        };
    }
};

const CustomizeImage = ({ side, layerImage, actionType, type }: CustomizeImageProps) => {
    const [layerImages, setLayerImages] = useState<
        {
            id: string;
            image: HTMLImageElement | null;
        }[]
    >([
        {
            id: "front",
            image: null,
        },
        {
            id: "back",
            image: null,
        },
    ]);
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
                width: resizeImage(layerImage).width,
                height: resizeImage(layerImage).height,
                draggable: true,
                id: 'sticker' + type
            });

            if (layerRef.current && imageNode) {
                setLayerImages((prev: any) => {
                    return prev.map((layer: any) => {
                        if (layer.id === type) {
                            return {
                                ...layer,
                                image: layerImage,
                            };
                        }
                        return layer;
                    });
                });
                const findSticker = layerRef.current.findOne('#sticker' + type) as Konva.Image;
                findSticker?.destroy();
                layerRef.current.add(tr.current);
                tr.current.nodes([imageNode]);
                layerRef.current.add(imageNode);
                layerRef.current.batchDraw();
            }

        }
    }, [layerImage])

    const getValidImages = () => layerImages.filter((layer) => layer.id && layer.image);

    const removeLine = () => {
        layerRef.current?.add(tr.current);
        tr.current.nodes([]);
        layerRef.current?.batchDraw();
    }

    const downloadURI = (uri: string, name: string) => {
        const link = document.createElement("a");
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const handleDownload = (downloadType: 'front' | 'back') => {
        const validImages = getValidImages();
        removeLine();
        const validImageURL = layerRef.current?.toDataURL();

        validImages.forEach((layer) => {
            const fileName = `sticker${layer.id}.png`;
            downloadURI(validImageURL as string, fileName);
        });
    }

    const handleDelete = (deleteType: 'front' | 'back') => {
        const validImages = getValidImages();

        validImages.forEach((layer) => {
            const findSticker = layerRef.current?.findOne(`#sticker${layer.id}`) as Konva.Image;
            findSticker?.destroy();
            layerRef.current?.batchDraw();
        });
    }

    let isCalled = false;

    useEffect(() => {
        if (actionType) {
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
                removeLine();
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