import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import React from 'react';

import { showModal } from '../slices/modalSlice';
import RemoveIcon from '../../assets/icons/remove.svg';
import RenameIcon from '../../assets/icons/rename.svg';

const ActionButtons = () => {
  const dispatch = useDispatch();

  const actions = {
    renaming: RenameIcon,
    removing: RemoveIcon
  };

  const handleShowModal = (type) => () => {
    dispatch(showModal(type));
  };

  return Object.entries(actions).map(([action, Icon]) => (
    <Button
      key={action}
      variant="outline"
      className="mx-1"
      size="sm"
      onClick={handleShowModal(action)}>
      <Icon fill="teal" />
    </Button>
  ));
};

export default ActionButtons;
