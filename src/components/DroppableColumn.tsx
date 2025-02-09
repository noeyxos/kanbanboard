import { motion, AnimatePresence } from "framer-motion";
import { Box } from "@chakra-ui/react";

interface DroppableColumnProps {
  id: number;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, columnId: number) => void;
  children: React.ReactNode;
  isDraggedOver?: boolean;
}

export function DroppableColumn({
  id,
  onDragOver,
  onDrop,
  children,
  isDraggedOver,
}: DroppableColumnProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      style={{ height: "100%" }}
    >
      <Box
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, id)}
        minHeight="200px"
        p={2}
        bg={isDraggedOver ? "gray.100" : "gray.50"}
        borderRadius="md"
        transition="background-color 0.2s"
      >
        <AnimatePresence>{children}</AnimatePresence>
      </Box>
    </motion.div>
  );
}
