// HolidayViewer.tsx
import React, { useState } from "react";
import { Container, IconButton, Menu, MenuItem, Stack } from "@mui/material";
import HolidayCard from "./leaveCard";
import { ILeave } from "../pages/homepage";
import {
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
  Checklist,
  DeleteOutline,
  DoneAllOutlined,
  FilterAlt,
} from "@mui/icons-material";

interface HolidayViewerProps {
  leaves: ILeave[];
  onDeleteLeave: (uuid: string) => void;
  onApprove: (uuid: string, isApproved: boolean) => void;
}

type FilterPreferences = "all" | "sick" | "vacation" | "halfDay" | "fullDay";

const HolidayViewer: React.FC<HolidayViewerProps> = ({
  leaves,
  onDeleteLeave,
  onApprove,
}) => {
  // TODO: Chnage the approved text to an icon with a tooltip
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedLeaves, setSelectedLeaves] = useState<string[]>([]);
  const [filterPreference, setFilterPreference] =
    useState<FilterPreferences>("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

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

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleFilterSelect = (filter: FilterPreferences) => {
    setFilterPreference(filter);
    handleFilterClose();
  };

  // Filtered and Sorted leaves
  const filteredLeaves = leaves
    .filter((leave) => {
      switch (filterPreference) {
        case "sick":
          return leave.type === "sick";
        case "vacation":
          return leave.type === "vacation";
        case "halfDay":
          return leave.halfDay;
        case "fullDay":
          return !leave.halfDay;
        default:
          return true;
      }
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.date.getTime() - b.date.getTime();
      }
      return b.date.getTime() - a.date.getTime();
    });

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
          <IconButton onClick={toggleSortOrder}>
            {sortOrder === "asc" ? (
              <ArrowDownwardOutlined />
            ) : (
              <ArrowUpwardOutlined />
            )}
          </IconButton>
          <IconButton onClick={handleFilterClick}>
            <FilterAlt />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleFilterClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem onClick={() => handleFilterSelect("all")}>All</MenuItem>
            <MenuItem onClick={() => handleFilterSelect("sick")}>
              Sick Days
            </MenuItem>
            <MenuItem onClick={() => handleFilterSelect("vacation")}>
              Vacation Days
            </MenuItem>
            <MenuItem onClick={() => handleFilterSelect("halfDay")}>
              Half Days
            </MenuItem>
            <MenuItem onClick={() => handleFilterSelect("fullDay")}>
              Full Days
            </MenuItem>
          </Menu>
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
        {filteredLeaves.map((leave) => (
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
