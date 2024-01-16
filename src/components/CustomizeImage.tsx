import Konva from "konva";
import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Image, Transformer } from "react-konva";

const CustomizeImage = ({ image = '/white.png', layerImage }: { image?: string, layerImage: HTMLImageElement | null }) => {
    // const [tshirtImage] = useState(new window.Image());
    const [tshirtImage] = useState( () => 
    {
        if (typeof window !== 'undefined') {
            const image = new window.Image();
            image.src = '/white.png';
            return image;
        }
    });

    const [selectedId, selectShape] = useState<string | null>(null);
    const [nodes, setNodes] = useState<any[]>([]);

    const shapRef = useRef<Konva.Image>(null);
    const layerRef = useRef<Konva.Layer>(null);
    const trRef = useRef<Konva.Transformer>(null);

    useEffect(() => {
        if (layerImage) {
            const imageNode = new Konva.Image({
                x: 50,
                y: 50,
                image: layerImage,
                width: 200,
                height: 200,
                draggable: true,
                id: 'image',
            });

            setNodes([imageNode]);

            trRef.current?.nodes([imageNode]);
            
            layerRef.current?.add(imageNode);
            layerRef.current?.batchDraw();


        }
    }
        , [layerImage]);

    const save = () => {
        trRef.current?.nodes([]);
        trRef.current?.getLayer()?.batchDraw();
    }

    const edit = () => {
        trRef.current?.nodes(nodes as any);
        trRef.current?.getLayer()?.batchDraw();
    }

    // when user press delte btn then delete 
    // useEffect(() => {
    //     const handleDelete = (e: any) => {
    //         if (e.keyCode === 46) {
    //             console.log('delete');
    //             console.log(e);
    //             const stage = e.target.getStage();
    //             const selectedNode = stage.findOne(`#${selectedId}`);
    //             selectedNode?.destroy();
    //             layerRef.current?.batchDraw();
    //         }
    //     };
    //     window.addEventListener('keydown', handleDelete);
    //     return () => {
    //         window.removeEventListener('keydown', handleDelete);
    //     };
    // }, [selectedId]);

    return (
        <div className="max-w-[500px] mx-auto"
        >
            <button
                onClick={save}
            >
                Save
            </button>
            <button
                onClick={edit}
            >
                Edit
            </button>
            <Stage
                width={500}
                height={500}
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
                        ref={shapRef}
                        id="tshirt"
                    />
                    {
                        (
                            <Transformer
                                ref={trRef}
                                boundBoxFunc={(oldBox: any, newBox: any) => {
                                    if (newBox.width < 5 || newBox.height < 5) {
                                        return oldBox;
                                    }
                                    return newBox;
                                }}
                                onTransformEnd={() => {
                                    const node = shapRef.current;
                                    const scaleX = node?.scaleX();
                                    const scaleY = node?.scaleY();

                                    node?.scaleX(1);
                                    node?.scaleY(1);
                                    node?.width(node?.width()! * scaleX!);
                                    node?.height(node?.height()! * scaleY!);

                                    node?.x(node?.x()! + (node?.width()! * scaleX! - node?.width()!) / 2);
                                    node?.y(node?.y()! + (node?.height()! * scaleY! - node?.height()!) / 2);

                                    node?.scaleX(1);
                                    node?.scaleY(1);

                                    layerRef.current?.batchDraw();


                                }}
                                // onTap={() => {
                                //     console.log('drag end');
                                // }}
                            />
                        )
                    }
                </Layer>
            </Stage>
        </div>
    );
}

export default CustomizeImage;