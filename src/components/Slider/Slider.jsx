import React, { forwardRef } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const Slider = forwardRef(
  ({ items = [], activeIndex = 0, centerMode, magnifiedIndex = 0, activeSlideCSS = "scale-75", ...props }, ref) => {

    // Fonction pour déterminer si l'élément doit être réduit
    const isSmall = (index) => {
      if (activeIndex + magnifiedIndex >= items.length) {
        return index !== activeIndex + magnifiedIndex - items.length;
      } else {
        return index !== activeIndex + magnifiedIndex;
      }
    };

    // Traitement des éléments pour le carrousel
    const slideItems = centerMode
      ? items.map((child, index) => {
          if (isSmall(index)) {
            return React.cloneElement(child, {
              ...child.props,
              className: [child.props?.className, activeSlideCSS].filter(Boolean).join(" "),
            });
          }
          return React.cloneElement(child);
        })
      : items;

    return (
      <AliceCarousel
        items={slideItems}
        infinite
        touchTracking
        mouseTracking
        disableButtonsControls
        ref={ref}
        {...props}
      />
    );
  }
);

export { Slider };
