import Konva from "konva";
import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Image, Transformer } from "react-konva";

const CustomizeImage = ({ image = '/white.png', layerImage }: { image?: string, layerImage: HTMLImageElement | null }) => {
    const [tshirtImage] = useState(new window.Image());
    tshirtImage.src = image;

    const [selectedId, selectShape] = useState(null);
    const [nodes, setNodes] = useState([]);

    const stageRef = useRef<Konva.Stage>(null);
    const layerRef = useRef<Konva.Layer>(null);
    const trRef = useRef<Konva.Transformer>(null);

    useEffect(() => {
        if (layerImage && layerRef.current) {
            const imageNode = new Konva.Image({
                x: 50,
                y: 50,
                image: layerImage,
                width: 200,
                height: 200,
                draggable: true,
                id: 'image',
            });

            trRef.current?.nodes([imageNode]);

            layerRef.current.add(imageNode);

            layerRef.current.draw();
        }
    }, [layerImage]);

    const checkDeselect = (e: any) => {
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            selectShape(null);
        }
    }

    return (
        <div className="max-w-[500px] mx-auto"
        >
            <Stage
                width={500}
                height={500}
                onMouseDown={checkDeselect}
                onTouchStart={checkDeselect}
                ref={stageRef}
                className="p-2"
            >
                <Layer
                    ref={layerRef}
                >

                    <Image
                        image={tshirtImage}
                        width={500}
                        height={500}
                        fill="white"
                        stroke="gray"
                    />
                    {
                        layerImage && (
                            <Transformer
                                ref={trRef}
                                boundBoxFunc={(oldBox, newBox) => {
                                    if (newBox.width < 5 || newBox.height < 5) {
                                        return oldBox;
                                    }
                                    return newBox;
                                }}
                            />
                        )
                    }
                </Layer>
            </Stage>
        </div>
    );
}

export default CustomizeImage;