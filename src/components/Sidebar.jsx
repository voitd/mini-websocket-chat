import React from 'react';
import { Button, Nav, Card } from 'react-bootstrap';
// import { connect } from 'react-redux';
// import * as actions from '../actions/index.js';

// const mapStateToProps = (state) => {
//   console.log('mapStateToProps -> state', state);
//   const props = {
//     channels: state.channels,
//     currentChannelId: state.currentChannelId
//   };
//   return props;
// };

// const actionCreators = {
//   toggleActiveChannel: actions.toggleActiveChannel
// };

const Sidebar = (props) => {
  console.log('Sidebar -> props', props);
  const handleToggleTaskState = (id) => () => {
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
        onClick={handleToggleTaskState(id)}>
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
        <Nav activeKey={props.currentChannelId} className=" nav-pills flex-column font-weight-bold">
          {renderChannels()}
        </Nav>
      </Card.Body>
    </Card>
  );
};
export default Sidebar;
// export default connect(mapStateToProps, actionCreators)(Sidebar);
