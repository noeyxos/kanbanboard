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
        <Box display={"flex"} pb={3}>
          <Heading size={"md"} color={"black"} fontWeight={"bold"}>
            {title}
          </Heading>
          <Text
            bg={"gray.100"}
            px={2}
            borderRadius={"md"}
            color={"black"}
            fontWeight={"bold"}
          >
            {cards.length}
          </Text>
        </Box>
        {cards.length !== 0 && (
          <Button
            color={"black"}
            bgColor={"#F1F1F1"}
            borderRadius={20}
            size={"sm"}
            padding={1}
          >
            <IoMdAdd />
          </Button>
        )}
      </Box>
      <KanbanCard cards={cards} />
    </Box>
  );
}

export default KanbanColumn;
