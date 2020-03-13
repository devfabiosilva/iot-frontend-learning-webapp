import React, { Component } from 'react';


import './style.css';
import logo from '../../assets/logo.svg';
import api from '../../services/api';

//<img logo={logo} alt="" />
export default class Main extends Component {
  state = {
    newBox: ''
  }

  handleSubmit = async e => {

    e.preventDefault();

    console.log(this.state.newBox);
  
    const response = await api.post('boxes', {
      title: this.state.newBox
    })

    console.log(response.data);
    this.props.history.push(`/box/${response.data._id}`);

  }

  handleInputChange = (e) => {
    this.setState( { newBox: e.target.value } );
  }
  render() {
    return (
        <div id="main-container">
            <form onSubmit={this.handleSubmit}>
            <img src={logo} alt="" />
                <input
                  type="text"
                  placeholder="Criar um box"
                  onChange={this.handleInputChange}

                />
                <button type="submit">Criar</button>
            </form>
        </div>
    );
  }
}
