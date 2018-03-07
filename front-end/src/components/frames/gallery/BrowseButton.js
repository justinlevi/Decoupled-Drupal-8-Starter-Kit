import React from 'react';
import PropTypes from 'prop-types';

export const messages = {
  none: 'No files chosen',
  one: '1 file chosen',
  many: 'files chosen',
};

export const calculateMessage = (totalFiles, totalBytes) => {
  let message = messages.none;
  if (totalFiles >= 1) {
    message = totalFiles === 1 ? messages.one : message = `${totalFiles} ${messages.many}`;
  }

  message += (totalBytes < 1000000) ?
    ` (${Math.floor(totalBytes / 1000)}KB)` :
    ` (${Math.floor(totalBytes / 1000000)}MB)`;
  return message;
};

const BrowseButton = ({ totalFiles = 0, totalBytes = 0, render }) => (
  <div className="browseContainer">
    {render()} {calculateMessage(totalFiles, totalBytes)}
  </div>
);

BrowseButton.propTypes = {
  totalFiles: PropTypes.number,
  totalBytes: PropTypes.number,
  render: PropTypes.func.isRequired,
};

BrowseButton.defaultProps = {
  totalBytes: 0,
  totalFiles: 0,
};

export default BrowseButton;
