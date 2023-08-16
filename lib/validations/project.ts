import * as z from "zod";

export const ProjectValidation = z.object({
  profile_photo: z.string().url().nonempty(),
  description: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
  accountId: z.string(),
  name: z
  .string()
  .min(3, { message: "Minimum 3 characters." })
  .max(30, { message: "Maximum 30 caracters." }),

  category: z
  .string()
  .min(3, { message: "Minimum 3 characters." })
  .max(100, { message: "Maximum 100 caracters." }),
  subCategory: z
  .string()
  .min(3, { message: "Minimum 3 characters." })
  .max(100, { message: "Maximum 100 caracters." }),
});

export const CommentValidation = z.object({
  project: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
});
