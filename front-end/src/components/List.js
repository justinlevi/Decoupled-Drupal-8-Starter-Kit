import React, { Component } from 'react';
import PropTypes, { arrayOf, shape } from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import MdAdd from 'react-icons/lib/md/add';

import ARTICLE_SHAPE from '../utils/articlePropType';
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

class List extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.articles.length !== prevState.articles.length) {
      return {
        articles: nextProps.articles,
      };
    }
    return null;
  }

  state = {
    articles: this.props.articles,
  }

  handleSearchInput = (target) => {
    const searchTerm = target.value;

    const { articles } = this.props;
    const searchedArticles = articles.map((page) => {
      const title = page.title.toLowerCase();
      const searchTermLower = searchTerm.toLowerCase();
      return title.includes(searchTermLower) ? page : null;
    });
    const filteredArticles = searchedArticles.filter(n => n != null);

    if (filteredArticles.length > 0) {
      this.setState({
        articles: filteredArticles,
      });
    } else if (target.value === '') {
      this.setState({
        articles: this.props.articles,
      });
    } else {
      this.setState({
        articles: [],
      });
    }
  }

  render() {
    const {
      addHandler, isModalVisible, onDeleteModalToggle, onDeleteModalOk, selectHandler, deleteHandler,
    } = this.props;

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
            <input onChange={({ target }) => this.handleSearchInput(target)} placeholder="Content Title..." type="text" className="form-control search-bar" aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
          </div>

          {
            this.state.articles.length > 0 ?
              <TransitionGroup className="item-list">
                <ListItems
                  articles={this.state.articles}
                  selectHandler={selectHandler}
                  deleteHandler={deleteHandler}
                />
              </TransitionGroup>
          : <div className="no-result-text h1 text-center">No Results Found</div>
          }

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
  }
}

List.propTypes = {
  articles: arrayOf(shape(ARTICLE_SHAPE).isRequired).isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  addHandler: PropTypes.func.isRequired,
  onDeleteModalToggle: PropTypes.func.isRequired,
  onDeleteModalOk: PropTypes.func.isRequired,
};

export default List;
