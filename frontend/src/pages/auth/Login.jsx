import { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import Input from '../../components/Input'
import Button from '../../components/Button'
import { EyeOff, Eye } from "lucide-react"

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const result = await login(form.email, form.password)
      if (result.success) {
        navigate("/home")
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:flex flex-col justify-center px-12 bg-linear-to-br from-blue-600 to-blue-500 text-white">
        <div className="-translate-y-8">
          <h1 className="text-4xl font-bold mb-4">Welcome back</h1>
          <p className="text-lg opacity-90 max-w-sm">
            Your events. Your venues. One platform — sign in to continue.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-6">
        <div className="p-6 w-full max-w-sm bg-white rounded-2xl shadow-lg">
          <h1 className="text-xl font-bold text-center mb-4">Login</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <Input name="email" type="email" value={form.email} onChange={handleChange}
              placeholder="Enter Your Email" pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$" required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none" />

            <div className="relative">
              <Input name="password" type={showPassword ? "text" : "password"} value={form.password} onChange={handleChange}
                placeholder="Enter Password" required
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none" />

              <Button type="button" onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-0 h-full flex items-center text-gray-500 hover:text-gray-700">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
            </div>

            <Button type="submit" className="bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600
                transition duration-200 cursor-pointer" children="Login" />
            <p className="text-sm text-gray-500 mt-4 flex gap-5">
              Don't have an account?
              <a href="/register" className="text-blue-600 hover:underline font-medium">
                Register
              </a>
              <a href="" className="text-blue-600 hover:underline font-medium">
                Reset password
              </a>
            </p>

          </form>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
