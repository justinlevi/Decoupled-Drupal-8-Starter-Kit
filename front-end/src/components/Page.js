import React from 'react';
import PropTypes from 'prop-types';

const Page = (props) => {
  const { title, body } = props;
  return (
    <div className="container">
      <h1>{title}</h1>
      <p>{body ? body.value : null}</p>
    </div>
  );
};

Page.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.shape({}),
};

Page.defaultProps = {
  body: null,
};

export default Page;
