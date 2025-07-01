import {useAtom} from "@/lib/store/hooks/useAtom";
import {isLoadingAtom} from "@/stores/ui";

const LoadingBar = () => {
  const [isLoading] = useAtom(isLoadingAtom);

  if (!isLoading) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "4px",
        width: "100%",
        background: "linear-gradient(to right, #3b82f6, #60a5fa)",
        animation: "loadingBar 1.2s linear infinite",
        zIndex: 9999,
      }}>
      로딩바
    </div>
  );
};

export default LoadingBar;
