// GameAdder.tsx
import React, { useContext, useState } from "react";
import {
  Button,
  MenuItem,
  Menu,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import useGameStore from "../../../General/Store/gameStore";
import { AuthContext } from "../../../AuthContext";

const GameAdder = () => {
  const {user} = useContext(AuthContext);
  const { handleAddNewGame } = useGameStore();
  const gameTypes = ["mcq", "matchmaker", "wordfill", "hangman", "timeline", "debate"];
  const [anchorEL, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEL);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const newGamePickHandler = (gameType: string) => {
    if(!user) {
      console.error("User not logged in. Abort new game creation.");
      return;
    }
    handleAddNewGame(gameType, user);
    setAnchorEl(null);
  }

  return (
    <>
      <Button
        onClick={handleClick}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{
          width: "130px",
          textTransform: "none",
          display: "flex",
          gap: 1,
          justifyContent: "flex-start",
        }}
      >
        <AddCircleIcon />
        New Game
      </Button>
      <Menu
        id="game-adder-menu"
        anchorEl={anchorEL}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'game-adder-menu',
        }}
      >
        {gameTypes.map((type) => (
          <MenuItem
            onClick={() => newGamePickHandler(type)}
            key={type}>{type}</MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default GameAdder;
