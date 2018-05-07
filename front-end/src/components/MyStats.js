import React from 'react';
import PropTypes from 'prop-types';

const MyStats = (props) => {
  const { items, views, totalViews } = props.stats || { items: 3, views: 15, totalViews: 2567 };

  return (
    <div className="statsContainer mt-3">
      <div className="stats">
        <h3>My Stats</h3>
        <div className="container mb-5">
          <div className="row bg-light">
            <div className="col border">
              <h4>{items}</h4>
              <small>VIEWS</small>
            </div>
            <div className="col border border-left-0">
              <h4>{views.toLocaleString()}</h4>
              <small>WEEKLY VIEWS</small>
            </div>
            <div className="col border border-left-0">
              <h4>{totalViews.toLocaleString()}</h4>
              <small>ALL-TIME VIEWS</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MyStats.propTypes = {
  stats: PropTypes.shape({}).isRequired,
};

export default MyStats;
