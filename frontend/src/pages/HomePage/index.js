import { Box, Container, Stack } from "@mui/system";
import roketry from "../../Assets/roketry.jpeg";
import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Fab,
  Typography,
} from "@mui/material";
import { movieData } from "../../common/StaticData";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();
  const [viewMore, setViewMore] = useState(4);
  const [expended, setExpended] = useState(false);

  const handleOnViewMore = () => {
    if (viewMore === 4) {
      setViewMore(movieData.length);
      setExpended(true);
    } else {
      setViewMore(4);
      setExpended(false);
    }
  };

  const hadleOnBookTicket = (item) => {
    navigate("/bookTicket", { state: { bookMovie: item } });
  };

  return (
    <Box sx={{ padding: "20px 0" }}>
      <Container>
        <img src={roketry} alt="mainPoster" width="100%" height={350} />
        <Box>
          <Typography m={5} textAlign="center" variant="h4">
            Latest Realesed
          </Typography>
          <Stack
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
            }}
          >
            {movieData.slice(0, viewMore).map((item, i) => (
              <Card sx={{ borderRadius: "20px" }} key={i}>
                <CardMedia
                  sx={{ height: 180 }}
                  image={item.image}
                  title={item.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.date}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Fab
                    variant="extended"
                    color="primary"
                    size="medium"
                    sx={{ width: "100%" }}
                    onClick={() => hadleOnBookTicket(item)}
                  >
                    Book Now
                  </Fab>
                </CardActions>
              </Card>
            ))}
          </Stack>
          <Box m={5} textAlign="center" variant="h4">
            <Button
              size="medium"
              variant="outlined"
              onClick={(e) => handleOnViewMore(e)}
            >
              {!expended ? "View More" : "View Less"}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
