import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import moment from "moment";

type CustomCardPropType = {
  title: string;
  date: string;
  description: string;
  showSaveBtn: boolean;
  saveBtnHandler?: () => void
};

const CustomCard = (props: CustomCardPropType) => {
  return (
    <Card
      sx={{
        backgroundColor: "#f5f5f5", // Light gray background
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow
        borderRadius: "8px",
        height: "100%",
      }}
    >
      <CardContent>
        <Typography
          variant="body1"
          color="#000"
          fontWeight={"bold"}
          className="card-title"
        >
          {props.title}
        </Typography>
        <Typography variant="body2" color="#666">
          Created on {moment(props.date).format("MMMM DD, YYYY")}
        </Typography>
        <Typography
          variant="body1"
          color="black"
          className="card-description"
          marginTop={"20px"}
        >
          {props.description}
        </Typography>
      </CardContent>
      {props.showSaveBtn && (
        <CardActions>
          <Button
            size="small"
            sx={{
              color: "black",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
            onClick={props.saveBtnHandler}
          >
            Save
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default CustomCard;
