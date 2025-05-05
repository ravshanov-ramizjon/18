// app/api/uploadthing/route.ts
import { createRouteHandler } from "uploadthing/next";
import { OurFileRouter } from "@/app/api/uploadthing/core";

export const { GET, POST } = createRouteHandler({
  router: OurFileRouter,
});
