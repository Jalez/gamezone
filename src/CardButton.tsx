/** @format */

import { Button } from '@mui/material';
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { keyframes } from '@emotion/react';

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
	color: ${(props) => (props.cts === 'white' ? 'black' : 'white')};
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
	text: string;
	type: string;
	active: boolean;
	matched: boolean;
	onClick: (text: string) => void;
	onChange: (text: string) => void;
}

const MatchCard = ({
	text,
	active,
	onClick,
	matched,
	onChange,
}: MatchCardProps) => {
	useEffect(() => {
		let setTimeoutId: any;
		if (matched) {
			setTimeoutId = setTimeout(() => {
				onChange(text);
			}, 1000);
		}
		return () => clearTimeout(setTimeoutId);
	}, [matched]);

	const handleClick = () => {
		if (!active) onClick(text);
		else onClick('');
	};

	return (
		<StyledBox>
			<StyledCardButton
				variant='contained'
				cts={active ? 'white' : 'black'}
				state={!matched}
				onClick={handleClick}>
				{text}
			</StyledCardButton>
		</StyledBox>
	);
};

export default MatchCard;
