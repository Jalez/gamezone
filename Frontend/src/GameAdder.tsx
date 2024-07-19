/** @format */

import React, { useState } from 'react';
import {
  Button,
  IconButton,
  Box,
  Modal,
  Paper,
  Typography,
  Select,
  MenuItem,
  Input,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { newGameInitialData } from './interfaces';

type GameAdder = {
  addGameHandler: (newGameInitialData: newGameInitialData) => void;
};

/**
 * @description This component is used to add a new chapter to the article. By default, only a button is visible that when clicked, opens a form to add a new chapter. Use material ui components to style the form and the button. Make it look stylish and modern
 * @format
 * @param addChapter
 * @returns {JSX.Element}
 */
const GameAdder = ({ addGameHandler }: GameAdder) => {
  const gameTypes = ['mcq', 'drag-drop', 'match', 'fill-in-the-blank'];
  const [gameName, setGameName] = useState('');
  const [gameType, setGameType] = useState('');
  const [generate, setGenerate] = useState(false);
  const [openAdder, setOpenAdder] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here

    addGameHandler({ name: gameName, type: gameType, generate });
    setGameName('');
    setGameType('');
    setGenerate(false);
    handleClose();
  };

  const handleClose = () => {
    setOpenAdder(false);
  };

  return (
    <>
      <Button
        onClick={() => setOpenAdder(true)}
        // Dont automatically put the letters to uppercase
        sx={{ textTransform: 'none', display: 'flex', gap: 1 }}>
        <AddCircleIcon />
        New Game
      </Button>
      <Modal
        open={openAdder}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Paper
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'fit-content',

            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}>
          <Typography variant='h3' sx={{ textAlign: 'center', mt: 0 }}>
            New game
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Add a select to select from a list of names */}

            <Typography>Game Name: </Typography>
            <Input
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
            />
            <Typography>Game Type: </Typography>
            <Select
              value={gameName}
              onChange={(e) => setGameType(e.target.value as string)}>
              {gameTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Typography>Generate Game content?</Typography>
              <IconButton
                onClick={() => setGenerate(!generate)}
                sx={{ color: generate ? 'green' : 'red' }}>
                {generate ? 'Yes' : 'No'}
              </IconButton>
            </Box>
            <Button type='submit' variant='contained' color='primary'>
              Add Game
            </Button>
          </Box>
        </Paper>
      </Modal>
    </>
  );
};

export default GameAdder;
