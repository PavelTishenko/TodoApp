import React, {Component} from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {

  state = {
    txt: ''
  }

  onValChange = (e) => {
    const { searchChange = () => {} } = this.props;

   this.setState({
     txt: e.target.value
   })

   searchChange(e.target.value);
  }

  render() {
  const searchText = 'Type here to search';
  const searchStyle = {
    fontSize: '20px'
  };
  const {txt} = this.state;
  return (
  <input  className='form-control search-input'
  style = {searchStyle}
  placeholder={searchText}
  onChange = {this.onValChange}
  value = {txt}/>

)};
}
