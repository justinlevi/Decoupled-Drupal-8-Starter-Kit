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

const listItems = ({ pages, ctaHandler, deletePageHandler }) => pages.map(node => (
  <Fade duration={1000} key={node.nid} timeout={{ enter: 0, exit: 1000 }}>
    <Card
      node={node}
      ctaHandler={ctaHandler}
      deleteHandler={(event) => { deletePageHandler(event, node.nid); }}
    />
  </Fade>
));

// listItems.PropTypes = {
//   nodes: PropTypes.arrayOf(PropTypes.shape({
//     author: PropTypes.shape({
//       name: PropTypes.string,
//     }),
//     body: {
//       value: PropTypes.string,
//     },
//     images: PropTypes.arrayOf(PropTypes.shape({
//       url: PropTypes.string,
//       mid: PropTypes.number,
//     })),
//     nid: PropTypes.number,
//     title: PropTypes.string,
//     uuid: PropTypes.string,
//   })).isRequired,
//   ctaHandler: PropTypes.func.isRequired,
//   deletePageHandler: PropTypes.func.isRequired,
// };

const CardList = (props) => {
  const {
    addPageHandler, isModalVisible, onDeleteModalToggle, onDeleteModalOk,
  } = props;
  return (
    <div className="">
      <div className="container">
        <div
          role="button"
          tabIndex={0}
          onKeyUp={() => { addPageHandler('NULL'); }}
          className="py-3"
          onClick={() => { addPageHandler('NULL'); }}
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

CardList.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  addPageHandler: PropTypes.func.isRequired,
  onDeleteModalToggle: PropTypes.func.isRequired,
  onDeleteModalOk: PropTypes.func.isRequired,
};

export default CardList;
