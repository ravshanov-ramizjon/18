// app/api/uploadthing/route.ts

import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// Uploadthing endpoint
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
