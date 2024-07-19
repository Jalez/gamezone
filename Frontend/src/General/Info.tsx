interface InfoProps {
    attempts: number;
}
const Info = ({
    attempts
}: InfoProps

) => {
    return (
        <div>
            <p>
                Attempts: {attempts}
            </p>
            <p>
                Attemps Left: {3 - attempts}
            </p>
        </div>
    )
}

export default Info