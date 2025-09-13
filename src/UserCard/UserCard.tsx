import React, { useState } from "react";
import "../index.css";

type User = {
    id: number;
    name: string;
    email:string;
    phone: string;
    website?: string;
};

interface Props {
    user: User;
}

const pastelColors = [
    "linear-gradient(135deg, #a5b4fc, #6366f1)",
    "linear-gradient(135deg, #fcd34d, #fbbf24)",
    "linear-gradient(135deg, #f9a8d4, #f472b6)",
    "linear-gradient(135deg, #6ee7b7, #34d399)",
    "linear-gradient(135deg, #93c5fd, #3b82f6)",
];

const UserCard: React.FC<Props> = ({ user }) => {
    const [expanded, setExpanded] = useState(false);
    const headerColor = pastelColors[user.id % pastelColors.length];
    const avatarLetter = user.name.charAt(0).toUpperCase();

    return (
        <div className="user-card" onClick={() => setExpanded(!expanded)}>
            <div className="card-header" style={{ background: headerColor }}>
                <div className="avatar">{avatarLetter}</div>
                <h2>{user.name}</h2>
            </div>

            <div className="card-body">
                <p>📧 {user.email}</p>
                {expanded && (
                    <div className="extra expanded">
                        <p>📱 {user.phone}</p>
                        {user.website && <p>🌐 {user.website}</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserCard;
