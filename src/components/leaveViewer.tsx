// HolidayViewer.tsx
import React, { useState } from "react";
import { Container, IconButton, Stack } from "@mui/material";
import HolidayCard from "./leaveCard";
import { ILeave } from "../pages/homepage";
import {
  Checklist,
  DeleteOutline,
  DoneAllOutlined,
} from "@mui/icons-material";

interface HolidayViewerProps {
  leaves: ILeave[];
  onDeleteLeave: (uuid: string) => void;
  onApprove: (uuid: string, isApproved: boolean) => void;
}

const HolidayViewer: React.FC<HolidayViewerProps> = ({
  leaves,
  onDeleteLeave,
  onApprove,
}) => {
  // TODO: Add filter and sort
  // TODO: Chnage the approved text to an icon with a tooltip
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedLeaves, setSelectedLeaves] = useState<string[]>([]);

  const handleSelect = (uuid: string) => {
    if (selectedLeaves.includes(uuid)) {
      setSelectedLeaves(selectedLeaves.filter((id) => id !== uuid));
    } else {
      setSelectedLeaves([...selectedLeaves, uuid]);
    }
  };
  const handleBulkDelete = () => {
    selectedLeaves.forEach((uuid) => onDeleteLeave(uuid));
    setSelectedLeaves([]);
  };

  const handleBulkApprove = () => {
    selectedLeaves.forEach((uuid) => onApprove(uuid, true));
    setSelectedLeaves([]);
  };
  return (
    <>
      <Container sx={{ width: "95%", pt: 2 }}>
        <Stack direction="row" spacing={2}>
          <IconButton onClick={() => setIsSelecting(!isSelecting)}>
            <Checklist />
          </IconButton>
          {isSelecting && (
            <>
              <IconButton onClick={handleBulkApprove}>
                <DoneAllOutlined />
              </IconButton>
              <IconButton onClick={handleBulkDelete}>
                <DeleteOutline />
              </IconButton>
            </>
          )}
        </Stack>
      </Container>
      <Stack
        spacing={2}
        sx={{
          alignItems: "center",
          py: "30px",
          overflowY: "auto",
          maxHeight: "calc(75vh - 4em)",
        }}
      >
        {leaves.map((leave) => (
          <HolidayCard
            key={leave.uuid}
            {...leave}
            isSelecting={isSelecting}
            onSelect={handleSelect}
          />
        ))}
      </Stack>
    </>
  );
};

export default HolidayViewer;
