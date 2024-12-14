import React, { useEffect, useState } from "react";

import { TextField, Typography, Stack, Box, TypographyProps } from "@mui/material";


type EditableTextProps = {
  text: string;
  onSave?: (newText: string) => void;
  onUpdate?: (newText: string) => void;
  isSaving: boolean;
  isEditing: boolean;
  fontSize: string;
  placeholder: string;
  variant?: TypographyProps["variant"];
};

const EditableText: React.FC<EditableTextProps> =({ text, onSave, onUpdate, isSaving, isEditing, fontSize, placeholder, variant = "body1" }) => {
  const [currentText, setCurrentText] = useState<string>(text);

  useEffect(() => {
    setCurrentText(text);
  }, [text]);

  useEffect(() => {
    isSaving && onSave && onSave(currentText);
  }, [isSaving]);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentText(event.target.value);
    onUpdate && onUpdate(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    //if the user presses enter, save the text
    if (event.key === "Enter") {
      handleSaveClick();
    }
  };

  const handleSaveClick = (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault();
    onSave && onSave(currentText);
  };



  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flex: 1,
        }}
      >
        {isEditing ? (
          // <form onSubmit={handleSaveClick} style={{ width: "100%", margin: 0, padding: 0 }}>
            <TextField
              
              value={currentText}
              onChange={handleTextChange}
              onKeyDown={handleKeyPress}
              size="small"
              variant="standard"
              placeholder={placeholder}
              // autoFocus
              multiline
              fullWidth
              sx={{
                fontSize: fontSize,
                padding: 0,
                margin: 0,
                // Remove underline and padding
                "& .MuiInputBase-root": {
                  padding: 0,
                  margin: 0,
                  fontSize: "inherit",
                },
                "& .MuiInput-underline:before": {
                  borderBottom: "none",
                },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                  borderBottom: "none",
                },
                "& .MuiInput-underline:after": {
                  borderBottom: "none",
                },
                // Remove padding from the input
                "& .MuiInputBase-input": {
                  padding: 0,
                  margin: 0,
                  fontSize: "inherit",
                  lineHeight: "2",
                },
                // Remove padding from the input
                "& .MuiInputBase-inputMultiline": {
                  padding: 0,
                  margin: 0,
                  fontSize: "inherit",
                  lineHeight: "1.5",
                },
              }}
            />
          // </form>
        ) : (
          <Typography
           variant={variant}
            sx={{
              width: "100%",
              lineHeight: "1.5", 
              wordBreak: "break-word", 
              flex: 1,
              padding: 0,
              margin: 0,
              fontSize: fontSize,
                whiteSpace: "pre-wrap",
            }}
          >
            {currentText}
          </Typography>
        )}
      </Box>
    </Stack>
  );
};

export default EditableText;
