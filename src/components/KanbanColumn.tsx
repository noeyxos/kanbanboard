import { Box, Button, Heading, Text } from "@chakra-ui/react";
import KanbanCard from "./KanbanCard";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import DeleteColumn from "./DeleteColumn";
import { useState } from "react";

interface Card {
  id: number;
  columnId: number;
  tag: string;
  description: string;
}

interface KanbanColumnProps {
  id: number;
  title: string;
  isDeletable: boolean;
  cards: Card[];
  onDeleteColumn: (columnId: number) => void;
  onAddCard?: (
    columnId: number,
    cardData: { tag: string; description: string }
  ) => void;
}

function KanbanColumn({
  id,
  title,
  isDeletable,
  cards = [],
  onDeleteColumn,
  onAddCard,
}: KanbanColumnProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);

  const truncateTitle = (text: string) => {
    if (text.length > 8) {
      return text.slice(0, 8) + "...";
    }
    return text;
  };

  const handleDeleteConfirm = () => {
    onDeleteColumn(id);
  };

  return (
    <Box width={"100%"}>
      <Box
        display={"flex"}
        alignItems={"center"}
        marginBottom={4}
        justifyContent={"space-between"}
      >
        <Box display={"flex"} pb={3}>
          <Heading
            size={"md"}
            color={"black"}
            fontWeight={"bold"}
            title={title}
          >
            {truncateTitle(title)}
          </Heading>
          <Text
            bg={"gray.100"}
            px={2}
            borderRadius={"md"}
            color={"black"}
            fontWeight={"bold"}
            ml={2}
          >
            {cards.length}
          </Text>
        </Box>
        {isDeletable && (
          <Box>
            <Button
              color={"black"}
              bgColor={"transparent"}
              size={"sm"}
              onClick={() => setIsOpen(!isOpen)}
            >
              <AiOutlineClose size={24} />
            </Button>

            <DeleteColumn
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              onDeleteConfirm={handleDeleteConfirm}
              columnTitle={title}
            />
          </Box>
        )}
        {cards.length !== 0 && (
          <Button
            color={"black"}
            bgColor={"#F1F1F1"}
            borderRadius={20}
            size={"sm"}
            padding={1}
            onClick={() => setIsAddingCard(true)}
          >
            <IoMdAdd />
          </Button>
        )}
      </Box>
      <KanbanCard
        cards={cards}
        columnId={id}
        onAddCard={onAddCard}
        isAdding={isAddingCard}
        onCancelAdd={() => setIsAddingCard(false)}
      />
    </Box>
  );
}

export default KanbanColumn;
