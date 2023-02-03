import React, { useState, useEffect, useContext } from "react";
import Navbar from "./Navbar";
import Comment from "./Comment";
import CurrentImageContext from "../../context/imageContext";

// eslint-disable-next-line react/prop-types
function ImageBox() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { selectedId, selectedName } = useContext(CurrentImageContext);
  const [currentImageComments, setCurrentImageComments] = useState([]);

  const [imageSelected, setImageSelected] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/image/infos/${selectedId}`)
      .then((res) => res.json())
      .then((image) => {
        setImageSelected(image);
        setCurrentImageComments(image.comment);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="content">
        <img
          src={`${BACKEND_URL}/api/image/${imageSelected.img}`}
          alt={selectedName.name}
          className="image"
        />
        <h4 className="name">{imageSelected.name}</h4>
        <Comment
          currentImageComments={currentImageComments}
          setCurrentImageComments={setCurrentImageComments}
        />
      </div>
    </div>
  );
}

export default ImageBox;
