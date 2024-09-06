import React from "react";
import PropTypes from "prop-types";

const shapes = {
  square: "rounded-[0px]",
};

const variants = {
  underline: {
    deep_orange_a200: "border-b border-deep_orange-a200 border-solid",
  },
};

const sizes = {
  xs: "h-[5.365vw] md:h-[63px] font-notosans text-[1.146vw] md:text-[14px]",
};

const Input = React.forwardRef(
  (
    {
      className = "",
      name = "",
      placeholder = "",
      type = "text",
      children,
      label = "",
      prefix,
      suffix,
      onChange,
      shape,
      variant = "underline",
      size = "xs",
      color = "deep_orange_A200",
      ...restProps
    },
    ref
  ) => {
    return (
      <div
        className={`flex items-center justify-center cursor-text pt-[20px] md:pt-4 border-b border-deep_orange-a200 border-solid ${shape && shapes[shape]} ${variants[variant]?.[color] || variants[variant]} ${sizes[size]} ${className}`}
      >
        {!!label && label}
        {!!prefix && prefix}
        <input
          ref={ref}
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          className="custom-input"
          {...restProps}
        />
        {!!suffix && suffix}
      </div>
    );
  }
);

Input.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  shape: PropTypes.oneOf(["square"]),
  size: PropTypes.oneOf(["xs"]),
  variant: PropTypes.oneOf(["underline"]),
  color: PropTypes.oneOf(["deep_orange_a200"]),
};

export { Input };