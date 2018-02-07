import React from 'react';
import MdRemove from 'react-icons/lib/md/remove-circle-outline';

const HCard = props => {

  return (
    <div className="py-3">
      <div className="card" onClick={
          (event) => { 
            props.ctaHandler(props.node)
          }
        }>
        <div className="row ">

            <div className="col-md-4">
              { props.node.images.length === 0 ? 
                  <img src="https://placeholdit.imgix.net/~text?txtsize=38&amp;txt=¯\_(ツ)_/¯&amp;w=400&amp;h=400" alt="" className="w-100" />
                :
                  <img src={props.node.images[0].entity.image.derivative.url} alt="" className="w-100" />
              }
            </div>

            <div className="col-md-8 px-3">
              <div className="card-body px-3">
                <h4 className="card-title">{props.node.title === 'NULL'? 'NO TITLE' : props.node.title }</h4>
                {props.node.body !== null ? <p className="card-text">{props.node.body.value}</p> : null }
                <p className="card-text">NID: {props.node.nid}</p>
                <button className="delete" onClick={props.deleteHandler} data-toggle="modal" data-target="#exampleModalCenter">
                  <MdRemove className="remove" />
                </button>

              </div>
            </div>
            
        </div>
      </div>
    </div>
  );
}

export default HCard;