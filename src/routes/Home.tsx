import HomeContainer from "@/components/home/HomeContainer";
import defaultApiModules from "@/modules/apis";

function HomePage() {
  const test = async () => {
    const rs = await defaultApiModules({
      url: "/test",
    });
    console.log(rs);
  };
  return (
    <>
      <button onClick={test}>test</button>
      <HomeContainer />;
    </>
  );
}

export default HomePage;
