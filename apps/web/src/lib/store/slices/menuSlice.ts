import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface MenuItem {
  id: string;
  depth: number;
  parentData: string;
  name: string;
}

interface MenuState {
  items: MenuItem[];
  selectedMenu: MenuItem | null;
  loading: boolean;
  error: string | null;
}

// Async thunk to fetch menus
export const fetchMenus = createAsyncThunk(
  "menu/fetchMenus",
  async (_, { rejectWithValue }) => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL + "/api" : "/api"}/get-all-menus`;
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch menus");
    }
  }
);

const initialState: MenuState = {
  items: [],
  selectedMenu: null,
  loading: false,
  error: null,
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenus.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchMenus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addMenuItem, updateMenuItem, setSelectedMenu } =
  menuSlice.actions;

export default menuSlice.reducer;
