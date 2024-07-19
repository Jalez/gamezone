
interface HintsProps {
    attempts: number;
    hints: string[];
  }
  const Hints = ({
    attempts, hints
  }: HintsProps
  ) => {
    return (
      <div
        style={{
          backgroundColor: "#111",
          padding: "20px",
          margin: 10
        }}>
        <p>Hints:</p>
        <ul>
          {attempts == 0 && <li>No attempts, no hints!</li> ||
            hints.map((hint, i) => {
              if (i >= attempts) return
              return <li>{hint}</li>
            })
          }
        </ul>
      </div>
    )
  }
  
export default Hints  