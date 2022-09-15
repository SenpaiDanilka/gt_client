import React, {ReactNode} from "react";
import BaseInput from "./BaseComponents/BaseInput";
import SearchIcon from "@mui/icons-material/Search";
import BaseButton from "./BaseComponents/BaseButton";
import AddIcon from "@mui/icons-material/Add";
import BaseContainer from "./BaseComponents/BaseContainer";

interface Props {
  searchValue: string;
  setSearchValue: (val: string) => void;
  onAddClick: () => void;
  list: ReactNode
}

const EditableListWithSearch: React.FC<Props> = ({
  searchValue,
  setSearchValue,
  onAddClick,
  list
}) => {
  const handleAddClick = () => {
    onAddClick();
    console.log('add item clicked')
  };

  return (
    <>
      <div className="flex items-center justify-center py-4">
        <BaseInput
          value={searchValue}
          onChange={setSearchValue}
          iconEnd={<SearchIcon fontSize="small"/>}
          className="mr-4 max-w-[700px]"
        />
        <BaseButton
          variant="contained"
          buttonType="icon"
          onClick={handleAddClick}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        >
          <AddIcon fontSize="small"/>
        </BaseButton>
      </div>
      <BaseContainer className="divide-y-2 max-w-[700px]">
        { list }
      </BaseContainer>
    </>
  );
}

export default EditableListWithSearch;