import { Draggable, Droppable } from "react-beautiful-dnd";
import { description } from "./Timeline";

interface unassignedDescriptionProps {
    unassignedDescriptions: description[];
}

const UnassignedDescriptions: React.FC<unassignedDescriptionProps> = ({
    unassignedDescriptions
}) => {
    return (

        <Droppable droppableId="unassigned">
            {(provided: any) => (
                <div
                    style={{
                        backgroundColor: "lightgrey",
                        width: "100%",
                        minHeight: "100px",
                    }}
                >
                    <h2>Unassigned</h2>
                    <ol
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {
                            unassignedDescriptions.map((event, index) => (
                                <Draggable key={event.id} draggableId={event.id} index={index}>
                                    {(provided: any) => (
                                        <li
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <span>{`${event.text}`}</span>
                                        </li>
                                    )}
                                </Draggable>
                            ))
                        }
                        {provided.placeholder}
                    </ol>
                </div>
            )}
        </Droppable>
    );
}

export default UnassignedDescriptions;