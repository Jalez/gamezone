import ChapterStepper from "./ChapterStepper";
import ChapterDisplayer from "./ChapterDisplayer";
import { Details, Game, GeneralArticle } from "../../../interfaces";
import { useEffect, useState } from "react";
import { Container } from "../../../General/Container";

type ChaptersProps = {
  article: GeneralArticle | null;
  chapters: GeneralArticle[];
  handlePageAdd: (newPage: GeneralArticle) => void;
  handlePageRemove: (pageId: string) => void;
};

const Chapters = ({
  article,
  chapters,
  handlePageAdd,
  handlePageRemove,
}: ChaptersProps) => {
  const [selectedChapter, setSelectedChapter] =
    useState<GeneralArticle | null>();

  useEffect(() => {
    if (chapters.length === 0) {
      return;
    }
    setSelectedChapter(chapters[0]);
  }, [chapters]);

  const handleChapterChoise = (selectedChapter: GeneralArticle) => {
    setSelectedChapter(selectedChapter);
  };

  const handleArticleAdd = (newArticleDetails: Details, games: Game[]) => {
    //Get the sibling ids
    if (article === null) {
      return;
    }
    const siblings = chapters;
    const newArticle: GeneralArticle = {
      creators: [],
      parent: article._id || null,
      children: [],
      siblings: siblings || [],
      details: newArticleDetails,
      games: games,
    };
    // // add new chapter to the article
    const addArticle = async (newArticle: GeneralArticle) => {
      const response = await fetch("http://localhost:3000/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newArticle),
      });
      const data = await response.json();

      handlePageAdd(data);
    };
    addArticle(newArticle);

  };

  const handleArticleRemove = (articleId?: string) => {
    if (!articleId) {
      return;
    }
    const removeArticle = async () => {
      const response = await fetch(
        "http://localhost:3000/api/articles/" + articleId,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        console.log("Error deleting article");
        return;
      }

      handlePageRemove(articleId);
      setSelectedChapter(null);
    };
    removeArticle();
  };

  const handleChapterUpdate = (updatedChapter: GeneralArticle) => {
    setSelectedChapter(updatedChapter);
  }



  return (
    <Container>
      <ChapterStepper
        steps={chapters}
        selectChapterHandler={handleChapterChoise}
        handleChapterAdd={handleArticleAdd}
      />
      {selectedChapter && (
        <ChapterDisplayer
          chapter={selectedChapter}
          articleDeleteHandler={handleArticleRemove}
          handleChapterUpdate={handleChapterUpdate}
        />
      )}
    </Container>
  );
};

export default Chapters;
