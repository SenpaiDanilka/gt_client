import {useNavigate, useParams} from "react-router-dom";
import BaseContainer from "../components/BaseComponents/BaseContainer";
import BaseAvatar from "../components/BaseComponents/BaseAvatar";
import {useQuery, useMutation} from '@apollo/client';
import {DELETE_ITEM, FIND_ITEM_BY_ID} from "../services/ItemsService";
import BaseButton from "../components/BaseComponents/BaseButton";
import {useTranslation} from "react-i18next";
import {useEffect} from "react";
import {useLoading} from "../contexts/LoadingContext";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';

export default function Item() {
  const {id} = useParams();
  const navigate = useNavigate();
  const {data, loading: itemLoading, error: itemsError} = useQuery(FIND_ITEM_BY_ID, {
    variables: {
      id: id
    }
  });
  const [deleteItem, {loading: deleteLoading, error: deleteError}] = useMutation(DELETE_ITEM);
  const {setLoading, setAlertData} = useLoading();

  useEffect(() => {
    setLoading(itemLoading || deleteLoading);
    return () => setLoading(false);
  }, [itemLoading, deleteLoading]);

  useEffect(() => {
    (itemsError || deleteError) && setAlertData({
      isOpen: true,
      text: 'Smth went wrong',
      type: 'error'
    });
  }, [itemsError, deleteError]);

  const handleDeleteItem = () => {
    deleteItem({
      variables: {
        id: id
      }
    }).then(() => {
      setAlertData({
        isOpen: true,
        text: 'Item has been deleted',
        type: 'success'
      });
      navigate(-1);
    })
  };

  const handleEditItem = () => {

  };

  return (
    <BaseContainer className="p-4 mx-auto my-4 max-w-[700px] min-h-[400px] relative">
      {
        data && data.findItemByID &&
        <>
          <div className="flex justify-between items-center w-full">
            <BaseAvatar
              alt={data.findItemByID.name}
              size={60}
              variant="square"
              className="mr-4"
            />
            <div className="flex flex-col flex-1 space-y-4">
              <span>{data.findItemByID.name}</span>
              <span>{data.findItemByID.type}</span>
            </div>
          </div>
          {
            data.findItemByID.description &&
            <p className="my-4">{data.findItemByID.description}</p>
          }
          <Controls
            onDelete={handleDeleteItem}
            onEdit={handleEditItem}
          />
        </>
      }
    </BaseContainer>
  );
}

interface ControlsProps {
  onDelete: () => void;
  onEdit: () => void;
}

const Controls = ({
  onDelete,
  onEdit
}: ControlsProps) => {
  const {t} = useTranslation('common');

  return (
    <div className="absolute top-5 right-5">
      <Tooltip title={t('edit')}>
        <BaseButton
          buttonType="icon"
          variant="contained"
          size="medium"
          onClick={onEdit}
        >
          <EditIcon />
        </BaseButton>
      </Tooltip>
      <Tooltip title={t('delete')}>
        <BaseButton
          buttonType="icon"
          variant="contained"
          size="medium"
          onClick={onDelete}
        >
          <DeleteIcon />
        </BaseButton>
      </Tooltip>
    </div>
  );
};