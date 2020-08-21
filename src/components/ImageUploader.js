import React, { useRef, useState, useEffect } from 'react';
import { BsXCircleFill } from "react-icons/bs";
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
import './ImageUploader.scss';

export const ImageUploader = (props) => {
  const { 
    onDrop,
    onRemove,
    onUpload,
    imageUploading,
    dropZoneClassName, 
    dropZoneStyle,
    dropZoneLabel,
    filesUploaded,
    buttonsContainerClassName,
    buttonsContainerStyles,
    buttonBrowseFileClassName,
    buttonBrowseFileStyle,
    buttonUploadClassName,
    buttonUploadStyle,
    buttonBrowseLabel,
    buttonUploadLabel
  } = props

  const [isImageUploading, setImageIsUploading] = useState(imageUploading);
  const fileInput = useRef(null);

  useEffect(() => {
    if (isImageUploading) {
      setTimeout(() => {
        setImageIsUploading(false);
      }, 3000);
    }
  }, [isImageUploading])
  
  return (  
    <div className={`main-container`} >
      <div 
        className={`dropzone-container ${dropZoneClassName}`}
        style={dropZoneStyle}
      >
        <input 
          ref={fileInput}
          type="file" 
          id="file-browser-input" 
          name="file-browser-input" 
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onChange={onDrop}
        />
        <div className="files-preview-container">
          {filesUploaded.map((file, index) => (
            <div className="file" key={index}>
              <img src={file.data} alt={file.data} />
              <div className="container">
                <span className="progress-bar">
                  {isImageUploading && <ReactLoading type="balls" color="red" height={75} width={75} /> }
                </span>
                <span className="remove-btn" onClick={() => onRemove(file, index)}>
                  <BsXCircleFill size={19} />
                </span>
              </div>
            </div>
          ))}
        </div>
        <div 
          className="helper-text" 
          onClick={() => fileInput.current.click()}  
        >
          {dropZoneLabel}
        </div>
      </div>
      <div 
        className={`${buttonsContainerClassName} button-container`}
        style={buttonsContainerStyles}
      >
        <button 
          onClick={() => fileInput.current.click()}
          className={`${buttonBrowseFileClassName} browse-file-button`}
          style={buttonBrowseFileStyle}
        >
          {buttonBrowseLabel}
        </button>
        <button 
          className={`${buttonUploadClassName}`}
          style={buttonUploadStyle} 
          onClick={(e) => { 
            onUpload(e);
            setImageIsUploading(true);
          }} 
          disabled={filesUploaded.length > 0 ? false : true}
        >
          {buttonUploadLabel}
        </button>
      </div>
    </div>
  );
}

ImageUploader.propTypes = {
  onDrop: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onUpload: PropTypes.func,
  imageUploading: PropTypes.bool,
  dropZoneClassName: PropTypes.string,
  dropZoneStyle: PropTypes.object,
  dropZoneLabel: PropTypes.string,
  buttonsContainerClassName: PropTypes.string,
  buttonsContainerStyles: PropTypes.object,
  buttonBrowseFileClassName: PropTypes.string,
  buttonBrowseFileStyle: PropTypes.object,
  buttonUploadClassName: PropTypes.string,
  buttonUploadStyle: PropTypes.object,
  buttonBrowseLabel: PropTypes.string,
  buttonUploadLabel: PropTypes.string,
  filesUploaded: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    data: PropTypes.string.isRequired,
  }))
}

ImageUploader.defaultProps = {
  imageUploading: false,
  dropZoneLabel: 'Drag and drop images here or click this area',
  buttonBrowseLabel: 'Browse Images',
  buttonUploadLabel: 'Upload Images'
}
 