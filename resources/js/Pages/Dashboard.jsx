import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayoutEdited";
import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function Dashboard({ auth }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingComment, setEditingComment] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        body: "",
    });

    const isAuthenticated = auth && auth.user;
    const Layout = isAuthenticated ? AuthenticatedLayout : GuestLayout;

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                "https://jsonplaceholder.typicode.com/comments?_limit=20"
            );
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.error("Error fetching comments:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            alert("Anda harus login untuk melakukan operasi ini.");
            return;
        }

        if (editingComment) {
            const updatedComment = {
                ...editingComment,
                name: formData.name,
                email: formData.email,
                body: formData.body,
            };

            setComments(
                comments.map((comment) =>
                    comment.id === editingComment.id ? updatedComment : comment
                )
            );
        } else {
            const newComment = {
                id: Date.now(),
                postId: 1,
                name: formData.name,
                email: formData.email,
                body: formData.body,
            };

            setComments([newComment, ...comments]);
        }

        setFormData({ name: "", email: "", body: "" });
        setEditingComment(null);
        setShowModal(false);
    };

    const handleDelete = async (commentId) => {
        if (!isAuthenticated) {
            alert("Anda harus login untuk menghapus comment.");
            return;
        }

        if (confirm("Apakah Anda yakin ingin menghapus comment ini?")) {
            try {
                await fetch(
                    `https://jsonplaceholder.typicode.com/comments/${commentId}`,
                    {
                        method: "DELETE",
                    }
                );
                setComments(
                    comments.filter((comment) => comment.id !== commentId)
                );
            } catch (error) {
                console.error("Error deleting comment:", error);
            }
        }
    };

    const handleEdit = (comment) => {
        if (!isAuthenticated) {
            alert("Anda harus login untuk mengedit comment.");
            return;
        }

        setEditingComment(comment);
        setFormData({
            name: comment.name,
            email: comment.email,
            body: comment.body,
        });
        setShowModal(true);
    };

    const handleAddNew = () => {
        if (!isAuthenticated) {
            alert("Anda harus login untuk menambah comment.");
            return;
        }

        setEditingComment(null);
        setFormData({ name: "", email: "", body: "" });
        setShowModal(true);
    };

    return (
        <Layout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 w-full">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-lg font-medium">
                                        Comments List
                                    </h3>
                                    {!isAuthenticated && (
                                        <p className="text-sm text-gray-500 mt-1">
                                            <a href="/login" className="text-blue-700 underline">Login</a> untuk
                                            menambah, edit, atau hapus comment
                                        </p>
                                    )}
                                </div>
                                {isAuthenticated && (
                                    <button
                                        onClick={handleAddNew}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Add New Comment
                                    </button>
                                )}
                            </div>
                            {loading ? (
                                <div className="text-center py-8">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                                    <p className="mt-2">Loading comments...</p>
                                </div>
                            ) : (
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {comments.map((comment) => (
                                        <div
                                            key={comment.id}
                                            className="border rounded-lg p-4 shadow-sm"
                                        >
                                            <div className="mb-2">
                                                <h4 className="font-semibold text-sm text-blue-600">
                                                    {comment.name}
                                                </h4>
                                                <p className="text-xs text-gray-500">
                                                    {comment.email}
                                                </p>
                                            </div>
                                            <p className="text-sm text-gray-700 mb-3 line-clamp-3">
                                                {comment.body}
                                            </p>
                                            {isAuthenticated && (
                                                <div className="flex justify-end space-x-2">
                                                    <button
                                                        onClick={() =>
                                                            handleEdit(comment)
                                                        }
                                                        className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-2 py-1 rounded"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                comment.id
                                                            )
                                                        }
                                                        className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {showModal && (
                                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                                        <div className="mt-3">
                                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                                {editingComment
                                                    ? "Edit Comment"
                                                    : "Add New Comment"}
                                            </h3>
                                            <form onSubmit={handleSubmit}>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                        Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={formData.name}
                                                        onChange={(e) =>
                                                            setFormData({
                                                                ...formData,
                                                                name: e.target
                                                                    .value,
                                                            })
                                                        }
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                        Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={(e) =>
                                                            setFormData({
                                                                ...formData,
                                                                email: e.target
                                                                    .value,
                                                            })
                                                        }
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                        Comment
                                                    </label>
                                                    <textarea
                                                        value={formData.body}
                                                        onChange={(e) =>
                                                            setFormData({
                                                                ...formData,
                                                                body: e.target
                                                                    .value,
                                                            })
                                                        }
                                                        rows="4"
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                        required
                                                    />
                                                </div>
                                                <div className="flex justify-end space-x-2">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setShowModal(false)
                                                        }
                                                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                    >
                                                        {editingComment
                                                            ? "Update"
                                                            : "Save"}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
