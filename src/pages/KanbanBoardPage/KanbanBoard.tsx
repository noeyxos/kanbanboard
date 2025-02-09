import { Box, HStack } from "@chakra-ui/react";
import KanbanColumn from "../../components/KanbanColumn";
import ProjectTitle from "../../components/ProjectTitle";
import AddColumn from "../../components/AddColumn";
import { useColumnStore } from "../../store/ColumnStore";
import { useCardStore } from "../../store/CardStore";
import { useState } from "react";

function KanbanBoard() {
  const { columns, addColumn, deleteColumn } = useColumnStore();
  const { cards, addCard, editCard, deleteCard, moveCard } = useCardStore();

  const [draggedCardId, setDraggedCardId] = useState<number | null>(null);

  const handleDragStart = (cardId: number) => {
    setDraggedCardId(cardId);
  };

  const handleDragEnd = () => {
    setDraggedCardId(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (columnId: number, targetCardId?: number) => {
    if (draggedCardId === null) return;
    moveCard(draggedCardId, columnId, targetCardId);
    setDraggedCardId(null);
  };

  return (
    <Box
      position="relative"
      minH="calc(100vh - 88px)"
      width="100%"
      paddingX={10}
      paddingY="8"
    >
      <ProjectTitle />
      <HStack
        alignItems="flex-start"
        spaceX={4}
        minW="fit-content"
        margin={"0 auto"}
      >
        {columns.map((column) => (
          <Box key={column.id} width="201px" flexShrink={0}>
            <KanbanColumn
              id={column.id}
              title={column.title}
              cards={cards
                .filter((card) => card.columnId === column.id)
                .sort((a, b) => a.order - b.order)}
              isDeletable={column.isDeletable}
              onDeleteColumn={deleteColumn}
              onAddCard={addCard}
              onEditCard={editCard}
              onDeleteCard={deleteCard}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            />
          </Box>
        ))}
        <AddColumn onAddColumn={addColumn} />
      </HStack>
    </Box>
  );
}

export default KanbanBoard;
