import React from "react";
import {useParams} from "react-router-dom";

export default function Space() {
  const { id } = useParams();

  return (
    <div className="p-4 bg-gray-100 h-screen w-screen">
      <p className="text-3xl font-bold">{ `Space ${id}` }</p>
    </div>
  );
}