import React from "react";
import { useParams } from "react-router-dom";
import Layout from "./Layout";

const TributeRoom = () => {
  const { id } = useParams();

  return (
    <Layout>
     
      <div className="max-w-4xl mx-auto mt-20">
        <h2 className="text-3xl font-bold text-center">Tribute Room #{id}</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 shadow rounded">[Memorial content]</div>
          <div className="bg-white p-4 shadow rounded">
            [Guest messages/comments]
          </div>
        </div>
      </div>
     
    </Layout>
  );
};

export default TributeRoom;
