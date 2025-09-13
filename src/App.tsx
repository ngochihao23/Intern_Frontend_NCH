import { useState,  } from "react";
import "./App.css";

type User = {
    id: number;
    name: string;
    email: string;
    phone: string;
    website: string;
    avatar: string;
    color: string;
};

type FormData = {
    name: string;
    email: string;
    phone: string;
    website: string;
};

const UserDirectory = () => {
    const [users, setUsers] = useState<User[]>([
        {
            id: 1,
            name: "Nguyen Van A",
            email: "a@example.com",
            phone: "0123456789",
            website: "example.com",
            avatar: "N",
            color: "yellow",
        },
        {
            id: 2,
            name: "Tran Thi B",
            email: "b@example.com",
            phone: "0987654321",
            website: "example.org",
            avatar: "T",
            color: "pink",
        },
    ]);

    const [form, setForm] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        website: "",
    });

    const [editingId, setEditingId] = useState<number | null>(null);

    // 🔔 state cho toast
    const [toast, setToast] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 3000); // tự tắt sau 3s
    };

    const handleAdd = () => {
        if (!form.name) return;
        const newUser: User = {
            id: Date.now(),
            name: form.name,
            email: form.email,
            phone: form.phone,
            website: form.website,
            avatar: form.name.charAt(0).toUpperCase(),
            color: Math.random() > 0.5 ? "yellow" : "pink",
        };
        setUsers([...users, newUser]);
        setForm({ name: "", email: "", phone: "", website: "" });
        showToast("✅ Đã thêm user mới!");
    };

    const handleEdit = (user: User) => {
        setEditingId(user.id);
        setForm({
            name: user.name,
            email: user.email,
            phone: user.phone,
            website: user.website,
        });
    };

    const handleUpdate = () => {
        if (editingId === null) return;
        setUsers(
            users.map((u) =>
                u.id === editingId
                    ? {
                        ...u,
                        ...form,
                        avatar: form.name.charAt(0).toUpperCase(),
                    }
                    : u
            )
        );
        setForm({ name: "", email: "", phone: "", website: "" });
        setEditingId(null);
        showToast("💾 Cập nhật thành công!");
    };

    const handleDelete = (id: number) => {
        setUsers(users.filter((u) => u.id !== id));
        showToast("🗑️ Xóa thành công!");
    };

    return (
        <div className="user-directory">
            <h1 className="title">👥 User Directory</h1>

            {/* Form nhập */}
            <div className="form-box">
                <input
                    type="text"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                    type="tel"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                <input
                    type="url"
                    placeholder="Website"
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                />

                {editingId ? (
                    <button type="button" onClick={handleUpdate}>
                        💾 Update
                    </button>
                ) : (
                    <button type="button" onClick={handleAdd}>
                        ＋ Add
                    </button>
                )}
            </div>

            {/* Grid Cards */}
            <div className="user-grid">
                {users.map((user) => (
                    <div key={user.id} className="user-card">
                        <div className={`card-header ${user.color}`}>
                            <div className="avatar">{user.avatar}</div>
                            <h2>{user.name}</h2>
                        </div>
                        <div className="card-body">
                            <p>📧 {user.email}</p>
                            <p>📞 {user.phone}</p>
                            <p>🌐 {user.website}</p>
                        </div>
                        <div className="action-buttons">
                            <button className="edit" onClick={() => handleEdit(user)}>
                                ✏️ Edit
                            </button>
                            <button className="delete" onClick={() => handleDelete(user.id)}>
                                🗑️ Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Toast */}
            {toast && <div className="toast">{toast}</div>}
        </div>
    );
};

export default UserDirectory;
