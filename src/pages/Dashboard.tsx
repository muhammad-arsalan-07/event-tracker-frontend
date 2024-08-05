import {
  Box,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import CustomCard from "../components/CustomCard";
import Navbar from "../components/Navbar";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ProductsResponseType } from "../api/responseType";
import apiClient from "../api/axios";
import { Bounce, toast } from "react-toastify";

const Dashboard = () => {
  const [eventsList, setEventsList] = useState<ProductsResponseType>();
  const [searchQuery, setSearchQuery] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<ProductsResponseType>("https://dummyjson.com/products?limit=20")
      .then((res) => {
        setEventsList(res.data);
        setLoading(false);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      axios
        .get<ProductsResponseType>(
          `https://dummyjson.com/products/search?limit=20&q=${e.target.value}`
        )
        .then((response) => {
          setEventsList(response.data);
        });
    }, 500);
  };

  const saveHandler = async (
    title: string,
    description: string,
    date: string
  ) => {
    try {
      const body = {
        name: title,
        date,
        location: "default",
        description,
      };
      await apiClient.post("events/save", body, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      toast.success('event saved successfully', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
    } catch (error: any) {
      toast.error(error?.response?.data?.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          margin: "10px",
        }}
      >
        <TextField
          id="standard-basic"
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={handleChange}
          sx={{
            width: "100%",
          }}
        />
      </Box>

      {!loading && (
        <Grid container spacing={2} p={"10px"}>
          {eventsList && eventsList.products.length > 0 ? (
            eventsList.products.map((data, index) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <CustomCard
                    title={data.title}
                    date={data.meta.createdAt}
                    description={data.description}
                    showSaveBtn
                    saveBtnHandler={() =>
                      saveHandler(
                        data.title,
                        data.description,
                        data.meta.createdAt
                      )
                    }
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

export default Dashboard;
