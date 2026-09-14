import { useAuth } from "@/auth"
import { GoogleLogin } from "@react-oauth/google"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"

export function GoogleAuthButton() {
  const { googleLogin } = useAuth()
  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationFn: googleLogin,
  })

  async function handleGoogleLogin(token: string) {
    mutate(token, {
      onSuccess: (data) => {
        toast.success(data.message ?? "Successfully logged in.")
        navigate({
          to: "/",
        })
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  }

  return (
    <GoogleLogin
      onSuccess={(response) => {
        if (!response.credential) {
          toast.error("Google authentication failed.")
          return
        }
        handleGoogleLogin(response.credential)
      }}
      onError={() => {
        toast.error("Google authentication failed.")
      }}
      theme="outline"
      size="large"
      shape="rectangular"
      text="signin_with"
      logo_alignment="center"
    />
  )
}
