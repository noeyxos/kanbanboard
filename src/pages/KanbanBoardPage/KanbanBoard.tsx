import { Box, HStack, useBreakpointValue } from "@chakra-ui/react";
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

  const columnWidth =
    useBreakpointValue({
      base: "280px",
      md: "240px",
      lg: "201px",
    }) ?? "201px";

  const containerPadding =
    useBreakpointValue({
      base: 4,
      md: 6,
      lg: 10,
    }) ?? 4;

  const visibleColumns =
    useBreakpointValue({
      base: 1.3,
      md: 2.3,
      lg: 3.3,
      xl: 4.3,
    }) ?? 3.3;

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
      paddingY="8"
      bgColor="#F8F8F8"
    >
      <Box px={containerPadding}>
        <ProjectTitle />
      </Box>

      <Box position="relative" width="100%" px={containerPadding}>
        <Box overflowX="auto" width="100%">
          <HStack
            alignItems="flex-start"
            spaceX={4}
            py={2}
            width={`calc(${columnWidth} * ${columns.length + 1})`}
            minWidth={`calc(${columnWidth} * ${visibleColumns})`}
          >
            {columns.map((column) => (
              <Box key={column.id} width={columnWidth} flexShrink={0}>
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
            <Box flexShrink={0} width={columnWidth}>
              <AddColumn onAddColumn={addColumn} />
            </Box>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
}

export default KanbanBoard;
