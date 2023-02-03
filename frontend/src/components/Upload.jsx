import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CurrentUserContext from "../../context/userContext";
import Navbar from "./Navbar";

function Upload() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const uploadToast = () =>
    toast.success("Upload réussi !", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const uploadFailedToast = () =>
    toast.error("Upload échoué !", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const uploadNoFileToast = () =>
    toast.warn("Pas de fichiers à Uploader !", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const { user, token } = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const imgRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (imgRef.current.files[0]) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const formData = new FormData();
      formData.append("img", imgRef.current.files[0]);
      formData.append("name", name);
      formData.append("user_id", user.id);

      for (const [key, value] of formData.entries()) {
        console.warn(`${key}: ${value}`);
      }

      axios
        .post(`${BACKEND_URL}/api/image`, formData, config)
        .then(() => {
          uploadToast();
        })
        .catch((error) => {
          console.error(error);
          uploadFailedToast();
        });
    } else {
      uploadNoFileToast();
    }
    setName("");
  };

  return (
    <>
      <Navbar />
      <div className="upload-container">
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className="form-group file-area">
            <label htmlFor="img" className="form-label">
              Image
            </label>
            <input type="file" ref={imgRef} id="img" required="required" />
            <div className="file-dummy">
              <div className="success">Your file is selected</div>
              <div className="default">
                Select an image from your Midjourney library
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              NAme of the vision
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              className="form-controll"
              required="required"
            />
          </div>
          <div className="form-group">
            <button className="containerbtn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default Upload;
