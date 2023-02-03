import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CurrentImageContext from "../../context/imageContext";

function Content() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [imageList, setImageList] = useState([]);
  const { setSelectedId } = useContext(CurrentImageContext);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/image`)
      .then((response) => {
        setImageList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="container">
      <ul className="img-grid">
        {imageList.map((image) => (
          <Link
            to="/imageBox"
            key={image.id}
            onClick={() => setSelectedId(image.id)}
          >
            <li className="grid-item" key={image.id}>
              <img
                src={`${BACKEND_URL}/api/image/${image.img}`}
                alt={image.name}
              />
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Content;
