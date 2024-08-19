/** @format */

import React, { useEffect, useState } from 'react';
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
import { mcq, newGameInitialData } from './interfaces';

type GameAdderProps = {
  addGameHandler: (newGameInitialData: newGameInitialData) => void;
};

const GameForm = ({
  gameTypes,
  gameName,
  gameType,
  generate,
  generateContent,
  generateMainArticle,
  setGameName,
  setGameType,
  setGenerate,
  setGenerateContent,
  setGenerateMainArticle,
  onSubmit,
  mcqs,
  mcqAddHandler,
}: {
  gameTypes: string[];
  gameName: string;
  gameType: string;
  generate: boolean;
  generateContent: boolean;
  generateMainArticle: boolean;
  setGameName: React.Dispatch<React.SetStateAction<string>>;
  setGameType: React.Dispatch<React.SetStateAction<string>>;
  setGenerate: React.Dispatch<React.SetStateAction<boolean>>;
  setGenerateContent: React.Dispatch<React.SetStateAction<boolean>>;
  setGenerateMainArticle: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: () => void;
  mcqs: mcq[];
  mcqAddHandler: (newMcq: mcq) => void;
}) => {
  return (
    <Box
      component='form'
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography>Game Name: </Typography>
      <Input value={gameName} onChange={(e) => setGameName(e.target.value)} />
      <Typography>Game Type: </Typography>
      <Select
        value={gameType}
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
        <CheckBox
          checked={generate}
          setChecked={setGenerate}
          checkboxText='Generate content?'
        />
        {generate && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CheckBox
              checked={generateMainArticle}
              setChecked={setGenerateMainArticle}
              checkboxText='Use main article for content?'
            />

            <CheckBox
              checked={generateContent}
              setChecked={setGenerateContent}
              checkboxText='Use child content for content?'
            />
          </Box>
        )}
        {gameType === 'mcq' && (
          <MCQForm mcqs={mcqs} mcqAddHandler={mcqAddHandler} />
        )}
      </Box>
      <Button type='submit' variant='contained' color='primary'>
        Add Game
      </Button>
    </Box>
  );
};

type CheckBoxProps = {
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
  checkboxText: string;
};

const CheckBox = ({ checked, setChecked, checkboxText }: CheckBoxProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Typography>{checkboxText}</Typography>
      <IconButton
        onClick={() => setChecked(!checked)}
        sx={{ color: checked ? 'green' : 'red' }}>
        {checked ? 'Yes' : 'No'}
      </IconButton>
    </Box>
  );
};

const GameModal = ({
  open,
  handleClose,
  gameTypes,
  addGameHandler,
}: {
  open: boolean;
  handleClose: () => void;
  gameTypes: string[];
  addGameHandler: (newGameInitialData: newGameInitialData) => void;
}) => {
  const [gameName, setGameName] = useState('');
  const [gameType, setGameType] = useState('');
  const [generate, setGenerate] = useState(false);
  const [generateContent, setGenerateContent] = useState(false);
  const [generateMainArticle, setGenerateMainArticle] = useState(false);
  const [mcqs, setMcqs] = useState<mcq[]>([]);

  useEffect(() => {
    console.log('gameType', gameType);
  }, [gameType]);

  const handleSubmit = () => {
    addGameHandler({
      name: gameName,
      type: gameType,
      generateMainArticle,
      generateContent,
    });
    setGameName('');
    setGameType('');
    setGenerate(false);
    setGenerateContent(false);
    setGenerateMainArticle(false);
    setMcqs([]);
    handleClose();
  };

  const handleMcqAdd = (newMcq: mcq) => {
    setMcqs([...mcqs, newMcq]);
  };
  return (
    <Modal
      open={open}
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
        <GameForm
          gameTypes={gameTypes}
          gameName={gameName}
          gameType={gameType}
          generate={generate}
          generateContent={generateContent}
          generateMainArticle={generateMainArticle}
          setGameName={setGameName}
          setGameType={setGameType}
          setGenerate={setGenerate}
          setGenerateContent={setGenerateContent}
          setGenerateMainArticle={setGenerateMainArticle}
          mcqs={mcqs}
          mcqAddHandler={handleMcqAdd}
          onSubmit={handleSubmit}
        />
      </Paper>
    </Modal>
  );
};

const GameAdder = ({ addGameHandler }: GameAdderProps) => {
  const gameTypes = ['mcq', 'drag-drop', 'match', 'fill-in-the-blank'];
  const [openAdder, setOpenAdder] = useState(false);

  const handleClose = () => {
    setOpenAdder(false);
  };

  return (
    <>
      <Button
        onClick={() => setOpenAdder(true)}
        sx={{
          width: '130px',
          textTransform: 'none',
          display: 'flex',
          gap: 1,
          justifyContent: 'flex-start',
        }}>
        <AddCircleIcon />
        New Game
      </Button>
      <GameModal
        open={openAdder}
        handleClose={handleClose}
        gameTypes={gameTypes}
        addGameHandler={addGameHandler}
      />
    </>
  );
};

const MCQForm = ({
  mcqs,
  mcqAddHandler,
}: {
  mcqs: mcq[];
  mcqAddHandler: (newMcq: mcq) => void;
}) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [answer, setAnswer] = useState('');
  const [solvedTimes, setSolvedTimes] = useState(0);
  const [sessionAttempts, setSessionAttempts] = useState(0);

  const handleAdd = () => {
    mcqAddHandler({
      question,
      options,
      answer,
      solvedTimes: 0,
      sessionAttempts: 0,
    });
    setQuestion('');
    setOptions([]);
    setAnswer('');
    setSolvedTimes(0);
    setSessionAttempts(0);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Typography>MCQ Form</Typography>
      <Input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder='Question'
      />
      <Input
        value={options}
        onChange={(e) => setOptions(e.target.value.split(','))}
        placeholder='Options'
      />
      <Input
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder='Answer'
      />

      <Button onClick={handleAdd}>Add MCQ</Button>
    </Box>
  );
};

export default GameAdder;
