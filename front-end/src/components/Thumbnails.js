import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Thumbnails extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    handleDelete: PropTypes.func.isRequired,
    render: PropTypes.func.isRequired,
    fileSize: PropTypes.number.isRequired,
    fileName: PropTypes.string.isRequired,
    percentageComplete: PropTypes.number.isRequired,
    uploadInitiated: PropTypes.bool.isRequired,
    uploadSuccess: PropTypes.bool.isRequired
  }

  state = {};

  render() {

    const fs = this.props.fileSize;
    let unit = (fs < 1000000) ? 'KB': 'MB';  
    let size = (fs < 1000000) ? Math.floor(fs/1000): Math.floor(fs/1000000);  
    let incrementValue = 1;
    let animationDelay = 0.15;

    return (
      <div className={"cell"} data-index={this.props.index}>
        {this.props.render()}
        

        <div className="dz-details">    
          <div className="dz-size"><span data-dz-size=""><strong>{size}</strong> {unit}</span></div>    
          <div className="dz-filename"><span data-dz-name="">{this.props.fileName}</span></div> 
        </div>

        { this.props.uploadInitiated && this.props.uploadSuccess === false ?
          <div className="dz-progress">
            <span className="dz-upload" data-dz-uploadprogress="true" 
              style={{ 
                width: `${this.props.percentageComplete}%`,
                animationDelay: `${animationDelay}s`,
                animation: `loadbar ${incrementValue}s linear forwards`
              }}>
            </span>
          </div>
        : null }

        <div className="dz-success-mark" style={{opacity: `${this.props.uploadSuccess ? 1 : 0}`}}> <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">      <title>Check</title>      <defs></defs>      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">        <path d="M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" strokeOpacity="0.198794158" stroke="#747474" fillOpacity="0.816519475" fill="#FFFFFF"></path>      </g>    </svg>  </div>
        <div className="dz-error-message"><span data-dz-errormessage="true"></span></div>

        { this.props.uploadInitiated === false && this.props.uploadSuccess === false ?
        <a className="delete" onClick={() => this.props.handleDelete(this.props.index)}>✖</a>
        : null }
      </div>
    )
  }
}
