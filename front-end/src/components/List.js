import React from 'react';
import PropTypes, { arrayOf, shape } from 'prop-types';
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

const ListItems = ({ articles, selectHandler, deleteHandler }) => articles.map(page => (
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

        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-lg">Search By Title</span>
          </div>
          <input placeholder="Content Title..." type="text" className="form-control search-bar" aria-label="Large" aria-describedby="inputGroup-sizing-sm"/>
        </div>

        <TransitionGroup className="item-list">
          <ListItems {...props} />
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
  articles: PropTypes.arrayOf(shape({
    author: shape({
      name: PropTypes.string.isRequired,
    }),
    body: shape({
      value: PropTypes.string.isRequired,
    }),
    images: arrayOf(shape({})),
    nid: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  addHandler: PropTypes.func.isRequired,
  onDeleteModalToggle: PropTypes.func.isRequired,
  onDeleteModalOk: PropTypes.func.isRequired,
};

export default List;
