import React, { Component } from 'react';
import { OverlayModal, ModalWindow } from './Modal.styled';

export default class Modal extends Component {
  render() {
    return (
      <OverlayModal>
        <ModalWindow>
          <img src={this.props.largeImageURL} alt={this.props.tags} />
        </ModalWindow>
      </OverlayModal>
    );
  }
}
