import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { withApollo } from 'react-apollo';
import { pagesByUserQuery, addPageMutation, deletePageMutation } from '../shared/queries';
import HCard from './HCard';
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

export class CreateSelect extends Component {

  static propTypes = {
    projectCreateSelectHandler: PropTypes.func.isRequired,
  }
  
  listEnd = undefined;

  state = {
    uid: 0,
    activeNode: '',
    selectValue: 0,
    title: '',
    nodes: [],
    isModalVisible: false
  }

  /**
  * LIFECYCLE
  * ----------
  */

  componentDidMount(){
    this.fetchPagesByUserQuery((result) => {
      this.setState({
        uid: result.uid,
        nodes: result.nodes.entities
      });
    });
  }

  fetchPagesByUserQuery = (onFetchComplete) => {
    this.props.client.query({query: pagesByUserQuery})
    .then(response => {
      onFetchComplete(response.data.user)
    }).catch((error) => {
      console.log('error ' + error);
    });
  }

  addPageMutation = (title) => {
    const variables = {"title": title};
    this.props.client.mutate({ mutation: addPageMutation, variables: variables})
    .then(response => {
      console.log('ADD PAGE COMPLETE')
      this.setState({
        nodes: this.state.nodes.concat([response.data.addPage.entity])
      })

      const {uuid, nid, images} = response.data.addPage.entity;

      //setTimeout(() => { this.scrollToBottom() }, 250);
      //setTimeout(() => { this.props.projectCreateSelectHandler(uuid, nid, images) }, 500)
      this.props.projectCreateSelectHandler(uuid, nid, images);
    }).catch((error) => {
      console.log('error ' + error);
    });
  }

  deleteNodeFromState = (nid) => {
    let newNodes = this.state.nodes.slice();
    const index = newNodes.findIndex((n) => { return n.nid === nid;});
    if (index === -1) { return false; }

    newNodes.splice(index,1);
    this.setState({ nodes: newNodes});

    return true;
  }

  deletePageMutation = (nid) => {    
    if(this.deleteNodeFromState(nid)){
      const variables = {"id": nid};
      this.props.client.mutate({ mutation: deletePageMutation, variables: variables})
      .then(response => {
        console.log('PAGE DELETED COMPLETE')
      }).catch((error) => {
        console.log('error ' + error);
      });
    }
  }

  ctaHandler = (uuid, nid, images) => {
    this.props.projectCreateSelectHandler(uuid, nid, images);
  }

  scrollToBottom = () => {
    if(this.listEnd){
      this.listEnd.scrollIntoView({ behavior: "smooth" });
    }
  }

  deleteItemHandler = (event, nid) => {
    event.stopPropagation(); 
    this.setState({
      activeNode: nid,
      isModalVisible: true
    });
  }

  onModalOk = (event) => {
    event.stopPropagation(); 
    this.deletePageMutation(this.state.activeNode); 
    this.setState({
        isModalVisible: false, 
        activeNode: ''
      });
  }

  onModalToggle = (event) => { 
    this.setState({
      isModalVisible: !this.state.isModalVisible, 
      activeNode: ''
    });
  }

  listItems = () => {
    const items = this.state.nodes.map((item, id) => {
        return (
          <Fade duration={1000} key={item.nid} timeout={{enter:0, exit: 1000}}>
            <HCard {...item} 
              ctaHandler={this.ctaHandler} 
              deleteHandler={ (event) => { this.deleteItemHandler(event, item.nid) }  } 
            />
          </Fade>
        )
      }
    );
    return items;
  }

  render() {
    return (
      <div className="">

        <div className="container">

            <div className="py-3" onClick={() => { this.addPageMutation('NULL');} }>
              <div className="add">
                <MdAdd />
                <h2 className="card-title">Add</h2>
              </div>
            </div>

            <TransitionGroup className="item-list">
              {this.listItems()}
            </TransitionGroup>

            <Modal isOpen={this.state.isModalVisible} toggle={this.onModalToggle} backdrop={true}>
              <ModalHeader toggle={this.onModalToggle}>Confirmation</ModalHeader>
              <ModalBody>
                Are you sure you want to remove this?
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={this.onModalToggle}>Cancel</Button>
                {' '}
                <Button color="primary" onClick={this.onModalOk}>Delete</Button>
              </ModalFooter>
            </Modal>

            <div style={{ float:"left", clear: "both" }}
              ref={(el) => { this.listEnd = el; }}>
            </div>
        </div>
          
      </div>
    )
  }
}

const CreateSelectWrapper = withApollo(CreateSelect);
export default CreateSelectWrapper;
