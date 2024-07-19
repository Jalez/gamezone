/** @format */
/**
 * @description This is a Score component, which is used to display the score of the user in the game.
 * It gets the score from the redux store and displays it
 */

import { Typography } from '@mui/material';

const Score = () => {
	const score = useSelector((state: RootState) => state.score);
	return (
		<div>
			<Typography variant='h6'>Score: {score}</Typography>
		</div>
	);
};
