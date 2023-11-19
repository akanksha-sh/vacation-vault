// src/App.tsx
import { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import {
  addLeaveToDB,
  deleteLeaveFromDB,
  readLeaves,
  updateLeaveApprovalInDB,
} from "../firestore/functions";
import { isWorkingDay } from "../utils/helper";
import { v4 as uuidv4 } from "uuid";
import HolidayViewer from "../components/leaveViewer";
import LeaveSubmissionForm from "../components/leaveSubmission";
import LeaveStats from "../components/leaveStats";

export interface ILeave {
  uuid: string;
  date: Date;
  type: LeaveType;
  halfDay: boolean;
  approved: boolean;
}

export type LeaveType = "sick" | "vacation";

function Homepage() {
  const [refresh, setRefresh] = useState(false);
  const [leaves, setLeaves] = useState<ILeave[]>([]);
  const [stats, setStats] = useState({
    sickDays: 0,
    vacationDays: 0,
    vacationDaysRemaining: 0,
  });

  // TODO (improve): rolledOverDays and assignedVacationDays need to be extracted from firebase
  const rolledOverDays = 0;
  const assignedVacationDays = 21;
  const totalVacationDays = assignedVacationDays + rolledOverDays;

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await readLeaves();
        setLeaves(data);
      } catch (error) {
        console.error("Error fetching Leaves:", error);
      }
    }
    fetchData();
  }, [refresh]);

  useEffect(() => {
    let sickDays = 0;
    let vacationDays = 0;

    leaves.forEach((leave) => {
      const daysToAdd = leave.halfDay ? 0.5 : 1;
      if (leave.type === "sick") {
        sickDays += daysToAdd;
      } else {
        vacationDays += daysToAdd;
      }
    });

    const vacationDaysRemaining = totalVacationDays - vacationDays;
    setStats({ sickDays, vacationDays, vacationDaysRemaining });
  }, [leaves, totalVacationDays]);

  const handleAddLeave = async (
    startDate: Date | null,
    endDate: Date | null,
    leaveType: LeaveType,
    halfDay: boolean,
    approved: boolean
  ) => {
    if (startDate && endDate) {
      let current = new Date(startDate);

      while (current <= endDate) {
        if (isWorkingDay(current)) {
          try {
            await addLeaveToDB({
              uuid: uuidv4(),
              date: new Date(current),
              halfDay,
              type: leaveType,
              approved: approved,
            });
          } catch (error) {
            console.error("Error adding the leave:", error);
          }
        }

        current.setDate(current.getDate() + 1); // Move to the next day
      }
      setRefresh(!refresh);
    }
  };

  const handleDeleteLeave = async (uuid: string) => {
    console.log("deleting");
    try {
      await deleteLeaveFromDB(uuid);
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error deleting the leave:", error);
    }
  };

  const handleApproveLeave = async (uuid: string, isApproved: boolean) => {
    try {
      await updateLeaveApprovalInDB(uuid, isApproved);
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error updating leave approval:", error);
    }
  };

  return (
    <Container disableGutters maxWidth="xl" sx={{ height: "92vh" }}>
      <LeaveStats
        sickDays={stats.sickDays}
        vacationDays={stats.vacationDays}
        vacationDaysRemaining={stats.vacationDaysRemaining}
        rolledOverDays={rolledOverDays}
        assignedVacationDays={assignedVacationDays}
      />
      <Container disableGutters maxWidth="xl" sx={{ height: "79vh" }}>
        <Grid container sx={{ height: "100%" }}>
          <Grid
            item
            md={5}
            sx={{
              backgroundColor: "#eae0d5",
              position: "relative",
            }}
          >
            <LeaveSubmissionForm onAddLeave={handleAddLeave} />
          </Grid>

          <Grid item md={7} sx={{ height: "100%" }}>
            <HolidayViewer
              leaves={leaves}
              onDeleteLeave={handleDeleteLeave}
              onApprove={handleApproveLeave}
            />
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}

export default Homepage;
