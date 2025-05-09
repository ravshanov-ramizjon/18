import { createUploadthing, type FileRouter } from "uploadthing/server";

// Определим наш файл роутер для загрузки изображений
const f = createUploadthing();

export const ourFileRouter = {
  // Указываем тип для загрузки изображений
  productImage: f({
    image: {
      maxFileSize: "4MB",
      additionalProperties: {
        allowedFileTypes: ["image/jpeg", "image/png", "image/webp", "image/svg"], // Поддерживаемые типы изображений
      },
    },
  }).onUploadComplete(async ({ file }) => {
    console.log("Загружен файл:", file.url);
    // Тут можно отправить url на сервер для сохранения в БД
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
