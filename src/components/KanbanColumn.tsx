import { Box, Button, Heading, Text } from "@chakra-ui/react";
import KanbanCard from "./KanbanCard";
import { IoMdAdd } from "react-icons/io";

interface Card {
  id: number;
  columnId: string;
  tag: string;
  description: string;
}

interface KanbanColumnProps {
  title: string;
  cards: Card[];
}

function KanbanColumn({ title, cards = [] }: KanbanColumnProps) {
  return (
    <Box width={"100%"}>
      <Box
        display={"flex"}
        alignItems={"center"}
        marginBottom={4}
        justifyContent={"space-between"}
      >
        <Box display={"flex"}>
          <Heading size={"md"} color={"black"}>
            {title}
          </Heading>
          <Text bg={"gray.100"} px={2} borderRadius={"md"} color={"black"}>
            {cards.length}
          </Text>
        </Box>
        if(
        {cards.length !== 0 && (
          // 이거 왜케 크냐;;;
          <Button color={"black"} bgColor={"#F1F1F1"} borderRadius={20}>
            <IoMdAdd />
          </Button>
        )}
        )
      </Box>
      <KanbanCard cards={cards} />
    </Box>
  );
}

export default KanbanColumn;
