import { Box, HStack } from "@chakra-ui/react";
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

  const cards: Card[] = [
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
  ];

  const getCardsForColumn = (columnId: number) => {
    return cards.filter((card) => card.columnId === columnId);
  };

  return (
    <Box
      position="relative"
      width="100%"
      paddingX={10}
      paddingY="8"
      bgColor={"#F8F8F8"}
    >
      <ProjectTitle />
      <HStack alignItems="flex-start" spaceX={4}>
        {columns.map((column) => (
          <Box key={column.id} width="201px">
            <KanbanColumn
              id={column.id}
              title={column.title}
              cards={getCardsForColumn(column.id)}
              isDeletable={column.isDeletable}
              onDeleteColumn={deleteColumn}
            />
          </Box>
        ))}
        <AddColumn onAddColumn={addColumn} />
      </HStack>
    </Box>
  );
}

export default KanbanBoard;
