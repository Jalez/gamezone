interface CenterFlexProps {
  children: React.ReactNode;
}

const CenterFlex = ({ children }: CenterFlexProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
};

export default CenterFlex;
