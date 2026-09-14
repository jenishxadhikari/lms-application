import { z } from "zod"

const configSchema = z.object({
  apiUrl: z.url(),
  googleClientId: z.string().min(1, "Google Client ID is required"),
})

export const config = configSchema.parse({
  apiUrl: import.meta.env.VITE_API_URL,
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
})
