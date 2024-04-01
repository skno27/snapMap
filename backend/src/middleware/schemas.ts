import z from "zod";
import { title } from "process";

const userLazy: z.ZodLazy<any> = z.lazy(() => User);
const chatLazy: z.ZodLazy<any> = z.lazy(() => Message);
const collectionLazy: z.ZodLazy<any> = z.lazy(() => Collection);
const fileLazy: z.ZodLazy<any> = z.lazy(() => File);

// User Schema
export const User = z.object({
  id: z.number().int().nonnegative().optional(),

  email: z.string().email(),
  username: z.string().min(5, "at least 5 chars").max(50, "at most 50 chars"),
  name: z.string(),
  password: z.string(),

  chatHistory: z.array(chatLazy).optional(),
  collections: z.array(collectionLazy).optional(),
});

export const UserUpdate = User.partial();

export const Message = z.object({
  id: z.number().int().nonnegative().optional(),
  userId: z.number().int().nonnegative().optional(),
  isSender: z.boolean().optional(),
  body: z.string(),
  source: z.string(),
  createdAt: z.date().optional(),
  uploadedAt: z.date().optional(),
  owner: userLazy.optional(),
});

export const Collection = z.object({
  id: z.number().int().nonnegative().optional(),
  userId: z.number().int().nonnegative().optional(),
  title: z
    .union([z.literal("Saved Chat Files"), z.literal("Memories")])
    .optional(),
  files: z.array(fileLazy).optional(),
  owner: userLazy.optional(),
});

export const File = z.object({
  id: z.number().int().nonnegative().optional(),
  collectionId: z.number().int().nonnegative().optional(),
  type: z.union([z.literal("Photo"), z.literal("Video")]).optional(),
  createdAt: z.date().optional(),
  uploadedAt: z.date().optional(),
  collection: collectionLazy.optional(),
});
