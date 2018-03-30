import React, { Component } from 'react';
import Tile from '../components/Tile';

import {FETCH_FRONT_PAGE_ARTICLES} from '../api/apolloProxy';
import { Query } from "react-apollo";

const formatData = (data) => data.nodeQuery.entities.map(val => {

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
             <Tile articles={formatData(data)}/>
           );
         }}
       </Query>
      </div>
    )
  }

}

export default HomeArticle;
