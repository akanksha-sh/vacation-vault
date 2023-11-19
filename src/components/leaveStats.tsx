import React from "react";
import { Box, Typography, Container, Tooltip } from "@mui/material";
import theme from "../style/theme";

interface LeaveStatsProps {
  sickDays: number;
  vacationDays: number;
  vacationDaysRemaining: number;
  rolledOverDays: number;
  assignedVacationDays: number;
}

const LeaveStats: React.FC<LeaveStatsProps> = ({
  sickDays,
  vacationDays,
  vacationDaysRemaining,
  rolledOverDays,
  assignedVacationDays,
}) => {
  const vacationTooltipTitle = (
    <React.Fragment>
      <Typography color="inherit">Vacation Breakdown</Typography>
      <p>Assigned Vacation Days: {assignedVacationDays}</p>
      <p>Rolled Over Days: {rolledOverDays}</p>
    </React.Fragment>
  );

  return (
    <Container
      disableGutters
      maxWidth="xl"
      sx={{
        height: "13vh",
        backgroundColor: theme.palette.primary.light,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        color: "white",
      }}
    >
      <Tooltip title={vacationTooltipTitle} arrow placement="right">
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4">{vacationDaysRemaining}</Typography>
          <Typography variant="subtitle1">Vacations Remaining</Typography>
        </Box>
      </Tooltip>

      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4">{vacationDays}</Typography>
        <Typography variant="subtitle1">Vacations Taken</Typography>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4">{sickDays}</Typography>
        <Typography variant="subtitle1">Sick Days Taken</Typography>
      </Box>
    </Container>
  );
};

export default LeaveStats;
