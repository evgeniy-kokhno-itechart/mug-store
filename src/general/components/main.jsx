import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cupAndPlateChristmasCrop from '../../images/CupAndPlateChristmasCrop.png';
import cupAndPlateCrop from '../../images/CupAndPlateCrop.png';
import '../../styles/Main.css';

const MainPage = () => (
  <div id="mainCarouselControls" className="carousel slide m-3 col-10 mx-auto" data-ride="carousel">
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img src={cupAndPlateChristmasCrop} className="d-block w-100" alt="1" />
      </div>
      <div className="carousel-item">
        <img src={cupAndPlateCrop} className="d-block w-100" alt="2" />
      </div>
    </div>
    <a className="carousel-control-prev" href="#mainCarouselControls" role="button" data-slide="prev">
      <FontAwesomeIcon className="main--carousel-icon" icon="arrow-left" />
      <span className="sr-only">Previous</span>
    </a>
    <a className="carousel-control-next" href="#mainCarouselControls" role="button" data-slide="next">
      <FontAwesomeIcon className="main--carousel-icon" icon="arrow-right" />
      <span className="sr-only">Next</span>
    </a>
  </div>
);

export default MainPage;
