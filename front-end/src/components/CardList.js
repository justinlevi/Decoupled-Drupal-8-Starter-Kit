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

const listItems = ({ pages, ctaHandler, deleteItemHandler }) => pages.map(node => (
  <Fade duration={1000} key={node.nid} timeout={{ enter: 0, exit: 1000 }}>
    <Card
      node={node}
      ctaHandler={ctaHandler}
      deleteHandler={(event) => { deleteItemHandler(event, node.nid); }}
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
//   deleteItemHandler: PropTypes.func.isRequired,
// };

const CardList = (props) => {
  const {
    addPageMutation, isModalVisible, onModalToggle, onModalOk,
  } = props;
  return (
    <div className="">
      <div className="container">
        <div
          role="button"
          tabIndex={0}
          onKeyUp={() => { addPageMutation('NULL'); }}
          className="py-3"
          onClick={() => { addPageMutation('NULL'); }}
        >
          <div className="add">
            <MdAdd />
            <h2 className="card-title">Add</h2>
          </div>
        </div>

        <TransitionGroup className="item-list">
          {listItems(props)}
        </TransitionGroup>

        <Modal isOpen={isModalVisible} toggle={onModalToggle} backdrop>
          <ModalHeader toggle={onModalToggle}>Confirmation</ModalHeader>
          <ModalBody>
            Are you sure you want to remove this?
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={onModalToggle}>Cancel</Button>
            {' '}
            <Button color="primary" onClick={onModalOk}>Delete</Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};

CardList.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  addPageMutation: PropTypes.func.isRequired,
  onModalToggle: PropTypes.func.isRequired,
  onModalOk: PropTypes.func.isRequired,
};

export default CardList;
