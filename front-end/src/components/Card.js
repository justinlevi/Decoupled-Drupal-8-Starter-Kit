import React from 'react';
import PropTypes from 'prop-types';
import MdRemove from 'react-icons/lib/md/remove-circle-outline';
import MdEdit from 'react-icons/lib/md/edit';

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
  const {
    page, selectHandler, editHandler, deleteHandler, isAuthenticated,
  } = props;
  const trimmedTitle = textTrim(page.title);
  const trimmedBody = page.body != null ? textTrim(page.body.value) : null;

  const selectClickHandler = () => {
    selectHandler(page.nid);
  };

  const editClickHandler = (event) => {
    event.stopPropagation();
    editHandler(page.nid);
  };

  const deleteClickHandler = (event) => {
    event.stopPropagation();
    deleteHandler(page.nid);
  };

  return (
    <div className="py-3">

      <div
        role="button"
        tabIndex={0}
        className="card"
        onClick={selectClickHandler}
        onKeyUp={selectClickHandler}
      >
        <div className="row ">
          <div className="col-md-4">
            { !page.image ?
              <img src="https://placeholdit.imgix.net/~text?txtsize=38&amp;txt=¯\_(ツ)_/¯&amp;w=400&amp;h=400" alt="" className="w-100" />
                :
              <img src={page.image} alt="" className="w-100" />
              }
          </div>
          <div className="col-md-8 px-3">
            <div className="card-body px-3">
              <h4 className="card-title">{trimmedTitle}</h4>
              <p className="card-text body">{trimmedBody}</p>
              <p className="card-text">NID: {page.nid}</p>
              {isAuthenticated ?
                <div className="edit-delete-container">
                  <button className="edit" onClick={editClickHandler} >
                    <MdEdit className="edit" />
                  </button>
                  <button
                    className="delete"
                    onClick={deleteClickHandler}
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                  >
                    <MdRemove className="remove" />
                  </button>
                </div>
              : null}
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
  editHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Card;
