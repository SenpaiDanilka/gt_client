import {ClickAwayListener, Popper, styled, TextField} from "@mui/material";
import Autocomplete, {autocompleteClasses, AutocompleteCloseReason} from "@mui/material/Autocomplete";
import React from "react";
import BaseAvatar from "./BaseComponents/BaseAvatar";

export interface OptionsDataType {
  optionId: string;
  name: string;
  description?: string;
  type?: string;
  _id: string;
}

interface Props {
  options: OptionsDataType[]
  anchorEl: HTMLButtonElement | null,
  handleClose: () => void;
  handleSelect: (val: OptionsDataType | null) => void;
}

const PopperWithAutocomplete = ({
  anchorEl,
  handleClose,
  options,
  handleSelect
}: Props) => {
  const open = Boolean(anchorEl);
  const [selected, setSelected] = React.useState(null);

  return (
    <StyledPopper
      open={open}
      anchorEl={anchorEl}
      placement="bottom-start"
    >
      <ClickAwayListener onClickAway={() => {
        handleClose()
      }}>
        <Autocomplete
          open
          onClose={(
            e: React.ChangeEvent<{}>,
            reason: AutocompleteCloseReason,
          ) => {
            if (reason === 'escape') {
              handleClose();
            }
          }}
          value={selected}
          onChange={(
            event,
            newValue,
            reason
          ) => {
            if (
              event.type === 'keydown' &&
              (event as React.KeyboardEvent).key === 'Backspace' &&
              reason === 'removeOption'
            ) {
              return;
            }
            handleSelect(newValue);
            setSelected(null);
          }}
          PopperComponent={PopperComponent}
          noOptionsText="Nothing found"
          renderOption={(props, option) => (
            <li {...props}>
              <BaseAvatar
                alt={`Mocked User ${option.name}`}
                size={30}
                className="mr-2"
              />
              <span>{option.name}</span>
            </li>
          )}
          options={[...options]}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <StyledInput
              {...params}
              autoFocus
              placeholder="Available users"
            />
          )}
        />
      </ClickAwayListener>
    </StyledPopper>
  );
}

export default PopperWithAutocomplete;

interface PopperComponentProps {
  anchorEl?: Object | null;
  disablePortal?: boolean;
  open: boolean;
}

function PopperComponent(props: PopperComponentProps) {
  const {disablePortal, anchorEl, open, ...other} = props;
  return <StyledAutocompletePopper  {...other} />;
}

const StyledPopper = styled(Popper)(() => ({
  border: '1px solid #F3F4F6',
  boxShadow: '0 8px 24px rgba(149, 157, 165, 0.2)',
  borderRadius: 10,
  width: 300,
  zIndex: 1000,
  backgroundColor: '#fff'
}));

const StyledAutocompletePopper = styled('div')(() => ({
  [`& .${autocompleteClasses.paper}`]: {
    boxShadow: 'none'
  },
  [`& .${autocompleteClasses.listbox}`]: {
    [`& .${autocompleteClasses.option}`]: {
      display: 'flex',
      padding: 8,
      borderBottom: '1px solid #F3F4F6',
      '& > :first-of-type': {
        marginRight: 8
      }
    },
  }
}));

const StyledInput = styled(TextField)(() => ({
  borderRadius: 10,
  '& input': {
    borderRadius: 8,
    border: '1px solid #F3F4F6',
  }
}));