import { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import Input from "../../components/Input"
import { Eye, EyeOff } from "lucide-react"
import Button from "../../components/Button"
import AppIcon from "../../components/Icon"

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', dateOfBirth: '', mobileNo: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { register } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match")
    }

    const { confirmPassword, ...payload } = form
    try {
      const result = await register(payload)
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
        <div className="-translate-y-9">
          <div className="flex items-center gap-3 mb-4">
             <AppIcon size={48} />
             <h1 className="text-4xl font-bold">EventOn</h1>
          </div>
          <p className="text-lg opacity-90 max-w-sm">
            Create your account and start managing events effortlessly.
          </p>
          <span className="font-extralight">
            Additional permissions can be granted by an administrator if needed.
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="p-10 w-full max-w-sm bg-white rounded-2xl shadow-lg">
          <h1 className="text-xl font-bold text-center mb-3 text-gray-800">Register</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input name="name" type="name" value={form.name} onChange={handleChange}
              placeholder="Enter Your Name" required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none" />

            <Input name="email" type="email" value={form.email} onChange={handleChange}
              placeholder="Enter Your Email" pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$" required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none" />

            <Input name="mobileNo" type="number" value={form.mobileNo} onChange={handleChange}
              placeholder="Enter Your Mobile No." required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none" />

            <Input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange}
              label="Enter Date of Birth" required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none" />

            <div className="relative">
              <Input name="password" type={showPassword ? "text" : "password"} value={form.password} onChange={handleChange}
                placeholder="Enter Password" required
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none" />

              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-0 h-full flex items-center text-gray-500 hover:text-gray-700">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="relative">
              <Input name="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={form.confirmPassword}
                onChange={handleChange} placeholder="Confirm the Password" required
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none" />

              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-0 h-full flex items-center text-gray-500 hover:text-gray-700">
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <Button type="submit" className="bg-emerald-600 text-white py-2 rounded-lg font-semibold hover:bg-emerald-700 
            transition duration-200 cursor-pointer" children="Register" />
            <p className="text-center text-sm text-gray-500 mt-4">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:underline font-medium">
                Login
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

export default Register