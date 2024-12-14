/** @format */

import React, { useEffect, useMemo, useState } from "react";
import { Typography, Stack } from "@mui/material";
import { Details, GeneralArticle } from "../../../interfaces";
import { Link } from "react-router-dom";
import PopUp from "../../../Misc/PopUp";
import EditableText from "../../../General/EditableText";
import TipTap from "../../../TipTap/TipTap";
import LaunchIcon from "@mui/icons-material/Launch";
import ContentTools from "../../../General/ContentTools";
import { useContentStore } from "../../../General/Store/contentTools";
import { AnyAaaaRecord } from "dns";

type ChapterDisplayerProps = {
  chapter?: GeneralArticle | null;
  articleDeleteHandler: (articleId?: string) => void;
  handleChapterUpdate: (updatedChapter: GeneralArticle) => void;
};

const ChapterDisplayer = ({
  chapter,
  articleDeleteHandler,
  handleChapterUpdate,
}: ChapterDisplayerProps) => {
  const [open, setOpen] = useState(false);
  const [isCreator, setIsCreator] = useState(true);
  const { isEditing, isSaving } = useContentStore();
  const [updatedDetails, setUpdatedDetails] = useState<Details | null>(null);

  useEffect(() => {
    if (isSaving) {
      console.log("Saving");

      const newDetails = {
        ...chapter?.details,
        ...updatedDetails,
      };
      updateChapterDetails(newDetails);
    }
  }, [isSaving]);

  useEffect(() => {
    if (!chapter) {
      return;
    }
    setUpdatedDetails(null);
  }, [chapter]);

  if (!chapter) {
    return null;
  }

  const onConfirm = () => {
    articleDeleteHandler(chapter._id);
    setOpen(false);
  };

  const handleDetailsUpdate = async (updatedDetails: Details) => {
    const updatedChapter: GeneralArticle = {
      ...chapter,
      details: updatedDetails,
    };

    handleChapterUpdate(updatedChapter);
  };

  const updateChapterDetails = async (newDetails: any) => {
    const updatedDetails: Details = {
      ...chapter.details,
      ...newDetails,
    };

    console.log("Updating chapter details with ", updatedDetails);

    const response = await fetch(
      "http://localhost:3000/api/details/" + updatedDetails._id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDetails),
      }
    );
    if (!response.ok) {
      console.log("Error updating chapter details");
      return;
    }
    console.log("Chapter details updated");
    handleDetailsUpdate(await response.json());
  };

  const handleDetailsChange = (update: any) => {
    setUpdatedDetails((prevDetails) => ({
      ...prevDetails,
      ...update,
    }));
  };

  const MemoizedTipTap = React.memo(TipTap);

  return (
    <Stack direction="column" spacing={2}>
      <PopUp
        title="Delete Chapter"
        message="Are you sure you want to delete this chapter?"
        open={open}
        onConfirm={onConfirm}
        onCancel={() => setOpen(false)}
      />

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <EditableText
          fontSize="1.5rem"
          variant="h5"
          text={chapter.details.title}
          isSaving={false}
          isEditing={isEditing}
          placeholder="Chapter Title"
          onUpdate={(title) => handleDetailsChange({ title })}
        />
        {chapter.children.length > 0 && (
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            (Subchapters available)
          </Typography>
        )}
        <Link
          to={"../" + chapter.details.title}
          style={{
            textDecoration: "none",
            color: "black",
          }}
        >
          <LaunchIcon />
        </Link>
      </Stack>

      <EditableText
        variant="body1"
        text={chapter.details.author || ""}
        isSaving={false}
        isEditing={isEditing}
        fontSize="1rem"
        placeholder="Add Author"
        onUpdate={(author) => handleDetailsChange({ author })}
      />

<TipTap
  content={chapter.details.content}
  edit={chapter.details.edit}
  isEditing={isEditing}
  onUpdate={(content) => handleDetailsChange({ content })}
  chapterId={chapter._id}
/>
      <ContentTools isOwner={isCreator} useToolsStore={useContentStore} />
    </Stack>
  );
};

export default ChapterDisplayer;
