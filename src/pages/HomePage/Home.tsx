import { Box } from "@chakra-ui/react";
import Header from "../../components/Header";
import KanbanBoard from "../KanbanBoardPage/KanbanBoard";

function Home() {
  return (
    <Box
      width="100%"
      height="calc(var(--vh, 1vh) * 100)"
      position={"relative"}
      display={"flex"}
      flexDirection={"column"}
      bgColor="#fdfdfd"
    >
      <Header />
      <Box flex={1} overflow={"auto"}>
        <KanbanBoard />
      </Box>
    </Box>
  );
}

export default Home;
