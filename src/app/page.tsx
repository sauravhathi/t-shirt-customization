'use client'

import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { MdSave, MdDeleteForever } from 'react-icons/md';
import { IoMdCloudUpload } from "react-icons/io";
const CustomizeImage = dynamic(() => import('@/components/CustomizeImage'), { ssr: false });
const CustomizeImageBtn = dynamic(() => import('@/components/CustomizeImageBtn'), { ssr: false });
const CustomizeImageFileUpload = dynamic(() => import('@/components/CustomizeImageFileUpload'), { ssr: false });
const CustomizeImagePreview = dynamic(() => import('@/components/CustomizeImagePreview'), { ssr: false });

export default function Home() {
  const [activeSide, setActiveSide] = useState('front');
  const [layerImageFront, setLayerImageFront] = useState<HTMLImageElement | null>(null);
  const [layerImageBack, setLayerImageBack] = useState<HTMLImageElement | null>(null);
  const [actionType, setActionType] = useState<'delete-front' | 'delete-back' | 'download-front' | 'download-back' | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      const image = new window.Image();
      if (event.target) {
        image.src = event.target.result as string;
      }

      if (e.target.name === 'front') {
        setLayerImageFront(image);
      } else {
        setLayerImageBack(image);
      }
    }
    );
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 min-h-screen py-2">
      <div className="flex flex-col md:flex-row gap-5 p-5 max-w-xl">
        <div className="flex md:flex-col gap-2 w-20 md:w-full">
          <CustomizeImageBtn onClick={() => setActiveSide('front')} title="Front" className="font-semibold">Front</CustomizeImageBtn>
          <CustomizeImageBtn onClick={() => setActiveSide('back')} title="Back" className="font-semibold">Back</CustomizeImageBtn>
          <CustomizeImageBtn onClick={() => setActionType('delete-' + activeSide as any)} title="Delete" className="flex items-center justify-center"><MdDeleteForever size={20} /></CustomizeImageBtn>
          <CustomizeImageBtn onClick={() => setActionType('download-' + activeSide as any)} title="Download" className="flex items-center justify-center"><MdSave size={20} /></CustomizeImageBtn>
          {
            layerImageFront && <CustomizeImagePreview image={layerImageFront} />
          }
          {
            layerImageBack && <CustomizeImagePreview image={layerImageBack} />
          }
        </div>
        <div className="flex-1 flex flex-col gap-5">
          <div className={activeSide === 'front' ? '' : 'hidden'}>
            <CustomizeImage
              layerImage={layerImageFront}
              side={`./${activeSide}.svg`}
              actionType={actionType}
              type="front"
            />
          </div>
          <div className={activeSide === 'back' ? '' : 'hidden'}>
            <CustomizeImage
              layerImage={layerImageBack}
              side={`./${activeSide}.svg`}
              actionType={actionType}
              type="back"
            />
          </div>
          <CustomizeImageFileUpload onChange={handleImageUpload} title="Upload" name={activeSide}>
            <IoMdCloudUpload size={20} />
          </CustomizeImageFileUpload>
        </div>
      </div>
      <p
        className="text-sm text-gray-500 px-2 md:px-0 text-center"
        title="Created by Saurav Hathi"
      >
        T-Shirt Customization tool made with <a href="https://konvajs.org/" target="_blank" rel="noopener noreferrer" className="underline">Konva.js</a> and <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" className="underline">Next.js</a> by <a href="lkjnjn" target="_blank" rel="noopener noreferrer" className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 font-bold">Saurav Hathi</a>
      </p>
    </div >
  )
}