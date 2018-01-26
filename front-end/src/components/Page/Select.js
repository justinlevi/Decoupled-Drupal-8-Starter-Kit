import React, { Component } from 'react'
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';


export default class Project extends Component {
  
  static propTypes = {
    projects: PropTypes.array.isRequired,
  }
  
  render() {
    return (
      <div>
        <form>
          <input name="projectTitle" type="text"/>
          <select>
            <option value="default">Select an existing project</option>
            {
              this.props.projects.map((item,i) => {
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

const addPage

const nodeTitlesByUserQuery = gql`
  query nodeQuery ($uid) {
    nodeQuery(offset:0, limit: 10, filter:{uid:$uid}){
      entities{
        ...on NodePage {
          title
        }
      }
    }
  }
`;