"use client";

import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { X, RotateCcw, RotateCw, Crop } from "lucide-react";

interface ImageCropperProps {
  image: string;
  onCropComplete: (croppedImage: Blob) => void;
  onCancel: () => void;
}

export default function ImageCropper({ image, onCropComplete, onCancel }: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const ASPECT_RATIO = 1 / 1; // Updated to Square for better viewport fit
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropChange = (crop: any) => setCrop(crop);
  const onZoomChange = (zoom: number) => setZoom(zoom);
  const onRotationChange = (rotation: number) => setRotation(rotation);

  const onCropCompleteInternal = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous");
      image.src = url;
    });

  const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: any,
    rotation: number = 0
  ): Promise<Blob | null> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) return null;

    const rotRad = (rotation * Math.PI) / 180;
    const { width: bWidth, height: bHeight } = {
      width: Math.abs(Math.cos(rotRad) * image.width) + Math.abs(Math.sin(rotRad) * image.height),
      height: Math.abs(Math.sin(rotRad) * image.width) + Math.abs(Math.cos(rotRad) * image.height),
    };

    canvas.width = bWidth;
    canvas.height = bHeight;

    ctx.translate(bWidth / 2, bHeight / 2);
    ctx.rotate(rotRad);
    ctx.translate(-image.width / 2, -image.height / 2);
    ctx.drawImage(image, 0, 0);

    const data = ctx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height);

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    ctx.putImageData(data, 0, 0);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/jpeg");
    });
  };

  const handleConfirm = async () => {
    try {
      if (croppedAreaPixels) {
        const croppedBlob = await getCroppedImg(image, croppedAreaPixels, rotation);
        if (croppedBlob) {
          onCropComplete(croppedBlob);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2">
            <h3 className="text-gray-900 font-bold text-lg">Format for Site</h3>
            <span className="bg-teal-50 text-teal-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">1:1 Square Ratio Locked</span>
          </div>
          <button onClick={onCancel} className="p-1 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
            <X size={20} />
          </button>
        </div>

        {/* Top Controls */}
        <div className="flex items-center justify-center gap-8 p-3 bg-white border-b border-gray-100">
          <button 
            onClick={() => setRotation(rotation - 90)}
            className="p-2 hover:bg-gray-100 rounded-full text-teal-600 transition-colors"
            title="Rotate Left"
          >
            <RotateCcw size={22} />
          </button>
          <div className="p-2 text-teal-600">
            <Crop size={22} />
          </div>
          <button 
            onClick={() => setRotation(rotation + 90)}
            className="p-2 hover:bg-gray-100 rounded-full text-teal-600 transition-colors"
            title="Rotate Right"
          >
            <RotateCw size={22} />
          </button>
          <button 
            onClick={handleConfirm}
            className="ml-auto text-sm font-semibold text-teal-600 hover:text-teal-700 uppercase tracking-wider"
          >
            Done
          </button>
        </div>

        {/* Cropping Area */}
        <div className="relative flex-1 min-h-[400px] bg-gray-100">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={ASPECT_RATIO}
            onCropChange={onCropChange}
            onCropComplete={onCropCompleteInternal}
            onZoomChange={onZoomChange}
            onRotationChange={onRotationChange}
          />
        </div>

        {/* Bottom Area */}
        <div className="p-6 space-y-6">
          {/* Zoom Slider */}
          <div className="flex flex-col gap-2 max-w-xs mx-auto">
            <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold text-gray-400">
                <span>Zoom Level</span>
                <span>{Math.round(zoom * 100)}%</span>
            </div>
            <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-100 rounded-full appearance-none cursor-pointer accent-teal-600"
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onCancel}
              className="flex-1 py-3 px-6 bg-gray-200 text-gray-700 font-bold rounded hover:bg-gray-300 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 py-3 px-6 bg-[#006684] text-white font-bold rounded hover:bg-[#005570] transition-colors text-sm"
            >
              Apply & Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
