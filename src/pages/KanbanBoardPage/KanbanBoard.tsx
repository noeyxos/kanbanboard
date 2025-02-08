import { Box, HStack } from "@chakra-ui/react";
import { useState } from "react";
import KanbanColumn from "../../components/KanbanColumn";
import ProjectTitle from "../../components/ProjectTitle";
import AddColumn from "../../components/AddColumn";
import { useColumnStore } from "../../store/ColumnStore";

interface Card {
  id: number;
  columnId: number;
  tag: string;
  description: string;
}

function KanbanBoard() {
  const { columns, addColumn, deleteColumn } = useColumnStore();

  // 초기 카드 데이터로 상태 초기화
  const [cards, setCards] = useState<Card[]>([
    {
      id: 1,
      columnId: 2,
      tag: "관리자페이지",
      description: "회원을 블랙리스트로 지정할 수 있는 기능을 제작합니다.",
    },
    {
      id: 2,
      columnId: 3,
      tag: "사용자화면",
      description:
        "장바구니에 상품을 추가하고 수정, 삭제하는 기능이 포함된 컴포넌트를 제작합니다.",
    },
    {
      id: 3,
      columnId: 3,
      tag: "문서화",
      description: "디자인시스템 2.1 버전로그를 작성합니다.",
    },
  ]);

  const handleDeleteColumn = (columnId: number) => {
    deleteColumn(columnId);
    // 해당 컬럼의 카드들도 함께 삭제
    setCards((prevCards) =>
      prevCards.filter((card) => card.columnId !== columnId)
    );
  };

  const handleAddCard = (
    columnId: number,
    cardData: { tag: string; description: string }
  ) => {
    const newCard: Card = {
      id: Date.now(),
      columnId,
      ...cardData,
    };
    setCards((prevCards) => [...prevCards, newCard]);
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
              onAddCard={handleAddCard}
            />
          </Box>
        ))}
        <AddColumn onAddColumn={addColumn} />
      </HStack>
    </Box>
  );
}

export default KanbanBoard;
