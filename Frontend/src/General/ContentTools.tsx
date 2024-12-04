import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import StarRateIcon from "@mui/icons-material/StarRate";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { IconButton, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import PoppingTitle from "./PoppingTitle";

type ContentToolsProps = {
  isOwner: boolean;
  useToolsStore: () => {
    isEditing: boolean;
    setAdding: (value: boolean) => void;
    handleEditClick: () => void;
    handleSaveClick: () => void;
  };
};

const ContentTools = ({ isOwner, useToolsStore }: ContentToolsProps) => {
  const { isEditing, setAdding, handleEditClick, handleSaveClick } =
    useToolsStore();
  return (
    <Stack direction="row">
      {isOwner && (
        <>
          <PoppingTitle topTitle={isEditing ? "Save edit" : "Edit"}>
            <IconButton
              onClick={isEditing ? handleSaveClick : handleEditClick}
              sx={
                {
                  //   visibility: hovering || isEditing ? "visible" : "hidden", // Only show when hovering or editing
                }
              }
            >
              {isEditing ? <CheckIcon /> : <EditIcon />}
            </IconButton>
          </PoppingTitle>

          <PoppingTitle topTitle="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </PoppingTitle>
          <PoppingTitle topTitle="Add">
            <IconButton onClick={() => setAdding(true)}>
              <AddIcon />
            </IconButton>
          </PoppingTitle>
          <PoppingTitle topTitle="Generate">
            <IconButton>
              <AutoAwesomeIcon />
            </IconButton>
          </PoppingTitle>
        </>
      )}
      {!isOwner && (
        <>
          <PoppingTitle topTitle="Add to list">
            <IconButton>
              <PlaylistAddIcon />
            </IconButton>
          </PoppingTitle>
          <PoppingTitle topTitle="Rate">
            <IconButton>
              <StarRateIcon />
            </IconButton>
          </PoppingTitle>
          <PoppingTitle topTitle="Report">
            <IconButton>
              <ReportProblemIcon />
            </IconButton>
          </PoppingTitle>
        </>
      )}
    </Stack>
  );
};

export default ContentTools;
