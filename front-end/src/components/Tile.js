import React from 'react';
import PropTypes from 'prop-types';

const Tile = (props) => {
  const articles = props.articles;
  return(
    <div className="tiles-wrapper row">
      { articles ? articles.map((val,index)=> {
        return (
          <div className="card col-3" key={index}>
            {val.image ? <img className="card-img-top" src={val.image} alt="Card cap" /> : <img src="https://placeholdit.imgix.net/~text?txtsize=38&amp;txt=¯\_(ツ)_/¯&amp;w=400&amp;h=400" alt="" className="w-100" />}
            <div className="card-body">
              <h5 className="card-title">{val.label}</h5>
            </div>
          </div>
        )
      }) : null }

    </div>
  )
}

Tile.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Tile;
