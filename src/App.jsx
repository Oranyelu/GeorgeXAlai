// src/App.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow mt-[70px] px-6 py-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#135B3A] mb-6">
          Welcome to George X Alai
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
          A digital space to honor, celebrate, and immortalize the lives and legacies of your loved ones with heartfelt AI-powered tributes.
        </p>
        <div className="flex justify-center gap-6 flex-wrap">
          <Link
            to="/tribute-form"
            className="bg-[#A37E2C] text-white px-6 py-3 rounded hover:bg-[#8a671f] transition duration-300"
          >
            Create Tribute
          </Link>
          <Link
            to="/dashboard"
            className="border border-[#135B3A] text-[#135B3A] px-6 py-3 rounded hover:bg-[#135B3A] hover:text-white transition duration-300"
          >
            Visit Dashboard
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
