import { useEffect, useState } from "react";
import usersApi from "../../api/endpoints/users";
import { useAuth } from "../../context/AuthContext";

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const { user: currentUser } = useAuth();

    const loadUsers = async () => {
        try {
            const res = await usersApi.getAll();
            setUsers(res.data);
        } catch (err) {
            console.error("Error loading users:", err);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const updateUser = async (id, updates) => {
        await usersApi.updateUser(id, updates);
        loadUsers();
    };

    const handleRoleChange = async (user, newRole) => {
        if (user.id === currentUser.id) {
            return alert("You cannot change your own role.");
        }

        if (user.role === "Admin" && newRole !== "Admin") {
            const admins = users.filter(u => u.role === "Admin");
            if (admins.length === 1) {
                return alert("You cannot remove the last Admin.");
            }
        }

        if (!window.confirm(`Change role for ${user.name} → ${newRole}?`)) return;

        if (newRole === "Admin") {
            if (!window.confirm("This grants full access. Proceed?")) return;
        }

        try {
            await updateUser(user.id, { role: newRole })
        } catch (err) {
            console.error(err);
            alert("Failed to update role. Please try again.");
        }
    }

    const handleDisable = async (id) => {
        if (!window.confirm("Disable this user?")) return;
        updateUser(id, { status: "Disabled" });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this user permanently?")) return;
        await usersApi.RemoveUser(id);
        loadUsers();
    };

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">User Management</h1>

            <div className="space-y-4">
                {users.map(user => (
                    <div key={user.id} className="p-4 bg-white rounded shadow space-y-2">

                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="font-semibold">{user.name}</h2>
                                <p className="text-sm text-gray-600">{user.email}</p>
                                <p className="text-sm text-gray-600">Role: {user.role}</p>
                            </div>

                            <div className="flex gap-3 text-sm">

                                {/* <select className="px-2 py-1 border bg-gray-100 rounded">
                                    <option value=""></option>
                                    <option value=""></option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select> */}

                                <select className="px-2 py-1 border bg-gray-300 rounded" value={user.role}
                                    onChange={(e) => handleRoleChange(user, e.target.value)}>
                                    <option value="User">User</option>
                                    <option value="Organizer">Organizer</option>
                                    <option value="VenueOwner">VenueOwner</option>
                                    <option value="Admin">Admin</option>
                                </select>

                                <button className="px-3 py-1 bg-orange-400 text-white text-base rounded cursor-pointer" 
                                    onClick={() => handleDisable(user.id)} >
                                    Disable
                                </button>

                                <button className="px-3 py-1 bg-red-600 text-white text-base rounded cursor-pointer" 
                                    onClick={() => handleDelete(user.id)} >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
