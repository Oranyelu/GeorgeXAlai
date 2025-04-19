import React, { useState } from "react";
import Layout from "./Layout";

const PaymentForm = () => {
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Processing payment of ₦${amount}`);
  };

  return (
    <Layout>
      
      <div className="max-w-md mx-auto mt-20 p-6 shadow-lg border border-gray-200 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Support George X Alai</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter amount (₦)"
            required
          />
          <button
            type="submit"
            className="bg-[#135B3A] text-white px-4 py-2 rounded"
          >
            Donate
          </button>
        </form>
      </div>
      
    </Layout>
  );
};

export default PaymentForm;
