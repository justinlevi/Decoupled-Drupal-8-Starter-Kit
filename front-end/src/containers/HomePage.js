import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAllArticles } from '../redux/article/actions';
import Tile from '../components/Tile';

export class HomeArticle extends Component {

  /*
  * Constructor
  * ----------------------
  */
  constructor(props) {
    super(props);
    props.dispatch(fetchAllArticles());
  }

  render(){
    return(
      <div>
        <Tile articles={this.props.allArticles}/>
      </div>
    )
  }

}

HomeArticle.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  allArticles: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  allArticles: state.articleReducer.allArticles
});

export default connect(mapStateToProps)(HomeArticle);
