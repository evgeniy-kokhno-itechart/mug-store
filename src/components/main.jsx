import React, { Component } from "react";
import Carousel from "nuka-carousel";
import cupAndPlateChristmasCrop from "../../src/images/CupAndPlateChristmasCrop.png";
import cupAndPlateCrop from "../../src/images/CupAndPlateCrop.png";

class MainPage extends Component {
  state = {};
  render() {
    return (
      <Carousel
        className="m-1"
        withoutControls={true}
        autoplay={true}
        wrapAround={true}
        // renderAnnounceSlideMessage={({currentSlide, slideCount }) =>
        //   `Slide ${currentSlide + 1} of ${slideCount}`
        // }
      >
        <img src={cupAndPlateChristmasCrop} alt="1" />
        <img src={cupAndPlateCrop} alt="2" />
      </Carousel>
    );
  }
}

export default MainPage;
