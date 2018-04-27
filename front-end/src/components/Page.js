import React, { Component } from 'react';
import { arrayOf, shape, string, number } from 'prop-types';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap';

import ARTICLE_SHAPE from '../utils/articlePropType';

class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      items: props.images.map(image => ({ src: image.url, mid: image.mid })),
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
    const nextIndex = this.state.activeIndex === this.state.items.length - 1 ?
      0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ?
      this.state.items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { title, body } = this.props;
    const { activeIndex, items } = this.state;

    const slides = items.map(item => (
      <CarouselItem
        className="custom-tag"
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
      <div className="container">
        <style>
          {
            `.custom-tag {
                max-width: 100%;
                min-height: 500px;
                background: black;
              }`
          }
        </style>
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
        >
          <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
          {slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
        </Carousel>
        <h1>{title}</h1>
        <p>{body ? body.value : null}</p>
      </div>
    );
  }
}


Page.propTypes = {
  title: string.isRequired,
  body: shape({
    value: string.isRequired,
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
  images: [],
};

export default Page;
