import { Button } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const NavButton = ({ name, route ,dynamicText}) => {
    const router = useHistory();

  return (
    <Button
      style={dynamicText}
      className="nav-itemm"
      onClick={() => {
        router.push(`/${route}`);
      }}
      sx={{ my: 2, mx: 5, display: "block" }}
    >
      {name}
    </Button>
  );
};

export default NavButton;
