import {useParams} from "react-router-dom";
import BaseContainer from "../components/BaseComponents/BaseContainer";
import BaseAvatar from "../components/BaseComponents/BaseAvatar";
import {useQuery, useMutation} from '@apollo/client';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { DeleteItem, FindItemByID } from "../services/ItemsService";
import BaseButton from "../components/BaseComponents/BaseButton";
import {useTranslation} from "react-i18next";

export default function Item() {
  const {t} = useTranslation('common');
  const { id } = useParams();
  const {data, loading} = useQuery(FindItemByID, {
    variables: {
      id: id
    }
  })
  const [deleteItem] = useMutation(DeleteItem, {
    variables: {
      id: id
    }
  })

  return (
    <div className="p-4">
      {loading ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box> :
      <BaseContainer className="p-4">
        <div className="flex justify-between items-center w-full">
          <BaseAvatar
            alt={data.findItemByID.name}
            size={40}
            variant="square"
            className="mr-2"
          />
          <div className="flex flex-col flex-1">
            <span>{data.findItemByID.name}</span>
            <span>{data.findItemByID.type}</span>
          </div>
        </div>
        <p className="my-4">{data.findItemByID.description}</p>

        <BaseButton
          type="submit"
          variant="contained"
          size="medium"
          onClick={() => deleteItem()}
        >
          {t('delete')}
        </BaseButton>
      </BaseContainer>
      }
    </div>
  );
}