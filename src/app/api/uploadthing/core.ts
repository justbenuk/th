import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError, UTApi } from "uploadthing/server";

const f = createUploadthing();

export const utapi = new UTApi();

export const ourFileRouter = {
  businessImageUploader: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 10,
    },
  })
    .middleware(async () => {
      // Replace with your authentication system.
      const session = await auth.api.getSession({
        headers: await headers(),
      });
      if (!session?.user) throw new UploadThingError("Unauthorized");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const user = await db.user.findUnique({
        where: {
          id: metadata.userId,
        },
      });

      if (!user) {
        throw new UploadThingError("User not found");
      }

      return { url: file.ufsUrl };
    }),
  profileUploader: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 10,
    },
  })
    .middleware(async () => {
      // Replace with your authentication system.
      const session = await auth.api.getSession({
        headers: await headers(),
      });
      if (!session?.user) throw new UploadThingError("Unauthorized");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const user = await db.user.findUnique({
        where: {
          id: metadata.userId,
        },
      });

      if (!user) {
        throw new UploadThingError("User not found");
      }

      const oldImage = user.image;

      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          image: file.ufsUrl,
        },
      });

      if (oldImage) {
        const fileKey = new URL(oldImage).pathname.split("/").pop()!;
        await utapi.deleteFiles(fileKey);
      }

      revalidatePath("/profile");
      return { url: file.ufsUrl };
    }),

  mediaUploader: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 10,
    },
  })
    .middleware(async () => {
      // Replace with your authentication system.
      const session = await auth.api.getSession({
        headers: await headers(),
      });
      if (!session?.user) throw new UploadThingError("Unauthorized");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ file }) => {
      const media = await db.media.create({
        data: {
          name: file.name,
          url: file.ufsUrl,
          fileKey: file.key,
          mimeType: file.type,
          size: file.size,
        },
      });
      revalidatePath("/portal/media");
      return { mediaId: media.id };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
