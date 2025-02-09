import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Column {
  id: number;
  type: string;
  title: string;
  isDeletable: boolean;
}

interface ColumnState {
  columns: Column[];
  nextId: number;
  addColumn: (ColumnName: string) => void;
  deleteColumn: (ColumnId: number) => void;
}

const DefaultColumns: Column[] = [
  { id: 1, type: "backlog", title: "시작 전", isDeletable: false },
  { id: 2, type: "inProgress", title: "진행 중", isDeletable: false },
  { id: 3, type: "completed", title: "완료", isDeletable: false },
];

export const useColumnStore = create(
  persist<ColumnState>(
    (set) => ({
      columns: DefaultColumns,
      nextId: DefaultColumns.length + 1,

      addColumn: (columnName: string) =>
        set((state) => ({
          columns: [
            ...state.columns,
            {
              id: state.nextId,
              type: "custom",
              title: columnName.trim(),
              isDeletable: true,
            },
          ],
          nextId: state.nextId + 1,
        })),

      deleteColumn: (columnId: number) =>
        set((state) => ({
          columns: state.columns.filter((column) => column.id !== columnId),
        })),
    }),
    {
      name: "kanban-storage",
    }
  )
);
