import {useState} from "react";
import BaseContainer from "../components/BaseComponents/BaseContainer";
import BaseAvatar from "../components/BaseComponents/BaseAvatar";
import {Item as ItemClass} from "../models/ItemsModels";
import BaseInput from "../components/BaseComponents/BaseInput";
import BaseButton from "../components/BaseComponents/BaseButton";
import {useTranslation} from "react-i18next";
import {gql, useMutation} from "@apollo/client";

const CreateItem = gql`
  mutation CreateItem($name: String!, $description: String!, $type: ItemType!, $owner: String! ) {
    createItem(name: $name, description: $description, type: $type, owner: $owner) {
      _id
      name
      description
      type
    }
  }
`;

export default function ItemNew() {
  const [createItemFunc, {data, loading, error}] = useMutation(CreateItem);
  const {t} = useTranslation('common');
  const [item, setItem] = useState(new ItemClass());

  const handleChange = (val: string, key: string) => {
    setItem({
      ...item,
      [key]: val
    });
  };

  const handleSave = () => {
    createItemFunc({
      variables: {
        name: item.name,
        description: item.description,
        type: item.type,
        owner: localStorage.getItem("userId")
      }
    })
    console.log(item, 'saved');
  };

  return (
    <div className="p-4">
      <p className="text-3xl font-bold mb-4">{ `Item ${item.id}` }</p>
      <BaseContainer className="p-4 flex flex-col items-center">
        <div className="flex justify-between items-center w-full">
          <BaseAvatar
            alt={item.name}
            size={40}
            variant="square"
            className="mr-2"
          />
          <div className="flex flex-col flex-1 space-y-4">
            <BaseInput
              label={t('name')}
              value={item.name}
              onChange={(val) => handleChange(val, "name")}
            />
            <BaseInput
              label="type"
              value={item.type}
              onChange={(val) => handleChange(val, "type")}
            />
          </div>
        </div>
        <BaseInput
          label="description"
          value={item.description}
          rows={4}
          multiline
          onChange={(val) => handleChange(val, "description")}
          className="my-4"
        />
        <BaseButton
          variant="contained"
          onClick={handleSave}
        >
          {t('save')}
        </BaseButton>
      </BaseContainer>
    </div>
  );
}