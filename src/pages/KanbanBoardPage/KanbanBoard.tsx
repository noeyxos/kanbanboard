import { Box, Button, HStack } from "@chakra-ui/react";
import KanbanColumn from "../../components/KanbanColumn";
import { IoMdAdd } from "react-icons/io";
import ProjectTitle from "../../components/ProjectTitle";

function KanbanBoard() {
  const DefaultColumns = [
    { id: "backlog", title: "시작 전" },
    { id: "inProgress", title: "진행 중" },
    { id: "completed", title: "완료" },
  ];

  const cards = [
    {
      id: 1,
      columnId: "inProgress",
      tag: "관리자페이지",
      description: "회원을 블랙리스트로 지정할 수 있는 기능을 제작합니다.",
    },
    {
      id: 2,
      columnId: "completed",
      tag: "사용자화면",
      description:
        "장바구니에 상품을 추가하고 수정, 삭제하는 기능이 포함된 컴포넌트를 제작합니다.",
    },
    {
      id: 3,
      columnId: "completed",
      tag: "문서화",
      description: "디자인시스템 2.1 버전로그를 작성합니다.",
    },
  ];

  const getCardsForColumn = (columnId: string) => {
    return cards.filter((card) => card.columnId === columnId);
  };

  const handleAddColumn = () => {};

  return (
    <Box
      position={"relative"}
      width="100%"
      paddingX={10}
      paddingY="8"
      bgColor={"#F8F8F8"}
    >
      <ProjectTitle />
      <HStack alignItems={"flex-start"} spaceX={4}>
        {DefaultColumns.map((column) => (
          <Box key={column.id} width={"201px"}>
            <KanbanColumn
              title={column.title}
              cards={getCardsForColumn(column.id)}
            />
          </Box>
        ))}
        <Button width={"201px"} bgColor={"gray.200"} onClick={handleAddColumn}>
          <IoMdAdd />
          Add another list
        </Button>
      </HStack>
    </Box>
  );
}

export default KanbanBoard;
