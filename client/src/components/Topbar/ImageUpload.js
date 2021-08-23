import React from'react';
import styles from './styles.module.scss';
import { MdAttachFile } from "react-icons/md";
import {FaPen} from 'react-icons/fa';


class ImageUpload extends React.Component {
    constructor(props) {
      super(props);
      this.state = {file: '',imagePreviewUrl: ''};
    }
  
 
    _handleImageChange(e) {
      e.preventDefault();
  
      let reader = new FileReader();
      let file = e.target.files[0];
  
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      }
  
      reader.readAsDataURL(file)
    }
  
    render() {
      let {imagePreviewUrl} = this.state;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} alt = " " />);
      } else {
         
        $imagePreview = (<div></div>); 
      }
  
      return (
        <div >
          <form onSubmit={(e)=>this._handleSubmit(e)}>
            <label >
            <input  
              type="file" 
              style={{display:'none'}}
              onChange={(e)=>this._handleImageChange(e)} />
             <span className = {styles.quoteIcon}>
                <FaPen />
            </span>
              </label>
          </form>
          <div className={styles.imgPreview}>
            {$imagePreview}
          </div>
        </div>
      )
    }
  }
export default ImageUpload