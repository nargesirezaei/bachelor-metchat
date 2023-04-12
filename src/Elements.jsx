import React from "react";
import image from "./img/Lines.png";
import photo from "./img/photo.png";
import image_2 from "./img/Lines_2.png";
import bubble from "./img/BubbleBox.png";

import "./Elements.css";

const Elements = () => {
  return (
    <div className="elements">
      <img src={image} alt={image} className="img_1" />
      <img src={photo} alt={photo} className="img_2" />
      <img src={image_2} alt={image_2} className="img_3" />
      <img src={bubble} alt={bubble} className="img_4" />
      <img src={image} alt={image} className="img_5" />
    </div>
  );
};
export default Elements;
