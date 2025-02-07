import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ProjectState {
  projectTitle: string;
  setProjectTitle: (newTitle: string) => void;
}

export const useProjectStore = create(
  persist<ProjectState>(
    (set) => ({
      projectTitle: "Project No.1",
      setProjectTitle: (newTitle) => set({ projectTitle: newTitle }),
    }),
    {
      name: "project-storage", 
      storage: createJSONStorage(() => localStorage), 
    }
  )
);
