import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Line from "./Line";

export type TimelineEvent = {
  id: string;
  date: string;
  description: description[];
};

type TimelineGameProps = {
  events: TimelineEvent[];
};

export type description = {
  id: string;
  text: string;
};

export type EmptyTimeline = {
  [key: string]: {
    id: string;
    date: string;
    description: description[];
  };
};

const Timeline = () => {
  const unassignedDescriptions = [
    {
      id: "description_1",
      text: "The first event",
    },
    {
      id: "description_2",
      text: "The second event",
    },
    {
      id: "description_3",
      text: "The third event",
    },
    {
      id: "description_4",
      text: "The fourth event",
    },
    {
      id: "description_5",
      text: "The fifth event",
    },
  ];
  const [emptyTimeline, setEmptyTimeline] = useState<EmptyTimeline>({
    "1990": {
      id: "date_1",
      date: "1990",
      description: [],
    },
    "1991": {
      id: "date_2",
      date: "1991",
      description: [],
    },
    "1992": {
      id: "date_3",
      date: "1992",
      description: [],
    },
    "1993": {
      id: "date_4",
      date: "1993",
      description: [],
    },
    "1994": {
      id: "date_5",
      date: "1994",
      description: [],
    },
    unassigned: {
      id: "unassigned",
      date: "unassigned",
      description: unassignedDescriptions,
    },
  });
  const [showResult, setShowResult] = useState<boolean>(false);

  function shuffle(array: TimelineEvent[]): TimelineEvent[] {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  function handleDragEnd(result: any) {
    if (!result.destination) return;
    console.log("result", result);
    // Check if the item was dropped in the same place in the same dropppableId
    if (
      result.source.droppableId === result.destination.droppableId &&
      result.source.index === result.destination.index
    )
      return;
    // otherwise, update the state
    // First, get the item that was dragged from the source

    let draggedItem: description;

    const sourceIndex = result.source.droppableId;
    draggedItem = emptyTimeline[sourceIndex].description.splice(
      result.source.index,
      1
    )[0];

    const destinationIndex = result.destination.droppableId;
    // create a shallow copy of the items in the destination
    const items = { ...emptyTimeline };
    items[destinationIndex].description.splice(
      result.destination.index,
      0,
      draggedItem
    );
    setEmptyTimeline(items);
  }

  function checkResult() {
    setShowResult(true);
  }

  return (
    <div>
      <h2>Timeline Game</h2>
      <p>Put the following events in chronological order:</p>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Line emptyTimeline={emptyTimeline} />
        {/* <UnassignedDescriptions unassignedDescriptions={unassignedDescriptions} /> */}
      </DragDropContext>
      <button onClick={checkResult}>Check Result</button>
      {/* {showResult && (
                <div>
                    <p>Result:</p>
                    <ol>
                        {events.map((event) => (
                            <li key={event.id}>{`${event.date} - ${event.description}`}</li>
                        ))}
                    </ol>
                </div>
            )} */}
    </div>
  );
};

export default Timeline;
