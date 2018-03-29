import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchHomePageArticles } from '../redux/article/actions';
import Tile from '../components/Tile';

import {FETCH_FRONT_PAGE_ARTICLES} from '../api/apolloProxy';
import { Query } from "react-apollo";

const formatedData = (data) => data.nodeQuery.entities.map(val => {

  let image = '';
  let item = {
    label: val.entityLabel
  }

  if(val.fieldMediaImage.length){
    image = val.fieldMediaImage[0].entity.image.derivative.url
    item.image = image;
  }

  return item;
});


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
        <Query
         query={ FETCH_FRONT_PAGE_ARTICLES }
         pollInterval={500} >
         {({ loading, error, data, startPolling, stopPolling }) => {
           if (loading) return null;
           if (error) return `Error!: ${error}`;

           return (
             <Tile articles={formatedData(data)}/>
           );
         }}
       </Query>
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
