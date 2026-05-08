import { useEffect, useState } from "react";
import applicationApi from "../../api/endpoints/applications";
import DotLoader from "../../components/Loader";
import Button from "../../components/Button";

const RoleApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const res = await applicationApi.getAllApplications();
            setApplications(res.data.applications);
        } catch (error) {
            console.error("Error fetching applications:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        try {
            await applicationApi.approveApplication(id);
            fetchApplications();
        } catch (error) {
            alert("Failed to approve application");
        }
    };

    const handleReject = async (id) => {
        try {
            await applicationApi.rejectApplication(id);
            fetchApplications();
        } catch (error) {
            alert("Failed to reject application");
        }
    };

    if (loading) return <div className="p-6 flex items-center justify-center h-full"><DotLoader /></div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Role Applications</h1>
            
            {applications.length === 0 ? (
                <p className="text-gray-500">No applications found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                            <tr>
                                <th className="p-3 border-b border-gray-200 dark:border-gray-600">User</th>
                                <th className="p-3 border-b border-gray-200 dark:border-gray-600">Requested Role</th>
                                <th className="p-3 border-b border-gray-200 dark:border-gray-600">Business Name</th>
                                <th className="p-3 border-b border-gray-200 dark:border-gray-600">Details</th>
                                <th className="p-3 border-b border-gray-200 dark:border-gray-600">Status</th>
                                <th className="p-3 border-b border-gray-200 dark:border-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app) => (
                                <tr key={app.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <td className="p-3">
                                        <p className="font-semibold">{app.User?.name}</p>
                                        <p className="text-xs text-gray-500">{app.User?.email}</p>
                                    </td>
                                    <td className="p-3 font-medium">{app.requestedRole}</td>
                                    <td className="p-3">{app.businessName}</td>
                                    <td className="p-3 text-sm max-w-xs truncate" title={app.details}>{app.details}</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 rounded text-xs font-semibold
                                            ${app.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200' :
                                              app.status === 'Approved' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200' :
                                              'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200'}`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        {app.status === "Pending" && (
                                            <div className="flex gap-2">
                                                <Button onClick={() => handleApprove(app.id)} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-xs rounded">Approve</Button>
                                                <Button onClick={() => handleReject(app.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-xs rounded">Reject</Button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default RoleApplications;
