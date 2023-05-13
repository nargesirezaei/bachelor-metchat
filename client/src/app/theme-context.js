import { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const useScreenSize = () => useContext(ThemeContext);

export const ThemeProvider = (props) => {
    const [currentSize, setCurrentSize] = useState();

    const onResize = () => {
        var width = window.innerWidth;

        if (width < 768) {
            setCurrentSize("sm");
            return;
        }
        if (width >= 768 && width < 992) {
            setCurrentSize("md");
            return;
        }
        if (width >= 992 && width < 1200) {
            setCurrentSize("lg");
            return;
        }
        if (width >= 1200) {
            setCurrentSize("xl");
            return;
        }
    };

    useEffect(() => {
        onResize();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const isSM = currentSize == "sm" || currentSize == "md" || currentSize == "lg" || currentSize == "xl";
    const isMD = currentSize == "md" || currentSize == "lg" || currentSize == "xl";
    const isLG = currentSize == "lg" || currentSize == "xl";
    const isXL = currentSize == "xl";

    const screen = {
        size: currentSize,
        isXS: true,
        isSM,
        isMD,
        isLG,
        isXL,
        isMobile: !isLG,
    };

    return <ThemeContext.Provider value={screen}>{props.children}</ThemeContext.Provider>;
};
