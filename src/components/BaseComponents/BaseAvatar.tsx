import React, {ReactNode} from "react";
import {Avatar} from "@mui/material";

interface Props {
  image?: string;
  alt?: string;
  size?: number;
  children?: ReactNode;
  className?: string;
  variant?: "square" | "circular" | "rounded";
}

const BaseAvatar: React.FC<Props> = ({
  image,
  alt,
  children,
  size,
  className,
  variant
}) => {
  return (
    <Avatar
      src={image}
      alt={alt}
      sx={{ width: size, height: size }}
      variant={variant}
      className={className}
    >
      {children}
    </Avatar>
  );
};

export default BaseAvatar;