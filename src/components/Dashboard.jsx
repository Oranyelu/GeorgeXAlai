import React from "react";
import Layout from "./Layout";

const Dashboard = () => {
  return (
      <Layout>
      <div className="max-w-5xl mx-auto mt-20">
        <h2 className="text-3xl font-bold text-center">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white p-4 shadow rounded">[My Tributes]</div>
          <div className="bg-white p-4 shadow rounded">[Analytics]</div>
          <div className="bg-white p-4 shadow rounded">[Account Settings]</div>
        </div>
      </div>
      </Layout>
  );
};

export default Dashboard;
