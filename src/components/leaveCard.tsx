import {
  Card,
  CardContent,
  Typography,
  Chip,
  Checkbox,
  Stack,
  CardActions,
} from "@mui/material";
import { LeaveType as LeaveType, ILeave } from "../pages/homepage";
import theme from "../style/theme";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface LeaveCardProps extends ILeave {
  isSelecting: boolean;
  onSelect: (uuid: string) => void;
}

const getColorForLeaveType = (type: LeaveType) => {
  return type === "sick"
    ? theme.palette.error.dark
    : theme.palette.success.main;
};

const HolidayCard: React.FC<LeaveCardProps> = (props: LeaveCardProps) => {
  return (
    <Stack
      direction="row"
      spacing={0}
      sx={{
        width: "85%",
        minHeight: "55px",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      {props.isSelecting && (
        <Checkbox
          icon={<CheckCircleOutlineIcon />}
          checkedIcon={<CheckCircleIcon />}
          onChange={() => props.onSelect(props.uuid)}
        />
      )}
      <Card
        raised={true}
        sx={{
          width: "85%",
          minHeight: "55px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          borderRadius: 5,
          boxShadow: 3,
          py: 0,
          backgroundColor: getColorForLeaveType(props.type),
        }}
      >
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            p: 0,
          }}
        >
          <Typography component="div" color="white">
            {new Date(props.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>
          <Typography color="white">
            {props.type.charAt(0).toUpperCase() + props.type.slice(1)}
          </Typography>

          <Chip
            label={props.halfDay ? "Half Day" : "Full Day"}
            sx={{ backgroundColor: "white" }}
          />
          <Typography color="white">
            {props.approved ? "Approved" : "Not Approved"}
          </Typography>
        </CardContent>
        <CardActions />
      </Card>
    </Stack>
  );
};

export default HolidayCard;
