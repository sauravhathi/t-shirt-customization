'use client'

import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { MdSave, MdDeleteForever } from 'react-icons/md';
import { IoMdCloudUpload } from "react-icons/io";
const CustomizeImage = dynamic(() => import('@/components/CustomizeImage'), { ssr: false });

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
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col md:flex-row gap-5 p-5 max-w-md">
        <div className="flex md:flex-col gap-2 w-20 md:w-full">
          <CustomizeImageBtn onClick={() => setActiveSide('front')} title="Front" className="font-semibold">Front</CustomizeImageBtn>
          <CustomizeImageBtn onClick={() => setActiveSide('back')} title="Back" className="font-semibold">Back</CustomizeImageBtn>
          <CustomizeImageBtn onClick={() => setActionType('delete' + activeSide as any)} title="Delete" className="flex items-center justify-center"><MdDeleteForever size={20} /></CustomizeImageBtn>
          <CustomizeImageBtn onClick={() => setActionType('download' + activeSide as any)} title="Download" className="flex items-center justify-center"><MdSave size={20} /></CustomizeImageBtn>
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
    </div >
  )
}

const CustomizeImageBtn = ({ children, onClick, title, className }: { children: React.ReactNode, onClick: () => void, title: string, className?: string }) => {
  return (
    <button
      className={"border border-dashed border-blue-500 text-blue-500 px-4 py-2 rounded-md cursor-pointer " + className}
      onClick={onClick}
      title={title}
    >
      {children}
    </button>
  )
}

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