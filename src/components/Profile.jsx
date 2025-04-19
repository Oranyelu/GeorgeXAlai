import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabase";
import { toast } from "react-hot-toast";
import Layout from "./Layout";

const Profile = () => {
  const { session, logout } = useAuth();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!session) return;

      setLoading(true);
      const { data, error } = await supabase
        .from("users")
        .select("name, email, image")
        .eq("id", session.user.id)
        .single();

      if (data) {
        setProfile(data);
      }

      if (error) {
        toast.error("Error fetching profile: " + error.message);
      }

      setLoading(false);
    };

    fetchProfile();
  }, [session]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from("users")
      .upsert({
        id: session.user.id,
        name: profile.name,
        image: profile.image,
      });

    if (error) {
      toast.error("Error updating profile: " + error.message);
    } else {
      toast.success("Profile updated successfully!");
    }

    setLoading(false);
  };

  const handleImageChange = (e) => {
    setProfile({ ...profile, image: e.target.files[0] });
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto mt-20 p-6 shadow-lg border border-gray-200 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">My Profile</h2>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={profile.email}
                disabled
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-semibold">
                Profile Image
              </label>
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <button
              type="submit"
              className="bg-[#A37E2C] text-white px-4 py-2 rounded"
            >
              Update Profile
            </button>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
