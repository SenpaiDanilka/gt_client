import React from "react";
import {useParams} from "react-router-dom";

export default function Item() {
  const { id } = useParams();

  return (
    <div className="p-4">
      <p className="text-3xl font-bold">{ `Item ${id}` }</p>
    </div>
  );
}