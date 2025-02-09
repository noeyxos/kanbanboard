import { Box, Button, Heading, Text } from "@chakra-ui/react";
import KanbanCard from "./KanbanCard";
import { IoMdAdd } from "react-icons/io";
import DeleteColumn from "./DeleteColumn";
import { useState } from "react";
import { DroppableColumn } from "./DroppableColumn";
import { AnimatePresence } from "framer-motion";
import { IoTrashBin } from "react-icons/io5";

interface Card {
  id: number;
  columnId: number;
  tag: string;
  description: string;
  order: number;
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
  onEditCard?: (
    cardId: number,
    cardData: { tag: string; description: string }
  ) => void;
  onDeleteCard?: (cardId: number) => void;
  onDragStart: (cardId: number) => void;
  onDragEnd: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (columnId: number, targetCardId?: number) => void;
}

function KanbanColumn({
  id,
  title,
  isDeletable,
  cards = [],
  onDeleteColumn,
  onAddCard,
  onEditCard,
  onDeleteCard,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
}: KanbanColumnProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  const truncateTitle = (text: string) => {
    if (text.length > 8) {
      return text.slice(0, 8) + "...";
    }
    return text;
  };

  const handleDeleteConfirm = () => {
    onDeleteColumn(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggedOver(true);
    onDragOver(e);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggedOver(false);
    onDrop(id);
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
        <Box display={"flex"}>
          {isDeletable && (
            <Box>
              <Button
                color={"black"}
                bgColor={"transparent"}
                size={"sm"}
                onClick={() => setIsOpen(!isOpen)}
              >
                <IoTrashBin />
              </Button>
              <DeleteColumn
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                onDeleteConfirm={handleDeleteConfirm}
                columnTitle={title}
              />
            </Box>
          )}
          <Button
            color={"black"}
            bgColor={"#F1F1F1"}
            borderRadius={20}
            size={"sm"}
            padding={0}
            onClick={() => setIsAddingCard(true)}
          >
            <IoMdAdd />
          </Button>
        </Box>
      </Box>
      <DroppableColumn
        id={id}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        isDraggedOver={isDraggedOver}
      >
        <AnimatePresence>
          {cards.map((card) => (
            <KanbanCard
              key={card.id}
              card={card}
              columnId={id}
              onEditCard={onEditCard}
              onDeleteCard={onDeleteCard}
              onDragStart={(e) => {
                e.stopPropagation();
                onDragStart(card.id);
              }}
              onDragEnd={onDragEnd}
              isDragging={false}
            />
          ))}
          {isAddingCard && (
            <KanbanCard
              columnId={id}
              isAdding
              onAddCard={onAddCard}
              onCancelAdd={() => setIsAddingCard(false)}
            />
          )}
        </AnimatePresence>
      </DroppableColumn>
    </Box>
  );
}

export default KanbanColumn;
