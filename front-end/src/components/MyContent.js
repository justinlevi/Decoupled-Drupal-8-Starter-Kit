import React from 'react';
import PropTypes from 'prop-types';


export const ContentGrid = ({ items }) => {
  const columns = 3;
  const rows = [...Array(Math.ceil(items.length / columns))];
  const itemRows = rows.map((row, idx) => items.slice(idx * columns, (idx * columns) + columns));
  const content = itemRows.map(row => (
    <div className="row">
      {
        row.map(({
          url, title, meta, date,
        }) => (
          <div className={`col-md-${12 / columns}`}>
            <img className="img-fluid border" src={url} alt={title} />
            <h6 className="mt-3 mb-0"><span>{title}</span> / {meta}</h6>
            <small className="text-muted">{date}</small>
          </div>
        ))
      }
    </div>
  ));

  return (
    <div className="ContentGridContainer border-top">
      <div className="container p-0 pt-3">
        { content }
      </div>
    </div>
  );
};


const MyContent = (props) => {
  const { items } = props.content ||
  {
    items: [
      {
        url: 'https://picsum.photos/375/200',
        title: 'Title of thing',
        meta: '5:00',
        date: '5/10/1978',
      },
      {
        url: 'https://picsum.photos/375/200',
        title: 'Title of thing',
        meta: '5:00',
        date: '5/10/1978',
      },
      {
        url: 'https://picsum.photos/375/200',
        title: 'Title of thing',
        meta: '5:00',
        date: '5/10/1978',
      },
    ],
  };

  return (
    <div className="contentContainer">
      <div className="content">
        <h2>My Content</h2>
        <ContentGrid items={items} />
      </div>
    </div>
  );
};

MyContent.propTypes = {
  content: PropTypes.shape({}).isRequired,
};

export default MyContent;
