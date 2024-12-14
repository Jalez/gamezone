import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { Stack } from "@mui/material";
import { animate, stagger } from "motion";
import { useEffect } from "react";
const ThumbsDown: React.FC<{
  display: boolean;
}> = ({ display }) => {
  //   animate("#thumb", { x: [-100, 0], rotate: [-30, 20] }, { duration: 0.5 });
  useEffect(() => {
    const animateThumb = () => {
      if (display) {
        animate("#text", { opacity: [0, 1] }, { duration: 0.5 });

        animate(
          "#thumb",

          { x: [-100, 10], rotate: [-30, 20], opacity: [0, 1] },
          { duration: 0.5, easing: "ease-in-out" }
        );
        animate(
          "#thumb",
          {
            rotate: [20, -30, 20],
          },
          {
            duration: 0.5,
            easing: "ease-in-out",
            repeat: 1,
          }
        );
        // create a jumping effect for the thumb
        animate(
          "#thumb",
          {
            y: [0, -10, 0],
          },
          {
            duration: 0.5,
            easing: "ease-in-out",
            repeat: 1,
          }
        );
        animate(
          "#word",
          { y: [-100, 0], opacity: [0, 1] },
          {
            delay: stagger(0.3),
            duration: 1.2,
            easing: [0.22, 0.03, 0.26, 1],
          }
        );
      } else {
        animate("#text", { opacity: [1, 0] }, { duration: 0.5 });
        // animate(
        //   "#thumb",

        //   { rotate: [20, -30], opacity: [1, 0] },
        //   { duration: 0.5 }
        // );
        animate(
          "#word",
          { y: [0, -100], opacity: [1, 0] },
          {
            delay: stagger(0.3),
            duration: 1,
            easing: [0.22, 0.03, 0.26, 1],
          }
        );
      }
    };
    animateThumb();
  }, [display]);
  return (
    <Stack
      direction="row"
      justifyContent={"center"}
      alignItems={"center"}
      id="text"
      // give it green border
      style={{
        // border: "5px solid #4caf50",
        paddingRight: "15px",
        paddingLeft: "15px",
        opacity: 0,
        width: "fit-content",
        borderRadius: "10px",
      }}
    >
      <p
        style={{
          display: "inline-block",
          margin: "0px",
          // bold the text
          fontWeight: "bold",
        }}
      >
        <span id="word">Try </span> <span id="word"> again!</span>
      </p>
      <ThumbDownIcon
        id="thumb"
        //    make it red
        style={{ color: "#f44336" }}
      />
      {/* </p> */}
    </Stack>
  );
};

export default ThumbsDown;
