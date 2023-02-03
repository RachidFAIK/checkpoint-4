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
    fetch(`${BACKEND_URL}/api/image/${selectedId}`)
      .then((res) => res.json())
      .then((image) => {
        setImageSelected(image);
        setCurrentImageComments(image.comment);
      })
      .catch((err) => console.error(err));
  }, [selectedId]);

  return (
    <div>
      <Navbar />
      <img
        src={`${BACKEND_URL}/api/image/${imageSelected.img}`}
        alt={selectedName.name}
      />
      <Comment
        currentImageComments={currentImageComments}
        setCurrentImageComments={setCurrentImageComments}
      />
    </div>
  );
}

export default ImageBox;
