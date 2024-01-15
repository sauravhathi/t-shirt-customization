'use client'

import CustomizeImage from '@/components/CustomizeImage';
import React, { useState } from 'react';

export default function Home() {
  const [layerImage, setLayerImage] = useState<HTMLImageElement | null>(null);

  
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

      setLayerImage(image);
    });
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <CustomizeImage layerImage={layerImage} />
      <input
        type="file"
        onChange={handleImageUpload}
      />
    </div>
  )
}
