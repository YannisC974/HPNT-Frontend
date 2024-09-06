import React from "react";
import PropTypes from "prop-types";

const shapes = {
  round: "rounded-[5px]",
  circle: "rounded-[50%]",
  square: "rounded-[0px]",
};

const variants = {
  outline: {
    yellow_900_red_600: "yellow_900_red_600_border text-black-900"
  },
  red_600_yellow_800_01: "border-2 border-solid red_600_yellow_800_01_border text-black-900",
  gradient: {
    yellow_800_red_500: "bg-gradient1 text-yellow-50",
  },
  fill: {
    deep_orange_A200_cc: "bg-deep_orange-a200_cc",
    gray_50: "bg-gray-50",
  },
  outlineTransparent: {
    default: "border-2 border-solid border-gray-800 bg-transparent text-black-900",
  },
};

const sizes = {
  md: "h-[55px] px-[26px] text-[18px]",
  lg: "h-[118px] px-[26px]",
  sm: "h-[56px] px-3.5",
  xs: "h-[3.8vw]",
};

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape,
  variant = "gradient",
  size = "xs",
  color = "default",
  ...restProps
}) => {
  return (
    <button
      className={`${className} flex flex-row items-center justify-center text-center cursor-pointer whitespace-nowrap ${
        shape && shapes[shape]
      } ${size && sizes[size]} ${
        variant && variants[variant]?.[color]
      }`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  shape: PropTypes.oneOf(["round", "circle", "square"]),
  size: PropTypes.oneOf(["md", "lg", "sm", "xs"]),
  variant: PropTypes.oneOf(["gradient", "outline", "fill", "outlineTransparent"]),
  color: PropTypes.oneOf(["default", "red_600_yellow_800_01", "deep_orange_A200_cc", "gray_50", "yellow_800_red_500", "yellow_900_red_600"]),
};

export { Button };
