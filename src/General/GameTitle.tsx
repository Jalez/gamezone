interface GameTitleProps {
    title: string;
    explanation: string;
}

const GameTitle = ({
    title,
    explanation
}: GameTitleProps) => {
    return (
        <section
            style={{
                backgroundColor: "#111",
            }}
        >

            <h2>
                {title}
            </h2>
            <p>
                {explanation}
            </p>
        </section>
    )
}

export default GameTitle