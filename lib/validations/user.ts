import * as z from "zod";

export const UserValidation = z.object({
  profile_photo: z.string().url().nonempty(),
  name: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(30, { message: "Maximum 30 caracters." }),
  username: z
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
  bio: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(1000, { message: "Maximum 1000 caracters." }),
});
