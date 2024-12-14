import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { EmptyTimeline, description } from './Timeline';
import { styled } from '@mui/material/styles';


// create a styled ul element
const StyledUl = styled('ul')(({ theme }) => ({
    // backgroundColor: "lightgrey",
    // width: "100%",
    // minHeight: "100px",
    margin: "0px",
    padding: "10px",
}));


const StyledLi = styled('li')(({ theme }) => ({
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: "10px",
    margin: "10px",
    padding: "10px",
}));


interface LineProps {
    emptyTimeline: EmptyTimeline;
}

const Line: React.FC<LineProps> = ({ emptyTimeline }) => {
    return (
        <div
            style={{
                backgroundColor: "#222",
                width: "100%",
                minHeight: "200px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
            }}
        >
            {
                Object.values(emptyTimeline).map((event, index) => (
                    <div key={index}
                        style={{
                            border: "1px solid black",
                            width: "100%",
                            margin: "10px",
                            backgroundColor: "white",
                            borderRadius: "10px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            // alignItems: "center",
                            // Include border width in width calculation
                            boxSizing: "border-box",
                        }}
                    >
                        <h2
                            style={{
                                //  Center the text
                                textAlign: "center",
                            }}
                        >
                            {event.date}
                        </h2>
                        <Droppable droppableId={event.date}>
                            {(provided: any) => (
                                <StyledUl
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={{
                                        // backgroundColor: "lightgrey",
                                        flex: "1",
                                        // width: "100%",
                                        // No style for the ul element
                                        listStyle: "none",
                                    }}
                                >
                                    {event.description.map((description, index) => (
                                        <Draggable key={description.id} draggableId={description.id} index={index}>
                                            {(provided: any) => (
                                                <StyledLi
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}

                                                >
                                                    <p style={{
                                                        backgroundColor: "white",
                                                    }}>{`${description.text}`}</p>
                                                </StyledLi>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </StyledUl>
                            )}

                        </Droppable>
                    </div>
                ))
            }
        </div>
    )
}

export default Line;