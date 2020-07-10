import React from 'react';
import { createSlice } from '@reduxjs/toolkit';
import { Button, Nav, Card } from 'react-bootstrap';

import * as actions from '../actions/index.js';

const Sidebar = (props) => {
  console.log('Sidebar -> props', props);
  const handleToggleChannel = (id) => () => {
    const { toggleActiveChannel } = props;
    toggleActiveChannel({ id });
  };
  const renderChannels = () => {
    const { channels } = props;
    return channels.map(({ id, name }) => (
      <Nav.Link
        className="btn btn-outline-info mb-2"
        key={id}
        eventKey={id}
        onClick={handleToggleChannel(id)}>
        {`# ${name}`}
      </Nav.Link>
    ));
  };

  return (
    <Card border="info" className="h-100">
      <Card.Header className="d-flex justify-content-between font-weight-bold ">
        Channels
        <Button variant="outline-info" size="sm">
          +
        </Button>{' '}
      </Card.Header>
      <Card.Body>
        <Nav activeKey={props.currentChannelId} className="nav-pills flex-column font-weight-bold">
          {renderChannels()}
        </Nav>
      </Card.Body>
    </Card>
  );
};
export default Sidebar;
