import React, { Component } from 'react'

import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';

export default class CreateSelectContainer extends Component {
  
  static propTypes = {
    nodeTitles: PropTypes.array.isRequired,
    uid: PropTypes.String.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      activeNode: '',
      handleCreateSubmit: this.handleCreateSubmit,
      handleCreateInputChange: this.handleCreateInputChange,
      handleSelectChange: this.handleSelectChange,
      selectValue: ''
    }
  }
  
  render() {
    return (
      <div>
        <form>
          <input name="nodeTitle" type="text"/>
          <select value={this.state.selectValue} onSelect={this.state.handleSelectChange}>
            <option value="default">Select an existing project</option>
            {
              this.props.nodeTitles.map((item,i) => {
                return (<option value={item.nid}>{item.title}</option>)
              });
            }
          </select>
          <input type="submit"/>
        </form>
      </div>
    )
  }
}

export default withApollo(CreateSelectContainer);  


const currentUserUid = gql`
  query currentUserContext {
    uid
  }
`;

const nodeTitlesByUserQuery = gql`
  query nodeQuery ($uid) {
    nodeQuery(offset:0, limit: 10, filter:{uuid:$uid}){
      entities{
        ...on NodePage {
          title
        }
      }
    }
  }
`;