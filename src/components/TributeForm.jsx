import React, { useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Layout from "./Layout";

const TributeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    relationship: "",
    memories: "",
    image: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) =>
    setFormData({ ...formData, image: e.target.files[0] });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload image to Supabase Storage
      let imageUrl = null;
      if (formData.image) {
        const fileExt = formData.image.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `tributes/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("tributes")
          .upload(filePath, formData.image);

        if (uploadError) throw uploadError;

        // Get public URL
        const {
          data: { publicUrl },
        } = supabase.storage.from("tributes").getPublicUrl(filePath);

        imageUrl = publicUrl;
      }

      // Get current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      // Insert tribute into database
      const { data, error } = await supabase.from("tributes").insert([
        {
          name: formData.name,
          age: formData.age,
          relationship: formData.relationship,
          memories: formData.memories,
          image: imageUrl,
          user_id: user.id,
        },
      ]);

      if (error) throw error;

      toast.success("Tribute created successfully!");
      navigate(`/tribute/${data[0].id}`);
    } catch (error) {
      toast.error("Error creating tribute: " + error.message);
    }
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto mt-20 p-6 shadow-lg border border-gray-200 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Create a Tribute</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="relationship"
            placeholder="Relationship"
            value={formData.relationship}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="memories"
            placeholder="Memories & Achievements"
            value={formData.memories}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          ></textarea>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-[#A37E2C] text-white px-4 py-2 rounded"
          >
            Generate Tribute
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default TributeForm;
