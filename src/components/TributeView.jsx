import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import Layout from "./Layout";
import {
  WhatsappShareButton,
  TwitterShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  EmailShareButton,
  WhatsappIcon,
  TwitterIcon,
  FacebookIcon,
  LinkedinIcon,
  EmailIcon,
} from "react-share";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const TributeView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tribute, setTribute] = useState(null);
  const [loading, setLoading] = useState(true);
  const tributeRef = useRef();

  useEffect(() => {
    const fetchTribute = async () => {
      const { data, error } = await supabase
        .from("tributes")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) {
        setTribute(data);
      }
      setLoading(false);
    };

    fetchTribute();
  }, [id]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    } catch (error) {
      alert("Failed to copy link.");
    }
  };

  const handleDownload = async () => {
    const buttons = document.querySelectorAll(".no-print");
    buttons.forEach((btn) => (btn.style.display = "none"));

    const element = tributeRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save(`${tribute.name}_tribute.pdf`);

    buttons.forEach((btn) => (btn.style.display = "inline-block"));
  };

  if (loading)
    return (
      <Layout>
        <div className="text-center mt-20">Loading tribute...</div>
      </Layout>
    );

  if (!tribute)
    return (
      <Layout>
        <div className="text-center mt-20 text-red-500">
          Tribute not found.
        </div>
      </Layout>
    );

  const shareUrl = window.location.href;

  return (
    <Layout>
      <div
        ref={tributeRef}
        className="max-w-3xl mx-auto mt-20 p-6 shadow-md border border-gray-200 rounded-lg"
      >
        <h1 className="text-3xl font-bold mb-4">{tribute.name}</h1>
        <p className="text-lg text-gray-700 mb-2">
          <strong>Age:</strong> {tribute.age}
        </p>
        <p className="text-lg text-gray-700 mb-2">
          <strong>Relationship:</strong> {tribute.relationship}
        </p>
        <p className="text-gray-700 whitespace-pre-line mb-4">
          <strong>Memories:</strong> {tribute.memories}
        </p>
        {tribute.image && (
          <img
            src={tribute.image}
            alt={`${tribute.name}'s tribute`}
            className="mt-4 rounded-lg max-h-96 object-cover"
          />
        )}

        {/* Action Buttons */}
        <div className="no-print mt-6 flex flex-wrap gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Back to Dashboard
          </button>

          <button
            onClick={handleShare}
            className="bg-[#135B3A] text-white px-4 py-2 rounded hover:bg-green-800"
          >
            Copy Link
          </button>

          <button
            onClick={handleDownload}
            className="bg-[#A37E2C] text-white px-4 py-2 rounded hover:bg-yellow-800"
          >
            Download PDF
          </button>
        </div>

        {/* Social Sharing */}
        <div className="no-print mt-8 flex gap-4 flex-wrap">
          <WhatsappShareButton url={shareUrl}>
            <WhatsappIcon size={40} round />
          </WhatsappShareButton>
          <TwitterShareButton url={shareUrl}>
            <TwitterIcon size={40} round />
          </TwitterShareButton>
          <FacebookShareButton url={shareUrl}>
            <FacebookIcon size={40} round />
          </FacebookShareButton>
          <LinkedinShareButton url={shareUrl}>
            <LinkedinIcon size={40} round />
          </LinkedinShareButton>
          <EmailShareButton url={shareUrl}>
            <EmailIcon size={40} round />
          </EmailShareButton>
        </div>
      </div>
    </Layout>
  );
};

export default TributeView;
