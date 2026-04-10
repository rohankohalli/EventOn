import { useNavigate, useSearchParams } from "react-router-dom";
import authApi from "../api/endpoints/auth";
import Input from "../components/Input";
import Button from "../components/Button";
import { useState } from "react";

const ResetPassword = () => {
    const [searchParams] = useSearchParams()
    const token = searchParams.get("token")
    const navigate = useNavigate()
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [confirm, setConfirm] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    if (!token) return <span>Invalid reset link</span>

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("")

        if (loading) return
        if (password !== confirm) return setError("Passwords do not match");

        try {
            await authApi.password_reset_req({token, newPassword: password})
            navigate("/login?reset=success");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally{
            setLoading(false)
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            
            <form onSubmit={handleSubmit}>
                <div className="relative">
                    <Input name="password" type={showPassword ? "text" : "password"} value={password} 
                        placeholder="Enter Password" required onChange={e => {setPassword(e.target.value) }}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none" />

                    <Button type="button" onClick={() => setShowPassword(!showPassword)}
                        title={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-3 top-0 h-full flex items-center text-gray-500 hover:text-gray-700">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </Button>
                </div>

                <div className="relative">
                    <Input name="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={confirm}
                        placeholder="Confirm the Password" required onChange={e => {setConfirm(e.target.value) }}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none" />

                    <Button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-0 h-full flex items-center text-gray-500 hover:text-gray-700">
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </Button>
                </div>
                
                <button type="submit" disabled={loading}>
                    {loading ? "Resetting..." : "Reset Password"}
                </button>
            </form>
            {error && <p>{error}</p>}
        </div>
    )
}

export default ResetPassword