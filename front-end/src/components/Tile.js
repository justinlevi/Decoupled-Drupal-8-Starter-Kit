import React from 'react';
import PropTypes from 'prop-types';

const Tile = (props) => {
  const {
    index, item: { nid, title, url }, onClickHandler,
  } = props;
  return (
    <div
      className="card col-sm"
      onClick={() => { onClickHandler(nid); }}
      onKeyUp={() => { onClickHandler(nid); }}
      role="button"
      tabIndex={index}
    >
      {
        url ?
          <img
            className="card-img-top"
            src={url}
            alt="Card cap"
          /> :
          <img
            src="https://placeholdit.imgix.net/~text?txtsize=38&amp;txt=¯\_(ツ)_/¯&amp;w=400&amp;h=400"
            alt=""
            className="w-100"
          />
        }
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
      </div>
    </div>
  );
};

Tile.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({}).isRequired,
  onClickHandler: PropTypes.func.isRequired,
};

export default Tile;
