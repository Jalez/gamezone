/** @format */

import { Button } from "@mui/material";
import { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { keyframes } from "@emotion/react";
import { Card } from "../types";

const appear = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const disappear = keyframes`

    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`;

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0,-4px,0);
  }
`;

interface StyledCardButtonProps {
  cts: string;
  state: boolean;
}
const StyledCardButton = styled(Button)<StyledCardButtonProps>`
  background-color: ${(props) => props.cts};
  color: ${(props) => (props.cts === "white" ? "#222" : "white")};
  transition: background-color 0.5s ease;
  animation: ${(props) => (props.state ? appear : disappear)} 1s ease;
  &:hover {
    background-color: ${(props) => props.cts};
  }
  opacity: ${(props) => (props.state ? 1 : 0)};
  width: 300px;
  height: 100px;
`;

const StyledBox = styled(Box)`
  margin: 20px;
`;

interface MatchCardProps {
  cardItem: Card;
  type: string;
  activeCard: Card | null;
  matched: boolean;
  onClick: (newCard: Card | null) => void;
  onChange: (oldCard: Card) => void;
}

const MatchCard = ({
  cardItem,
  activeCard,
  onClick,
  matched,
  onChange,
}: MatchCardProps) => {
  useEffect(() => {
    let setTimeoutId: any;
    if (matched) {
      setTimeoutId = setTimeout(() => {
        onChange(cardItem);
      }, 1000);
    }
    return () => clearTimeout(setTimeoutId);
  }, [matched]);

  const handleClick = () => {
    if (!activeCard) onClick(cardItem);
    else onClick(null);
  };

  return (
    <StyledBox>
      <StyledCardButton
        variant="contained"
        cts={activeCard ? "white" : "#111"}
        state={!matched}
        onClick={handleClick}
      >
        {cardItem.text}
      </StyledCardButton>
    </StyledBox>
  );
};

export default MatchCard;
