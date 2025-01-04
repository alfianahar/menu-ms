import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MenuItem {
  id: string;
  depth: number;
  parentData: string;
  name: string;
}

interface MenuState {
  items: MenuItem[];
  selectedMenu: MenuItem | null;
}

const initialState: MenuState = {
  items: [
    {
      id: "root-menu",
      depth: 0,
      parentData: "Root",
      name: "Menu",
    },
    {
      id: "63fdb2d1-e60b-40c8-ac6d-83e2be72f185",
      depth: 1,
      parentData: "Menu",
      name: "Sub Menu 1",
    },
    {
      id: "4a6b1234-9c87-4abc-8765-4edf43210bca",
      depth: 2,
      parentData: "Sub Menu 1",
      name: "Sub Menu 1.1",
    },
    {
      id: "abcd1234-4321-4abc-8765-987654321abc",
      depth: 3,
      parentData: "Sub Menu 1.1",
      name: "Sub Menu 1.1.1",
    },
    {
      id: "9876abcd-1234-4cba-4321-abcd6543edf9",
      depth: 3,
      parentData: "Sub Menu 1.1",
      name: "Sub Menu 1.1.2",
    },
    {
      id: "9876abcd-1234-4cba-4321-abcd6543ede9",
      depth: 3,
      parentData: "Sub Menu 1.1",
      name: "Sub Menu 1.1.3",
    },
    {
      id: "abcd4321-1234-4abc-8765-4edf9876abcd",
      depth: 2,
      parentData: "Sub Menu 1",
      name: "Sub Menu 1.2",
    },
    {
      id: "1234abcd-4321-9abc-8765-4edf6543cba9",
      depth: 3,
      parentData: "Sub Menu 1.2",
      name: "Sub Menu 1.2.1",
    },
    {
      id: "5432abcd-9876-4cba-4321-6543edf9abcd",
      depth: 3,
      parentData: "Sub Menu 1.2",
      name: "Sub Menu 1.2.2",
    },
    {
      id: "b8765edf-3210-4cba-9abc-43219876bca4",
      depth: 1,
      parentData: "Menu",
      name: "Sub Menu 2",
    },
    {
      id: "abcd9876-4321-4cba-9abc-43219876bca4",
      depth: 2,
      parentData: "Sub Menu 2",
      name: "Sub Menu 2.1",
    },
    {
      id: "3210abcd-4321-4cba-9abc-987654321abc",
      depth: 3,
      parentData: "Sub Menu 2.1",
      name: "Sub Menu 2.1.1",
    },
    {
      id: "5432abcd-9876-4edf-4321-9abc8765edf0",
      depth: 3,
      parentData: "Sub Menu 2.1",
      name: "Sub Menu 2.1.2",
    },
    {
      id: "43219876-bca4-4abc-1234-abcd8765edf0",
      depth: 2,
      parentData: "Sub Menu 2",
      name: "Sub Menu 2.2",
    },
    {
      id: "9876cba4-4321-4edf-1234-abcd6543edf9",
      depth: 3,
      parentData: "Sub Menu 2.2",
      name: "Sub Menu 2.2.1",
    },
    {
      id: "6543abcd-4321-4edf-9abc-8765abcd9876",
      depth: 3,
      parentData: "Sub Menu 2.2",
      name: "Sub Menu 2.2.2",
    },
  ],
  selectedMenu: null,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    addMenuItem: (state, action: PayloadAction<MenuItem>) => {
      state.items.push(action.payload);
      state.selectedMenu = null;
    },
    updateMenuItem: (state, action: PayloadAction<MenuItem>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
      state.selectedMenu = action.payload;
    },
    setSelectedMenu: (state, action: PayloadAction<MenuItem>) => {
      state.selectedMenu = action.payload;
    },
  },
});

export const { addMenuItem, updateMenuItem, setSelectedMenu } =
  menuSlice.actions;

export default menuSlice.reducer;
