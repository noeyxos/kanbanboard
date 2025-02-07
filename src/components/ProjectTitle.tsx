import { Box, Flex, Heading, Input } from "@chakra-ui/react";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoIosRefresh } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
import { useProjectStore } from "../store/projectStore";
import { useState } from "react";

function ProjectTitle() {
  const { projectTitle, setProjectTitle } = useProjectStore();
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(projectTitle);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempTitle(event.target.value);
  };

  const handleTitleSubmit = () => {
    if (tempTitle.trim()) {
      setProjectTitle(tempTitle.trim());
      setIsEditing(false);
    }
  };

  const handleTitleCancel = () => {
    setTempTitle(projectTitle);
    setIsEditing(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleTitleSubmit();
    } else if (event.key === "Escape") {
      handleTitleCancel();
    }
  };

  return (
    <Box>
      {isEditing ? (
        <Flex gap={2} alignItems="center" marginBottom={16}>
          <Input
            size="lg"
            value={tempTitle}
            onChange={handleTitleChange}
            onKeyDown={handleKeyPress}
            autoFocus
            width="auto"
            color="black"
            placeholder="프로젝트 제목을 입력하세요"
          />
          <FaRegCheckCircle
            size={24}
            color="#3A3A3A"
            cursor="pointer"
            onClick={handleTitleSubmit}
          />
          <IoIosRefresh
            size={24}
            color="#3A3A3A"
            cursor="pointer"
            onClick={handleTitleCancel}
          />
        </Flex>
      ) : (
        <Heading
          size="lg"
          marginBottom={16}
          color={"#3A3A3A"}
          display={"flex"}
          alignItems={"center"}
          gap={2}
          fontWeight={"bold"}
        >
          {projectTitle}
          <MdOutlineEdit
            size={24}
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
              setTempTitle(projectTitle);
            }}
          />
        </Heading>
      )}
    </Box>
  );
}

export default ProjectTitle;
