// ✅ Global base URL for all API calls
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";



export async function signupUser(values: {
  name: string
  email: string
  phone: string
  password: string
}) {
  const res = await fetch(`${BASE_URL}/api/signup/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: values.name,
      email: values.email,
      phone: values.phone,
      password: values.password,
    }),
  })
  return res.json()
}

export async function verifyUserOtp(phone: string, otp: string) {
  const res = await fetch(`${BASE_URL}/api/verify/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, otp }),
  })
  return res.json()
}

export async function loginWithBackend(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/api/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: email,
      password,
    }),
  })
  return res.json()
}

export async function requestPasswordReset(identifier: string) {
  const res = await fetch(`${BASE_URL}/api/request-reset/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: identifier }),
  })
  return res.json()
}

export async function resetPassword(identifier: string, otp: string, newPassword: string) {
  const res = await fetch(`${BASE_URL}/api/reset-password/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: identifier, otp, new_password: newPassword }),
  })
  return res.json()
}

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/api/products/`)
  return res.json()
}
