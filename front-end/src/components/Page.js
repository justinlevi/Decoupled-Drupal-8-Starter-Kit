import React, { Component } from 'react';
import { arrayOf, shape, string, number } from 'prop-types';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap';

class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      images: props.images.map(image => ({ src: image.url, mid: image.mid })),
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
    const nextIndex = this.state.activeIndex === this.state.images.length - 1 ?
      0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ?
      this.state.images.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { title, body, image } = this.props;
    const { activeIndex, images } = this.state;

    const slides = images.map(item => (
      <CarouselItem
        tag="div"
        key={item.mid}
        onExiting={this.onExiting}
        onExited={this.onExited}
      >
        <img src={item.src} alt={item.src} />
        {/* <CarouselCaption captionText={item.caption} captionHeader={item.caption} /> */}
      </CarouselItem>
    ));

    return (
      <div >
        {/* <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
        >
          <CarouselIndicators images={images} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
          {slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
        </Carousel> */}
        {/* <img src={image.max.url} alt={image} /> */}
        <div className="container">
          <img className="img-fluid" src={image.max.url} alt={title} />
          <h1>{title}</h1>
          <p dangerouslySetInnerHTML={{ __html: body ? body.value : null }} />
        </div>
      </div>
    );
  }
}

Page.propTypes = {
  title: string.isRequired,
  body: shape({
    value: string.isRequired,
  }),
  image: shape({
    max: shape({
      url: string.isRequired,
    }),
  }),
  images: arrayOf(shape({
    mid: number.isRequired,
    url: string.isRequired,
    fileSize: number.isRequired,
    fileName: string.isRequired,
  })),
};

Page.defaultProps = {
  body: null,
  image: null,
  images: [],
};

export default Page;
