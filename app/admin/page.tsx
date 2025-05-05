"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // чтобы не редиректило автоматически
    })

    if (res?.error) {
      setError("Неверный email или пароль")
    } else {
      window.location.href = "/admin/dashboard"
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 via-blue-500 to-teal-400">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl space-y-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800">Добро пожаловать</h2>
        <p className="text-center text-gray-500">Пожалуйста, войдите в свой аккаунт</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition ease-in-out"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Пароль</label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition ease-in-out"
            />
          </div>
        </div>

        {error && <p className="text-center text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out"
        >
          Войти
        </button>

        <div className="text-center text-sm text-gray-600 mt-4">
          <p>Нет аккаунта? <a href="/signup" className="text-blue-600 hover:text-blue-700">Создать аккаунт</a></p>
        </div>
      </form>
    </div>
  )
}
