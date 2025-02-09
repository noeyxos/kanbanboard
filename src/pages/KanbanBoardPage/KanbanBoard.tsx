import { Box, HStack } from "@chakra-ui/react";
import KanbanColumn from "../../components/KanbanColumn";
import ProjectTitle from "../../components/ProjectTitle";
import AddColumn from "../../components/AddColumn";
import { useColumnStore } from "../../store/ColumnStore";
import { useCardStore } from "../../store/CardStore";

function KanbanBoard() {
  const { columns, addColumn, deleteColumn } = useColumnStore();
  const { cards, addCard, editCard, deleteCard, deleteColumnCards } =
    useCardStore();

  const handleDeleteColumn = (columnId: number) => {
    deleteColumn(columnId);
    deleteColumnCards(columnId);
  };

  return (
    <Box
      position="relative"
      width="100%"
      paddingX={10}
      paddingY="8"
      bgColor="#F8F8F8"
    >
      <ProjectTitle />
      <HStack alignItems="flex-start" spaceX={4}>
        {columns.map((column) => (
          <Box key={column.id} width="201px">
            <KanbanColumn
              id={column.id}
              title={column.title}
              cards={cards.filter((card) => card.columnId === column.id)}
              isDeletable={column.isDeletable}
              onDeleteColumn={handleDeleteColumn}
              onAddCard={addCard}
              onEditCard={editCard}
              onDeleteCard={deleteCard}
            />
          </Box>
        ))}
        <AddColumn onAddColumn={addColumn} />
      </HStack>
    </Box>
  );
}

export default KanbanBoard;
