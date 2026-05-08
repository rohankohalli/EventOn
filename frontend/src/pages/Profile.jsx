import { useEffect, useState } from "react";
import { Eye, EyeOff, Pencil } from "lucide-react";
import userApi from "../api/endpoints/users";
import Input from "../components/Input";
import Button from "../components/Button";
import authApi from "../api/endpoints/auth";
import { Avatars } from '../constants/avatars'
import DotLoader from "../components/Loader";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({});
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await authApi.me();
        setUser(res.data.user);
        setForm(res.data.user);
      } catch (err) {
        console.error("Error loading profile:", err);
      }
    };
    getUser();
  }, []);

  if (!user) return <div className="p-6 flex items-center justify-between"><DotLoader /></div>;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      if (form.password && form.password !== form.confirmPassword) {
        return alert("Passwords do not match");
      }
      const payload = { ...form }
      delete payload.confirmPassword

      if (!payload.password) delete payload.password

      const res = await userApi.updateUser(payload);
      setUser(res.data.user);
      setIsEditing(false);

      setForm(prev => ({ ...prev, password: "", confirmPassword: "" }))
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="flex flex-col items-center py-5">

      <div className="relative w-full max-w-md">

        <div className="absolute left-1/2 -top-4 -translate-x-1/2 z-20">
          <div className="w-28 h-28 rounded-full border-4 border-gray-400 dark:border-gray-600 overflow-hidden bg-gray-100 dark:bg-gray-800">
            <img src={Avatars[user.avatar]} className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="flip-container mt-12">
          <div className={`flip-inner ${isEditing ? "flipped" : ""}`}>

            <div className="flip-front bg-gray-100 dark:bg-gray-800 shadow-lg rounded-xl p-6">

              <div className="flex justify-end">
                <button onClick={() => setIsEditing(true)} className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition cursor-pointer">
                  <Pencil size={20} className="text-gray-700 dark:text-gray-300" />
                </button>
              </div>

              <h2 className="text-2xl font-semibold text-center mt-1">{user.name}</h2>

              <div className="space-y-3 mt-4">
                <p><span className="font-semibold">Email:</span> {user.email}</p>
                <p><span className="font-semibold">Date Of Birth:</span> {user.dateOfBirth}</p>
                <p><span className="font-semibold">Phone No:</span> {user.mobileNo}</p>
                <p><span className="font-semibold">Role:</span> {user.role}</p>
              </div>
            </div>

            <div className="flip-back bg-gray-100 dark:bg-gray-800 shadow-lg rounded-xl pt-12 pb-4 px-6">

              <h2 className="text-xl font-semibold text-center mb-4 mt-0">Edit Profile</h2>

              <div className="space-y-3">
                <Input name="name" value={form.name} onChange={handleChange} placeholder="Name" label={"Name:"} />

                <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email Id." label={"Email ID:"} />

                <Input name="mobileNo" type="number" value={form.mobileNo} onChange={handleChange} placeholder="Phone Number" label={"Phone Number"} />

                <Input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange}
                  label={"Date Of Birth:"} />

                <div className="relative">
                  <Input name="password" type={showPassword ? "text" : "password"} value={form.password} onChange={handleChange}
                    label={"Enter New Password"} />

                  <Button type="button" onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-2.5 h-full flex items-center text-gray-500 hover:text-gray-700">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </Button>
                </div>

                <div className="relative">
                  <Input name="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={form.confirmPassword}
                    onChange={handleChange} label={"Confirm New Password"} />

                  <Button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    title={showConfirmPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-2.5 h-full flex items-center text-gray-500 hover:text-gray-700">
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </Button>
                </div>

              </div>

              <div className="flex justify-between mt-6">
                <Button className="px-4 py-2 bg-gray-500 text-white rounded cursor-pointer"
                  onClick={() => setIsEditing(false)} >
                  Cancel
                </Button>

                <Button className="px-4 py-2 bg-green-600 text-white rounded cursor-pointer" onClick={handleSave}>
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
