import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import apiClient from "../api/axios";
import { savedEventsResponseType } from "../api/responseType";
import { Grid, Typography } from "@mui/material";
import CustomCard from "../components/CustomCard";

const Saved = () => {
  const [savedEvents, setSavedEvents] = useState<savedEventsResponseType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get<savedEventsResponseType[]>("events/saved", {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setSavedEvents(res.data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />

      {!loading && (
        <Grid container spacing={2} p={"10px"} marginTop={"8px"}>
          {savedEvents && savedEvents.length > 0 ? (
            savedEvents.map((data, index) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <CustomCard
                    title={data.name}
                    date={data.date}
                    description={data.description}
                    showSaveBtn={false}
                  />
                </Grid>
              );
            })
          ) : (
            <Typography
              variant="body1"
              color="#000"
              fontSize={"22px"}
              fontWeight={"bold"}
              display={"flex"}
              justifyContent={"center"}
              marginTop={"30px"}
              width={"100%"}
            >
              No Event Found
            </Typography>
          )}
        </Grid>
      )}
    </>
  );
};

export default Saved;
