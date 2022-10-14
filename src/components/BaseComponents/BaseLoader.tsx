import CircularProgress from "@mui/material/CircularProgress";

export function BaseLoader() {
  return (
    <div className="fixed w-full h-full flex justify-center items-center bg-black/30 z-9999 top-0 left-0">
      <CircularProgress />
    </div>
  );
}