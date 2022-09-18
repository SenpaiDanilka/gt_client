import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import BaseContainer from "../components/BaseComponents/BaseContainer";
import BaseAvatar from "../components/BaseComponents/BaseAvatar";
import ItemsService from "../services/ItemsService";
import {Item as ItemClass} from "../models/ItemsModels";

export default function Item() {
  const { id } = useParams();
  const [item, setItem] = useState(new ItemClass());

  useEffect(() => {
    ItemsService.getItem(id!)
      .then((res) => setItem(res));
  }, [id]);

  return (
    <div className="p-4">
      <p className="text-3xl font-bold mb-4">{ `Item ${item.id}` }</p>
      <BaseContainer className="p-4">
        <div className="flex justify-between items-center w-full">
          <BaseAvatar
            alt={item.name}
            size={40}
            variant="square"
            className="mr-2"
          />
          <div className="flex flex-col flex-1">
            <span>{item.name}</span>
            <span>{item.type}</span>
          </div>
        </div>
        <p className="my-4">{item.desc}</p>
        <div>
          Spaces Table
        </div>
      </BaseContainer>
    </div>
  );
}