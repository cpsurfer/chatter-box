import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("Chatter-theme") || "Dark",
  setTheme: (theme) => {
    localStorage.setItem("Chatter-theme", theme);
    set({ theme });
  },
}));