/** @format */

type ArticleHeaderProps = {
  title?: string;
  author?: string;
};

import { Box, Typography } from "@mui/material";

const ArticleHeader = ({
  title = "Lorem Ipsum",
  author = "John Doe",
}: ArticleHeaderProps) => {
  return (
    <Box>
      <Typography variant="h1">{title}</Typography>
      <Typography variant="body1">By {author}</Typography>
    </Box>
  );
};

export default ArticleHeader;
