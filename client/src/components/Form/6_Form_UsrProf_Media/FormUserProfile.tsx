/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { useContext, useState } from 'react';
import { formContext } from '../Create_Acc_Parent/ParentForm';
import { formContextInterface } from '../Create_Acc_Parent/ParentForm';

import './FormUserProfile.css';

const cloudController = require('../../../services/cloudService');

const FormUserProfile: React.FC = () => {
  const context = useContext(formContext) as formContextInterface;
  const [mediaFileInputState, setMediaFileInputState] = useState<string | FileList | readonly string[]>();
  const [previewSource, setPreviewSource] = useState<
    string | null | ArrayBuffer
  >('');
  const [mediaPreviewSrc, setMediaPreviewSrc] = useState<string | null | ArrayBuffer>('');
  const [mediaTracker, setMediaTracker] = useState<number>(0);

  //Go prev page function
  function goPrevPage() {
    context.setPage((page) => page - 1);
  }

  //Handle form submit
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      //Go to next page
      context.setPage((page) => page + 1);
    } catch (err) {
      console.log(
        ' : : : error submitting user profile info to state : : : ',
        err
      );
    }
  }

  //controller function for uploading user media
  async function uploadUsrMedia(imgBase64: string | ArrayBuffer) {
    if (mediaTracker >= 3) {
      alert('Maximum number of user medias uploaded');
      return;
    }

    try {
      console.log('UploadusrMedia firing!');
      //setMediaFileInputState(); //THIS DOESNT WORK ?
      setMediaTracker((mediaTracker) => mediaTracker + 1);
      return await fetch('http://localhost:4000/cloudapi/upload/media', {
        method: 'POST',
        body: JSON.stringify({ imgData: imgBase64 }),
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      console.log('Error uploading file Usr media : : : ', err);
    }
  }

  //Function for handling profile picture upload
  function handleFileSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    console.log('handleSubmitFile firing !');
    event.preventDefault();
    if (!previewSource) return;
    cloudController.uploadImage(previewSource);
  }

  //Func for uploading usr-media picture
  function submitUserMedia(event: React.MouseEvent<HTMLButtonElement>) {
    console.log('submitUserMedia firing!');
    event.preventDefault();
    if (!mediaPreviewSrc) return;
    uploadUsrMedia(mediaPreviewSrc); //////////////////////
  }

  //Func for handling user selecting profile pic
  function handleInputChange(files: FileList) {
    console.log('handleInputChange firing !');
    const file = files[0];
    console.log(file, 'FILE !');
    previewFile(file);
  }

  //func for handling user selecting usr-media file
  function handleMediaInput(files: FileList) {
    console.log('handleMediaInput firing!');
    const mediaFile = files[0];
    console.log(mediaFile, 'MEDIA FILE !');
    previewMediaFile(mediaFile);
    setMediaFileInputState(files);

    if (mediaTracker >= 3) {
      alert('You have uploaded the maximum number of user media pictures.');
      return;
    }
  }

  //Function for previewing profile pic
  function previewFile(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  }

  //Function for previewing usr-media pictures
  function previewMediaFile(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setMediaPreviewSrc(reader.result);
    };
  }

  return (
    <div>
      <h3 className="top-text">Now lets make your profile!</h3>
      <p className="sub-top">Show yourself off to the world !</p>
      <form className="profile-form" onSubmit={handleSubmit}>
        {' '}
        <h4>Choose One main Profile picture</h4>
        <input
          className="file-input"
          type="file"
          name="main-prof-pic"
          id="prof-pic"
          onChange={(e) => {
            if (e.target.files !== null) {
              handleInputChange(e.target.files);
            }
          }}
        ></input>
        <label htmlFor="prof-pic" className="upload-btn">
          Choose File
        </label>
        <button
          className="file-input submit-file-btn"
          type="button"
          onClick={handleFileSubmit}
        >
          Submit file
        </button>
        <h4>Add more user pictures</h4>
        <p className="tracker">Media files Uploaded : {mediaTracker} / 3</p>
        <input
          className="file-input"
          id="media-file"
          type="file"
          name="media-file-1"
          onChange={(e) => {
            if (e.target.files !== null) {
              handleMediaInput(e.target.files);
            }
          }}
        ></input>
        <label htmlFor="media-file" className="upload-btn">
          Choose File
        </label>
        <button
          type="button"
          className="submit-file-btn"
          onClick={submitUserMedia}
          // value={mediaFileInputState}
        >
          Submit Media file
        </button>
        <h4>Finally, write a short bio :)</h4>
        <textarea
          className="bio-input"
          name="bio"
          cols={10}
          rows={10}
          maxLength={250}
        ></textarea>
      </form>

      {/* PREVIEW YOUR SELECTED FILE */}
      {previewSource && mediaPreviewSrc && (
        <img
          src={'' + mediaPreviewSrc}
          alt="your chosen image"
          style={{ width: '450px' }}
        />
      )}

      <div className="footer">
        <button className="footer-btn" onClick={goPrevPage}>
          Prev
        </button>
        <button className="footer-btn" type="submit">
          Create Account
        </button>
      </div>
    </div>
  );
};

export default FormUserProfile;
