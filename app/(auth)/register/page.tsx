import type { Metadata } from "next"

import RegisterForm from "@/components/auth/RegisterForm"
import { SITE } from "@/lib/site"

export const metadata: Metadata = {
  title: "Create account",
  description: `Create your ${SITE.name} account`,
}

const RegisterPage = () => {
  return <RegisterForm />
}

export default RegisterPage
