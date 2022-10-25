import React, {ReactNode} from "react";
import BaseInput from "./BaseComponents/BaseInput";
import SearchIcon from "@mui/icons-material/Search";
import BaseContainer from "./BaseComponents/BaseContainer";
import AddButton from "./AddButton";

interface Props {
  searchValue: string;
  setSearchValue: (val: string) => void;
  onAddClick?: () => void;
  list: ReactNode
}

const EditableListWithSearch: React.FC<Props> = ({
  searchValue,
  setSearchValue,
  onAddClick,
  list
}) => {
  const handleAddClick = () => {
    onAddClick && onAddClick();
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
        {onAddClick && <AddButton onClick={handleAddClick}/>}
      </div>
      <BaseContainer className="divide-y-2 max-w-[700px]">
        { list }
      </BaseContainer>
    </>
  );
}

export default EditableListWithSearch;