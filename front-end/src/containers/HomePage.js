import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchHomePageArticles } from '../redux/article/actions';
import Tile from '../components/Tile';

export class HomeArticle extends Component {

  /**
  * LIFECYCLE
  * ----------
  */

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchHomePageArticles());
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
  allArticles: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = state => ({
  allArticles: state.articleReducer.allArticles
});

export default connect(mapStateToProps)(HomeArticle);
