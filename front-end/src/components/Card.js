import React from 'react';
import PropTypes from 'prop-types';
import MdRemove from 'react-icons/lib/md/remove-circle-outline';

const Card = (props) => {
  const { node, ctaHandler, deleteHandler } = props;
  return (
    <div className="py-3">
      <div
        role="button"
        tabIndex={0}
        className="card"
        onClick={() => { ctaHandler(node); }}
        onKeyUp={() => { ctaHandler(node); }}
      >
        <div className="row ">
          <div className="col-md-4">
            { node.images.length === 0 ?
              <img src="https://placeholdit.imgix.net/~text?txtsize=38&amp;txt=¯\_(ツ)_/¯&amp;w=400&amp;h=400" alt="" className="w-100" />
                :
              <img src={node.images[0].url} alt="" className="w-100" />
              }
          </div>
          <div className="col-md-8 px-3">
            <div className="card-body px-3">
              <h4 className="card-title">{node.title === 'NULL' ? 'NO TITLE' : node.title }</h4>
              {node.body !== null ?
                <p className="card-text">{node.body.value}</p> : null }
              <p className="card-text">NID: {node.nid}</p>
              <button
                className="delete"
                onClick={deleteHandler}
                data-toggle="modal"
                data-target="#exampleModalCenter"
              >
                <MdRemove className="remove" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  // node: PropTypes.shape({
  //   author: PropTypes.shape({
  //     name: PropTypes.string,
  //   }),
  //   body: {
  //     value: PropTypes.string,
  //   },
  //   images: PropTypes.arrayOf(PropTypes.shape({
  //     url: PropTypes.string,
  //     mid: PropTypes.number,
  //   })),
  //   nid: PropTypes.number,
  //   title: PropTypes.string,
  //   uuid: PropTypes.string,
  // }).isRequired,
  ctaHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
};

export default Card;
