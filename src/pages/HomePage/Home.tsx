import { Box } from "@chakra-ui/react";
import Header from "../../components/Header";
import KanbanBoard from "../KanbanBoardPage/KanbanBoard";

function Home() {
  return (
    <Box
      width="100vw"
      height="calc(var(--vh, 1vh) * 100)"
      position={"relative"}
      display={"flex"}
      flexDirection={"column"}
      bgColor="#F8F8F8"
    >
      <Header />
      <Box
        flex={1}
        overflow={"auto"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"flex-start"}
        p="4"
      >
        <Box w="full" mx={"auto"} maxW={"1400px"}>
          <KanbanBoard />
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
