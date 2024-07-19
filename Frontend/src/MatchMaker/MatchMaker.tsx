/** @format */

import { useEffect, useState } from "react";
import MatchCard from "./MatchCard";
import { Divider, Stack, Typography } from "@mui/material";
import memoryCardsTestData from "./memoryCardsData.json";

import CenterFlex from "../General/CenterFlex";
import { useMatchMakerStore } from "./MatchMakerStore";
import { Card } from "../types";

const MatchMaker = () => {
  // Split the memoryCards array into two arrays, one for terms and one for descriptions, both with the identifier key
  // Take the first 7 terms and descriptions and put them into the termCards and descriptionCards arrays

  const {
    currentTermCards,
    currentDescriptionCards,
    activeTermCard,
    activeDescriptionCard,
    createMemoryCards,
    updateCurrentCards,
    setActiveTermCard,
    setActiveDescriptionCard,
  } = useMatchMakerStore.getState();

  useEffect(() => {
    createMemoryCards(memoryCardsTestData);
    updateCurrentCards();
  }, []);
  // Take the remaining terms and descriptions and put them into the remainingTermCards and remainingDescriptionCards arrays

  useEffect(() => {
    if (activeTermCard === null || activeDescriptionCard === null) return;
    // Check if the active term card and active description card identifiers match
  }, [activeTermCard, activeDescriptionCard]);

  const handleTermClick = (newActiveTermCard: Card | null) => {
    setActiveTermCard(newActiveTermCard);
  };

  const handleDescriptionClick = (newActiveDescriptionCard: Card | null) => {
    setActiveDescriptionCard(newActiveDescriptionCard);
  };

  const handleChange = (oldCard: Card) => {};

  return (
    <Stack direction="row">
      <CenterFlex>
        {currentTermCards.map((card) => {
          return (
            <MatchCard
              cardItem={card}
              key={card.id}
              type="term"
              activeCard={activeTermCard}
              onClick={handleTermClick}
              onChange={handleChange}
              matched={card.matched}
            />
          );
        })}
      </CenterFlex>
      <Divider
        orientation="vertical"
        // move the content in up
        // textAlign="left"
        flexItem
        variant="middle"
        role="presentation"
        //   main color
        style={{ borderColor: "black", color: "white" }}
      >
        <Typography variant="h5">MATCHMAKER</Typography>
        <Typography variant="body1">
          Match the terms with their descriptions
        </Typography>
      </Divider>
      <CenterFlex>
        {currentDescriptionCards.map((card) => {
          return (
            <MatchCard
              key={card.id}
              cardItem={card}
              type="description"
              activeCard={activeDescriptionCard}
              onClick={handleDescriptionClick}
              onChange={handleChange}
              matched={card.matched}
            />
          );
        })}
      </CenterFlex>
    </Stack>
  );
};

export default MatchMaker;
