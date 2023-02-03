/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
// import moment from "moment-with-locales-es6";
import useLocalStorage from "../hooks/useLocalStorage";

const CurrentImageContext = createContext();

export default CurrentImageContext;

export function CurrentImageContextProvider({ children }) {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [image, setImage] = useState([]);

  const [selectedName, setSelectedName] = useLocalStorage("imageName", "");
  const [selectedId, setSelectedId] = useLocalStorage("imageId", "");

  //   const imageDate = (image) =>
  //     moment(image.creation_date).locale("fr").fromNow();

  const values = {
    image,
    setSelectedName,
    selectedName,
    selectedId,
    setSelectedId,
    // imageDate,
  };

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/image`)
      .then((response) => {
        setImage(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <CurrentImageContext.Provider value={values}>
      {children}
    </CurrentImageContext.Provider>
  );
}
CurrentImageContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
