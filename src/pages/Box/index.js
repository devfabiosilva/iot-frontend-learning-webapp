import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import './style.css';
import { MdInsertDriveFile } from 'react-icons/md';
//react-icons -> icones legais
import api from '../../services/api';
//import { distanceInWords } from 'date-fns';
import { formatDistance } from 'date-fns';
//import pt from 'date-fns/locale/pt-BR';
import { ptBR } from 'date-fns/locale';
import Dropzone from 'react-dropzone';
import socket from 'socket.io-client'
export default class Box extends Component {
  state = {
    box: {}
  }
  async componentDidMount() {
    this.subscribeToNewFiles();
    const box = this.props.match.params.id;
    const response = await api.get(`boxes/${box}`);

    this.setState({ box: response.data });

  }

  subscribeToNewFiles = () => {
    const box = this.props.match.params.id;
    const io = socket('https://omnistackfback.herokuapp.com');

    io.emit('connectRoom', box);
    io.on('file', data => {
      console.log(data);
      this.setState({
        box: { ...this.state.box, files: [data, ...this.state.box.files ] }
      });
    })

  }

  handleUpload = (files) => {
    files.forEach(file => {
      const data = new FormData();
      const box = this.props.match.params.id;
      console.log(file);
      data.append('file', file);
      api.post(`boxes/${box}/files`, data)
    });

  }
  render() {
    return (
      <div id="box-container">
        <header>
          <img src={logo} alt="" />
          <h1>{this.state.box.title}</h1>
  
        </header>
        <Dropzone onDropAccepted={this.handleUpload}>
          {
            ({ getRootProps, getInputProps}) => (
              <div className="upload" {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Arraste arquivos ou clique aqui</p>
              </div>
            )
          }
        </Dropzone>
        <ul>
          { this.state.box.files && this.state.box.files.map(file => (
            <li key={file.id}>
              <a href={file.url} className="fileInfo" target="_blank">
                <MdInsertDriveFile size={24} color="#A5FFFF" />
                <strong>{file.title}</strong>
              </a>
              <span>
                Há {formatDistance( new Date( file.createdAt ), new Date(), { locale: ptBR } )}
              </span>
            </li>
          )) }

          <li>
            <a href="" className="fileInfo">
              <MdInsertDriveFile size={24} color="#A5FFFF" />
              <strong>Estatic desafio.pdf</strong>
            </a>
            <span>Há 3 minutos atrás</span>
          </li>
        </ul>
      </div>
    );
  }
}
