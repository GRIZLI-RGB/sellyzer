import { create } from "zustand";
import { UserType } from "@sellyzer/shared";

export const useUser = create<{
	user: UserType | null;
	setUser: (newUser: UserType | null) => void;
	clearUser: () => void;
}>((set) => ({
	user: null,
	setUser: (newUser) => set({ user: newUser }),
	clearUser: () => set({ user: null }),
}));
