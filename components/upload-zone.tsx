"use client";

import React, { useState, useRef } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, storage } from "@/lib/firebase";
import { Loader2, Upload, X } from "lucide-react";

interface UploadZoneProps {
  value: string[];
  onChange: (urls: string[]) => void;
}

export const UploadZone: React.FC<UploadZoneProps> = ({ value, onChange }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const compressImage = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let { width, height } = img;
          const max = 1200;
          if (width > max || height > max) {
            if (width > height) {
              height = Math.round((height * max) / width);
              width = max;
            } else {
              width = Math.round((width * max) / height);
              height = max;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) return reject(new Error("Canvas context failed"));
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("Blob empty"))), "image/webp", 0.8);
        };
        img.onerror = () => reject(new Error("Image load failed"));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error("File read failed"));
      reader.readAsDataURL(file);
    });
  };

  const handleFiles = async (files: FileList) => {
    const uid = auth.currentUser?.uid;
    if (!uid) return setError("You must be signed in to upload images.");
    setUploading(true);
    setError(null);
    const uploadedUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith("image/")) continue;
        const compressedBlob = await compressImage(file);
        const filename = `${Date.now()}-${file.name.replace(/\.[^/.]+$/, "")}.webp`;
        const storageRef = ref(storage, `properties/${uid}/${filename}`);
        await uploadBytes(storageRef, compressedBlob);
        const url = await getDownloadURL(storageRef);
        uploadedUrls.push(url);
      }
      onChange([...value, ...uploadedUrls]);
    } catch (err: any) {
      setError(err.message || "Failed to upload one or more images.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        className="w-full bg-zinc-950 border-2 border-dashed border-zinc-800 hover:border-emerald-800 rounded-xl p-8 transition-colors flex flex-col items-center justify-center cursor-pointer text-center min-h-[160px]"
      >
        <input
          type="file"
          ref={fileInputRef}
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files) handleFiles(e.target.files);
          }}
        />
        {uploading ? (
          <div className="flex flex-col items-center gap-2 text-zinc-400">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
            <p className="text-sm font-medium">Compressing & Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-zinc-400">
            <Upload className="h-8 w-8 text-zinc-500 mb-1" />
            <p className="text-sm font-medium text-zinc-200">Drag & drop luxury property images</p>
            <p className="text-xs text-zinc-500">Supports JPG, PNG (automatically WebP compressed)</p>
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {value.map((url, index) => (
            <div key={index} className="relative aspect-video bg-zinc-950 rounded-lg overflow-hidden border border-zinc-800">
              <img src={url} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(value.filter((_, i) => i !== index));
                }}
                className="absolute top-1 right-1 bg-red-950/80 hover:bg-red-900 border border-red-800 text-red-200 p-1 rounded-full cursor-pointer transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
