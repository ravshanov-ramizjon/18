// lib/uploadToStorage.ts
import { createUploadThing } from '@uploadthing/server';

export const uploadToSomeStorage = async (file: any) => {
  const uploadResult = await createUploadThing({
    file,
    storage: 's3', 
  });

  return uploadResult;
};
