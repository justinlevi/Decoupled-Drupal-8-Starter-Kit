import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import MdAdd from 'react-icons/lib/md/add';
import Card from './Card';

const Fade = ({ children, ...props }) => (
  <CSSTransition
    {...props}
    timeout={1000}
    classNames="fade"
  >
    {children}
  </CSSTransition>
);
Fade.propTypes = {
  children: PropTypes.node.isRequired,
};

const listItems = ({ data, selectHandler, deleteHandler }) => data.user.nodes.articles.map(page => (
  <Fade duration={1000} key={page.nid} timeout={{ enter: 0, exit: 1000 }}>
    <Card
      page={page}
      selectHandler={selectHandler}
      deleteHandler={(event) => { deleteHandler(event, page.nid); }}
    />
  </Fade>
));

const List = (props) => {
  const {
    addHandler, isModalVisible, onDeleteModalToggle, onDeleteModalOk,
  } = props;
  return (
    <div className="">
      <div className="container">
        <div
          role="button"
          tabIndex={0}
          onKeyUp={() => { addHandler(); }}
          className="py-3"
          onClick={() => { addHandler(); }}
        >
          <div className="add">
            <MdAdd />
            <h2 className="card-title">Add</h2>
          </div>
        </div>

        <TransitionGroup className="item-list">
          {listItems(props)}
        </TransitionGroup>

        <Modal isOpen={isModalVisible} toggle={onDeleteModalToggle} backdrop>
          <ModalHeader toggle={onDeleteModalToggle}>Confirmation</ModalHeader>
          <ModalBody>
            Are you sure you want to remove this?
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={onDeleteModalToggle}>Cancel</Button>
            {' '}
            <Button color="primary" onClick={onDeleteModalOk}>Delete</Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};

List.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  addHandler: PropTypes.func.isRequired,
  onDeleteModalToggle: PropTypes.func.isRequired,
  onDeleteModalOk: PropTypes.func.isRequired,
};

export default List;
