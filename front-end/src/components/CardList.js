import React from 'react';
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Card from 'components/Card';
import MdAdd from 'react-icons/lib/md/add';

const Fade = ({ children, ...props }) => (
  <CSSTransition
    {...props}
    timeout={1000}
    classNames="fade"
  >
    {children}
  </CSSTransition>
);

const CardList = (props) => {

  // let listEnd = undefined;

  // const scrollToBottom = () => {
  //   if(listEnd){
  //     listEnd.scrollIntoView({ behavior: "smooth" });
  //   }
  // }

  const listItems = () => {
    const items = props.nodes.map((item, id) => {
        return (
          <Fade duration={1000} key={item.nid} timeout={{enter:0, exit: 1000}}>
            <Card 
              node={item}
              ctaHandler={props.ctaHandler} 
              deleteHandler={ (event) => { props.deleteItemHandler(event, item.nid) }  } 
            />
          </Fade>
        )
      }
    );
    return items;
  }

  return (
    <div className="">
      <div className="container">
        <div className="py-3" onClick={() => { props.addPageMutation('NULL');} }>
          <div className="add">
            <MdAdd />
            <h2 className="card-title">Add</h2>
          </div>
        </div>

        <TransitionGroup className="item-list">
          {listItems()}
        </TransitionGroup>

        <Modal isOpen={props.isModalVisible} toggle={props.onModalToggle} backdrop={true}>
          <ModalHeader toggle={props.onModalToggle}>Confirmation</ModalHeader>
          <ModalBody>
            Are you sure you want to remove this?
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={props.onModalToggle}>Cancel</Button>
            {' '}
            <Button color="primary" onClick={props.onModalOk}>Delete</Button>
          </ModalFooter>
        </Modal>

        {/* <div style={{ float:"left", clear: "both" }}
          ref={(el) => { listEnd = el; }}>
        </div> */}
      </div>
    </div>
  );
}
 
CardList.propTypes = {
  ctaHandler: PropTypes.func.isRequired,
  deleteItemHandler: PropTypes.func.isRequired,
  addPageMutation: PropTypes.func.isRequired,
  onModalToggle: PropTypes.func.isRequired,
  onModalOk: PropTypes.func.isRequired
}

export default CardList;