import { useSelector } from "react-redux";
import { Commet } from "react-loading-indicators";

const GlobalLoader = () => {
  const isLoading = useSelector((store) => store.loading.isLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <Commet color="#ff0000" size="large" />
    </div>
  );
};

export default GlobalLoader;
