// components/UploadButton.tsx
"use client";

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const MyUploader = () => {
  return (
    <UploadButton<OurFileRouter, "imageUploader">
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        console.log("Файлы загружены:", res);
      }}
      onUploadError={(error) => {
        console.error("Ошибка загрузки:", error);
      }}
    />
  );
};
