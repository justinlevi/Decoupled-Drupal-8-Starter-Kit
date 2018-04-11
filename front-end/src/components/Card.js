import React from 'react';
import PropTypes from 'prop-types';
import MdRemove from 'react-icons/lib/md/remove-circle-outline';

const textTrim = (text, trimLength = 20) => {
  let trimmedText = text;

  if (text === 'NULL') {
    trimmedText = 'NO TITLE';
  }

  if (text.length > trimLength) {
    trimmedText = `${text.substring(0, trimLength)}...`;
  }

  return trimmedText;
};

const Card = (props) => {
  const { page, selectHandler, deleteHandler } = props;
  const trimmedTitle = textTrim(page.title);
  const trimmedBody = page.body != null ? textTrim(page.body.value) : null;
  return (
    <div className="py-3">
      <div
        role="button"
        tabIndex={0}
        className="card"
        onClick={() => { selectHandler(page.nid); }}
        onKeyUp={() => { selectHandler(page.nid); }}
      >
        <div className="row ">
          <div className="col-md-4">
            { page.images.length === 0 ?
              <img src="https://placeholdit.imgix.net/~text?txtsize=38&amp;txt=¯\_(ツ)_/¯&amp;w=400&amp;h=400" alt="" className="w-100" />
                :
              <img src={page.images[0].url} alt="" className="w-100" />
              }
          </div>
          <div className="col-md-8 px-3">
            <div className="card-body px-3">
              <h4 className="card-title">{trimmedTitle}</h4>
              <p className="card-text body">{trimmedBody}</p>
              <p className="card-text">NID: {page.nid}</p>
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
  page: PropTypes.shape({}).isRequired,
  selectHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
};

export default Card;
