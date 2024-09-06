const sizesT = {
    textxs: "text-[18.5px] font-normal not-italic lg:text-[15px] md:text-[17px] sm:text-[14px] leading-snug",
    textmd: "text-[2.5vw] md:text-[25px] sm:text-[14px] font-normal not-italic leading-tight",
    textmd2: "text-[24px] sm:text-[14px] font-normal not-italic leading-tight",
    texts: "text-[1.25vw] md:text-[14px] font-normal not-italic leading-tight",
    or: "text-[1.146vw] md:text-[16px] font-normal"
};
  
const Text = ({ children, className = "", as, size = "textxs", ...restProps }) => {
    const Component = as || "p";

    return (
        <Component className={`text-black-900 font-roboto ${className} ${sizesT[size]}`} {...restProps}>
        {children}
        </Component>
    );
};

const TextNoto = ({ children, className = "", as, size = "textxs", ...restProps }) => {
    const Component = as || "p";

    return (
        <Component className={`text-black-900 notosans ${className} ${sizesT[size]}`} {...restProps}>
        {children}
        </Component>
    );
};

const TextShadow = ({ children, className = "", as, size = "textxs", ...restProps }) => {
    const Component = as || "p";

    return (
        <Component className={`text-black-900 drop-shadow-custom2 font-roboto ${className} ${sizesT[size]}`} {...restProps}>
        {children}
        </Component>
    );
};

export { Text, TextShadow, TextNoto };