// app/api/uploadthing/core.ts
import { createRouter } from '@uploadthing/server';
import { z } from 'zod';
import { uploadToSomeStorage } from '@/lib/uploadToStorage';  // Импортируем функцию для загрузки

export const OurFileRouter = createRouter()
  .mutation('imageUploader', {
    input: z.object({
      file: z.any(),  
    }),
    resolve: async ({ input }: { input: { file: any } }) => {
      const file = input.file;

      const uploadResult = await uploadToSomeStorage(file);

      return uploadResult;  
    },
  });
