import React from "react";
import { useParams } from "react-router-dom";
import Layout from "./Layout";

const PDFExport = () => {
  const { id } = useParams();

  const handleExport = () => {
    console.log(`Exporting tribute ${id} as PDF`);
  };

  return (
    <Layout>
  

      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold mb-4">Export Tribute</h2>
        <button
          onClick={handleExport}
          className="bg-[#A37E2C] text-white px-6 py-2 rounded"
        >
          Download PDF
        </button>
      </div>
    </Layout>
  );
};

export default PDFExport;
