import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Container,
} from 'reactstrap';

const formatImages = (images) => {
  let newImages = [];

  if (images.length > 1) {
    newImages = images.map((image) => {
      const imageModel = {
        src: image.entity.image.derivative.url,
        caption: image.entity.image.file.filename,
        altText: image.entity.image.file.filename,
      };
      return imageModel;
    });
  } else {
    newImages = {
      src: images[0].entity.image.derivative.url,
      caption: images[0].entity.image.file.filename,
      altText: images[0].entity.image.file.filename,
    };
  }

  return newImages;
};


class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      images: formatImages(props.images),
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const { activeIndex, images } = this.state;
    const nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const { activeIndex, images } = this.state;
    const nextIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }


  render() {
    const { title, body } = this.props;
    const { activeIndex } = this.state;

    const slides = this.state.images.map(item => (
      <CarouselItem
        onExiting={this.onExiting}
        onExited={this.onExited}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} />
        <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
      </CarouselItem>
    ));

    return (
      <Container>
        <h1>{title}</h1>
        <p>{body ? body.value : null}</p>
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
        >
          <CarouselIndicators
            items={this.state.images}
            activeIndex={activeIndex}
            onClickHandler={this.goToIndex}
          />
          {slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
        </Carousel>
      </Container>
    );
  }
}

Page.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.shape({}),
  images: PropTypes.arrayOf.isRequired,
};

Page.defaultProps = {
  body: null,
};

export default Page;
