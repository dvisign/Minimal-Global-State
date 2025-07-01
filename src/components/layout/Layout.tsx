import Header from "./headers/Header";
import Contents from "./contents/Contents";
import LoadingBar from "@/components/commons/LoadingBar";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Contents />
      <LoadingBar />
    </div>
  );
};

export default Layout;
