import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import cupAndPlateChristmasCrop from '../../../../images/CupAndPlateChristmasCrop.png';
import cupAndPlateCrop from '../../../../images/CupAndPlateCrop.png';
import './Main.scss';

const MainPage = () => (
  <Carousel
    showStatus={false}
    showIndicators={false}
    showThumbs={false}
    interval={4000}
    className="main-page"
    infiniteLoop
    autoPlay
  >
    <div>
      <img src={cupAndPlateChristmasCrop} alt="First slide" />
    </div>
    <div>
      <img src={cupAndPlateCrop} alt="Second slide" />
    </div>
  </Carousel>
);

export default MainPage;
