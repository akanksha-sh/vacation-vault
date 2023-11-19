import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Typography,
  Grid
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { LeaveType } from "../pages/homepage";
import dayjs from "dayjs";
interface LeaveSubmissionFormProps {
  onAddLeave: (
    startDate: Date | null,
    endDate: Date | null,
    leaveType: LeaveType,
    halfDay: boolean,
    approved: boolean
  ) => void;
}

const LeaveSubmissionForm: React.FC<LeaveSubmissionFormProps> = ({
  onAddLeave,
}) => {
  // TODO: End date month should be startdate monh
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [leaveType, setLeaveType] = useState<"sick" | "vacation">("vacation");
  const [halfDay, setHalfDay] = useState(false);
  const [approved, setApproved] = useState(false);

  const handleSubmit = () => {
    onAddLeave(startDate, endDate, leaveType, halfDay, approved);
    // Reset form fields
    setStartDate(null);
    setEndDate(null);
    setHalfDay(false);
    setLeaveType("vacation");
    setApproved(false);
  };

  useEffect(() => {
    if (startDate && !endDate) {
      setEndDate(startDate);
    }
  }, [startDate, endDate]);
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (file) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const text = e.target?.result;
        try {
          // Parse the file content
          const data = JSON.parse(text as string);

          // Iterate over each leave item and call onAddLeave
          for (const item of data) {
            await onAddLeave(
              new Date(item.startDate),
              new Date(item.endDate),
              item.leaveType,
              item.halfDay,
              item.approved
            );
          }
        } catch (error) {
          console.error("Error processing the file:", error);
        }
      };

      reader.readAsText(file);
    }
  };
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "75%",
        py: "2em",
      }}
    >
      <Stack
        spacing={3}
        sx={{
          alignItems: "center",
          py: "30px",
          overflowY: "auto",
          width: "100%",
        }}
      >
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          ADD LEAVE
        </Typography>
        <input
          accept=".csv, application/json"
          style={{ display: "none" }}
          id="file-upload"
          type="file"
          onChange={handleFileUpload}
        />
        <label htmlFor="file-upload">
          <Button variant="contained" component="span">
            Upload
          </Button>
        </label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <FormControl fullWidth margin="normal">
            <DatePicker
              label="Select Start Date"
              value={startDate ? dayjs(startDate) : null}
              onChange={(newValue) =>
                setStartDate(newValue ? newValue.toDate() : null)
              }
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <DatePicker
              label="Select End Date"
              value={endDate ? dayjs(endDate) : dayjs(startDate)}
              onChange={(newValue) =>
                setEndDate(newValue ? newValue.toDate() : startDate)
              }
              minDate={startDate ? dayjs(startDate) : dayjs()}
              disabled={!startDate}
            />
          </FormControl>
        </LocalizationProvider>

        <FormControl fullWidth margin="normal">
          <InputLabel>Type of Leave</InputLabel>
          <Select
            value={leaveType}
            onChange={(event) =>
              setLeaveType(event.target.value as "sick" | "vacation")
            }
          >
            <MenuItem value="sick">Sick Day</MenuItem>
            <MenuItem value="vacation">Vacation Day</MenuItem>
          </Select>
        </FormControl>

        <Grid container>
          <Grid item md={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={approved}
                  onChange={(event) => setApproved(event.target.checked)}
                />
              }
              label="Approved"
            />
          </Grid>
          <Grid item md={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={halfDay}
                  onChange={(event) => setHalfDay(event.target.checked)}
                />
              }
              label="Half Day"
            />
          </Grid>
        </Grid>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Stack>
    </Container>
  );
};

export default LeaveSubmissionForm;
