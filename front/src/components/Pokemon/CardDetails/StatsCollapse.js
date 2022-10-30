import React from "react";
import { Button, CardContent, Collapse, Typography } from "@mui/material";

const StatsCollapse = ({ expanded, pokemon, dynamicText }) => {
  return (
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
        <Typography style={dynamicText} paragraph>
          STATS:
        </Typography>
        <Typography style={dynamicText} paragraph>
          {pokemon.stats.map((stat, idx) => (
            <Button
              className="disbtn"
              variant="outlined"
              key={idx}
              style={dynamicText}
            >
              {stat.stat.name}: {stat.base_stat}{" "}
            </Button>
          ))}
        </Typography>
      </CardContent>
    </Collapse>
  );
};

export default StatsCollapse;
