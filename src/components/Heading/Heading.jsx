const sizesH = {
    texts: "text-[27.7px] font-medium lg:text-[30px] md:text-[20px] sm:text-[14px]",
    textlg: "font-medium text-[49px] sm:text-[26px] xl:text-[72px] md:text-[38px]",
    textxl: "text-[56px] font-medium lg:text-[72px] md:text-[48px] sm:text-[26px]",
    headingxs: "text-[18px] font-semibold lg:text-[20px] md:text-[22px]",
    headings: "text-[3.75vw] md:text-[40.5px] sm:text-[26px] font-bold",
    headingC: "text-[27.7px] sm:text-[16px] font-medium",
    headingLogin: "text-[3.333vw] md:text-[34px] font-medium leading-tight"
  };
  
  const Heading = ({ children, className = "", size = "texts", as, ...restProps }) => {
    const Component = as || "h6";
  
    return (
      <Component className={`text-white-900 font-roboto ${className} ${sizesH[size]}`} {...restProps}>
        {children}
      </Component>
    );
  };

  const HeadingShadow = ({ children, className = "", size = "texts", as, ...restProps }) => {
    const Component = as || "h6";
  
    return (
      <Component className={`text-white-900 font-roboto drop-shadow-custom ${className} ${sizesH[size]}`} {...restProps}>
        {children}
      </Component>
    );
  };

  export { Heading, HeadingShadow };