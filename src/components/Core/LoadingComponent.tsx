import { Backdrop, CircularProgress } from "@mui/material";

const LoadingComponent = ({ loading }: { loading: Boolean }) => {
  return (
    <Backdrop
      sx={{
        color: "#1b2459",
        backgroundColor: "rgba(256, 256, 256, 0.8)",
        zIndex: (theme: any) => theme.zIndex.drawer + 999,
      }}
      open={Boolean(loading)}
    >
      <object
        type="image/svg+xml"
        data={"/loading-image.gif"}
        width={150}
        height={150}
      />
    </Backdrop>
  );
};
export default LoadingComponent;
