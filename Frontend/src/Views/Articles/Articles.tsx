/** @format */

import { Box } from "@mui/material";
import Article from "./Article";
import { useEffect, useState } from "react";
import { GeneralArticle } from "../../interfaces";
import { useParams } from "react-router-dom";
import { Breadcrumb } from "../../types";
import Games from "./Games/Games";
import { Container } from "../../General/Container";
import Chapters from "./Chapters/Chapters";
import useGameStore from "../../General/Store/gameStore";

type ArticlesProps = {
  handleAddBreadCrumbAndActivate: (newBreadcrumb: Breadcrumb) => void;
};

const Articles = ({ handleAddBreadCrumbAndActivate }: ArticlesProps) => {
  const { title } = useParams<{ title: string }>();
  const [selectedArticle, setSelectedArticle] = useState<GeneralArticle | null>(null);
  const [children, setChildren] = useState<GeneralArticle[]>([]);
  const { initializeGameIds } = useGameStore();

  useEffect(() => {
    if (!title) {
      return;
    }
    handleAddBreadCrumbAndActivate({ href: "/" + title, name: title });
    const fetchByTitle = async (title: string) => {
      const response = await fetch(
        "http://localhost:3000/api/articles/details/" + title
      );
      const openedArticle = await response.json();
      setSelectedArticle(openedArticle);

      // Initialize game IDs in the store
      if (openedArticle.games) {
        const gameIds = openedArticle.games; // Assuming 'games' is an array of IDs
        initializeGameIds(gameIds);
      }

      // Fetch the children of the article
      if (openedArticle.children && openedArticle.children.length > 0) {
        const childArticles = await Promise.all(
          openedArticle.children.map(async (id: string) => {
            const response = await fetch(
              "http://localhost:3000/api/articles/" + id
            );
            return await response.json();
          })
        );
        setChildren(childArticles);
      }
    };
    fetchByTitle(title);
  }, [title]);

  const pageAddHandler = (newArticleDetails: GeneralArticle) => {
    setChildren((prevChildren) => [
      ...prevChildren,
      {
        ...newArticleDetails,
      },
    ]);
  };

  const pageRemoveHandler = (articleId: string) => {
    const newChildren = children.filter((child) => child._id !== articleId);
    setChildren(newChildren);
  };

  return (
    <Box>
      <Container>
        <Article
          title={selectedArticle?.details?.title}
          author={selectedArticle?.details?.author}
          content={selectedArticle?.details?.content}
        />
      </Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Chapters
          article={selectedArticle}
          chapters={children}
          handlePageAdd={pageAddHandler}
          handlePageRemove={pageRemoveHandler}
        />
        <Games />
      </Box>
    </Box>
  );
};

export default Articles;
