// src/components/UserProfile.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import Layout from "./Layout";

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  if (!user) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <Layout>
      <div className="max-w-xl mx-auto mt-20 p-6 shadow-lg border rounded-lg">
        <h2 className="text-2xl font-bold mb-4">My Profile</h2>
        <div className="space-y-4">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Created At:</strong> {new Date(user.created_at).toLocaleString()}</p>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
