import { useEffect, useState } from "react";
import { Eye, EyeOff, Pencil } from "lucide-react";
import userApi from "../api/endpoints/users";
import Input from "../components/Input";
import Button from "../components/Button";
import authApi from "../api/endpoints/auth";
import applicationApi from "../api/endpoints/applications";
import { Avatars } from '../constants/avatars'
import DotLoader from "../components/Loader";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({});
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const [myApplication, setMyApplication] = useState(null)
  const [showAppModal, setShowAppModal] = useState(false)
  const [appForm, setAppForm] = useState({ requestedRole: 'Organizer', businessName: '', details: '' })
  const [appLoading, setAppLoading] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      try {
        const [res, appRes] = await Promise.all([
            authApi.me(),
            applicationApi.getMyApplication()
        ]);
        setUser(res.data.user);
        setForm(res.data.user);
        setMyApplication(appRes.data.application);
      } catch (err) {
        console.error("Error loading profile data:", err);
      }
    };
    getUser();
  }, []);

  if (!user) return <div className="p-6 flex items-center justify-center h-full"><DotLoader /></div>;

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

  const handleApplyRole = async (e) => {
    e.preventDefault();
    setAppLoading(true);
    try {
        const res = await applicationApi.applyForRole(appForm);
        setMyApplication(res.data.application);
        setShowAppModal(false);
    } catch (err) {
        console.error("Application error:", err);
        alert(err.response?.data?.message || "Failed to submit application");
    } finally {
        setAppLoading(false);
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

      {/* Role Application Section */}
      {user.role === "User" && (
        <div className="mt-12 w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-2">Grow with EventOn</h3>
          
          {myApplication ? (
            <div className={`p-4 rounded-lg mt-4 ${
              myApplication.status === "Pending" ? "bg-yellow-50 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-800" :
              myApplication.status === "Approved" ? "bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-200 border border-green-200 dark:border-green-800" :
              "bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-200 border border-red-200 dark:border-red-800"
            }`}>
              <p className="font-medium">Application Status: {myApplication.status}</p>
              <p className="text-sm mt-1">Requested Role: {myApplication.requestedRole}</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Want to host events or list your venue? Apply for a professional role.
              </p>
              <Button 
                onClick={() => setShowAppModal(true)}
                className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition"
              >
                Apply for a Role
              </Button>
            </>
          )}
        </div>
      )}

      {/* Application Modal */}
      {showAppModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-md animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-bold mb-4">Apply for a Role</h2>
            <form onSubmit={handleApplyRole} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Select Role</label>
                <select 
                  className="w-full border border-gray-300 dark:border-gray-600 bg-transparent rounded-lg px-4 py-2 focus:outline-none"
                  value={appForm.requestedRole}
                  onChange={(e) => setAppForm({...appForm, requestedRole: e.target.value})}
                  required
                >
                  <option value="Organizer">Event Organizer</option>
                  <option value="VenueOwner">Venue Owner</option>
                </select>
              </div>
              
              <Input 
                name="businessName" 
                label="Company / Business Name" 
                placeholder="e.g. Acme Events"
                value={appForm.businessName}
                onChange={(e) => setAppForm({...appForm, businessName: e.target.value})}
                required
              />
              
              <div>
                <label className="block text-sm font-medium mb-1">Details & Experience</label>
                <textarea 
                  className="w-full border border-gray-300 dark:border-gray-600 bg-transparent rounded-lg px-4 py-2 focus:outline-none min-h-[100px]"
                  placeholder="Tell us about your experience or your venue..."
                  value={appForm.details}
                  onChange={(e) => setAppForm({...appForm, details: e.target.value})}
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button 
                  type="button"
                  onClick={() => setShowAppModal(false)}
                  className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={appLoading}
                  className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
                >
                  {appLoading ? 'Submitting...' : 'Submit Application'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Profile;
