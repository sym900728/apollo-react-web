import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import classes from './HomeView.scss'

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Select = () => (
  <div>
    <h4>this a Select </h4>
  </div>
)
class HomeView extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    console.log(this.props)
    return (
      <div>
        <h4>Welcome!</h4>
        <div style={{ zIndex: 1000, position: 'relative' }}>
          {(this.props.data.viewer) ? this.renderUser() : null}
        </div>
      </div>
    )
  }

  renderUser () {
    return (
      <table>
        <thead>
          <tr>
            <td>Key</td>
            <td>Value</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>id</td>
            <td>{this.props.data.viewer.id}</td>
          </tr>
          <tr>
            <td>avatarURL</td>
            <td>{this.props.data.viewer.avatarURL}<img src={this.props.data.viewer.avatarURL} /></td>
          </tr>
          <tr>
            <td>login</td>
            <td>{this.props.data.viewer.login}</td>
          </tr>
          <tr>
            <td>createdAt</td>
            <td>{this.props.data.viewer.createdAt}</td>
          </tr>
          <tr>
            <td>name</td>
            <td>{this.props.data.viewer.name}</td>
          </tr>
          <tr>
            <td>url</td>
            <td>{this.props.data.viewer.url}</td>
          </tr>
        </tbody>
      </table>
    )
  }

}
const HOME_QUERY = gql`
query getUser($size: Int, $name: String!) {
  viewer {
    id
    avatarURL(size: $size)
    login
    createdAt
    name
    url
    repository(name: $name) {
      id
      name
      url
    }
  }
}
`

const withData = graphql(HOME_QUERY, {
  options(props) {
    return {
      variables: {
        size: 300,
        name: 'LockPattern'
      },
      forceFetch: true
    }
  }
})


export default withData(HomeView)
