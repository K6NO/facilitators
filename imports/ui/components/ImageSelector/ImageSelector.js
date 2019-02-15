import React from 'react';
import Modal from 'react-modal';
import { Button, Row, Col } from 'reactstrap';

import ImageGrid from './ImageGrid';
import ImageUploader from './ImageUploader';

import './ImageSelector.scss';

const ENTER_KEY = 13;
const WAIT_INTERVAL = 800;

class ImageSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      url: this.props.url || '',
      searchTerm : '',
      imageFilter: '',
    };
  }
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.url !== this.props.url) {
      this.setState({url: nextProps.url});
    }
  }
  
  componentWillMount() {
    this.timer = null;
    Modal.setAppElement('#react-root');
  }

  handleChange = (e) => {
    clearTimeout(this.timer);
    this.setState({ searchTerm: e.target.value });
    this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
  }

  handleKeyDown = (e) => {
    if (e.keyCode === ENTER_KEY) {
        this.triggerChange();
        this.setState({searchTerm: ''});
    }
  }
  triggerChange = () => {
    this.setState({imageFilter : this.state.searchTerm});
  }

  openModal = () => {
    this.setState({isOpen: true});
  }

  closeModal = () => {
    this.setState({isOpen: false});
  }

  selectImage = (url) => {
    // TODO save image url to activity maybe here
    this.setState({
      isOpen: false,
      url,
    });
    
  }

  render() {
    const {isOpen, url} = this.state;
    return (
      <div className="ImageSelector">
        <Row>
          <Col sm={12}>
            {url &&
            <img 
              src={url}
            />
            }
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <Button onClick={this.openModal}>
                Change Image
            </Button>
          </Col>
        </Row>
        <Modal
          isOpen={isOpen}
          onRequestClose={this.closeModal}
          className="Image Modal"
          overlayClassName="Image Overlay"
        >
          <Row>
            <Col sm={5} className="searchField">
              <input 
                type="text" 
                onKeyDown={this.handleKeyDown}
                onChange={this.handleChange}
                name="searchField"
                autoFocus
                placeholder="Search images by tags"
                value={this.state.searchTerm}
              />
            </Col>
            <Col sm={6} className="imageUploader">
              <ImageUploader />
            </Col>
            <Col sm={1}>
              <Button 
                className="CloseButton" 
                onClick={this.closeModal}>X
              </Button>
            </Col>
          </Row>
          <ImageGrid 
            selectImage={this.selectImage} 
            
            imageFilter={this.state.imageFilter} />
        </Modal>
        <input
          className="form-control"
          type="hidden"
          value={url}
        />
      </div>
    );
  }
}

export default ImageSelector;
