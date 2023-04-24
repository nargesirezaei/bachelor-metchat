import React from "react";

type FlexProps = {
  inline?: boolean;
  reverse?: boolean;
  vertical?: boolean;
  align?: "start" | "end" | "center";
  content?: "start" | "end" | "center" | "space-between" | "around";
  gap?: string;
  className?: string;
  style?: {};
  children: any;
};

export const Flex: React.FC<FlexProps> = ({
  children,
  vertical = false,
  className = "",
  style = {},
  content,
  align,
  gap,
}) => {
  return (
    <div
      style={{
        ...style,
        justifyContent: content,
        alignItems: align,
        gap: `${gap}rem`,
      }}
      className={`d-flex flex-${vertical ? "column" : "row"} ${className}`}
    >
      {children}
    </div>
  );
};
