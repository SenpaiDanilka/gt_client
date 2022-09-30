import React, {ReactNode} from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

const BaseContainer: React.FC<Props> = ({
  children,
  className
}) => {
  return (
    <div className={`shadow-md bg-white mx-auto rounded-2xl ${className}`}>
      { children }
    </div>
  );
};

export default BaseContainer;