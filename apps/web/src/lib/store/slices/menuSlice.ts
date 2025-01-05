import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/lib/constants";

export interface MenuItem {
  id: string;
  depth: number;
  name: string;
  parent_id: string;
  parent_name: string;
  root_id: string;
  root_name: string;
}

interface MenuState {
  items: MenuItem[];
  rootMenus: MenuItem[];
  selectedMenu: MenuItem | null;
  selectedRootMenu: MenuItem | null;
  loading: boolean;
  rootMenusLoading: boolean;
  error: string | null;
  formLoading: boolean;
}

// Async thunk to fetch all menus
export const fetchMenus = createAsyncThunk(
  "menu/fetchMenus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/menus`);
      return response.data;
    } catch (error) {
      console.error("Error fetching menus:", error);
      return rejectWithValue("Failed to fetch menus");
    }
  }
);

// Async thunk to fetch root menus
export const fetchRootMenus = createAsyncThunk(
  "menu/fetchRootMenus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/menus/root`);
      return response.data;
    } catch (error) {
      console.error("Error fetching root menus:", error);
      return rejectWithValue("Failed to fetch root menus");
    }
  }
);

// Async thunk to create or update a menu
export const saveMenu = createAsyncThunk(
  "menu/saveMenu",
  async (menuData: MenuItem, { rejectWithValue }) => {
    try {
      // If id exists, it's an update. Otherwise, it's a create
      const response = menuData.id
        ? await axios.put(`${API_URL}/menus/${menuData.id}`, menuData)
        : await axios.post(`${API_URL}/menus`, menuData);

      return response.data;
    } catch (error) {
      console.error("Error saving menu:", error);
      return rejectWithValue("Failed to save menu");
    }
  }
);

// Async thunk to delete a menu
export const deleteMenu = createAsyncThunk(
  "menu/deleteMenu",
  async (menuId: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/menus/${menuId}`);

      return menuId;
    } catch (error) {
      console.error("Error deleting menu:", error);
      return rejectWithValue("Failed to delete menu");
    }
  }
);

const initialState: MenuState = {
  items: [],
  rootMenus: [],
  selectedMenu: null,
  selectedRootMenu: null,
  loading: false,
  rootMenusLoading: false,
  error: null,
  formLoading: false,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setSelectedRootMenu: (state, action: PayloadAction<MenuItem | null>) => {
      state.selectedRootMenu = action.payload;
    },
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
    updateSelectedMenuField: (
      state,
      action: PayloadAction<Partial<MenuItem>>
    ) => {
      if (state.selectedMenu) {
        state.selectedMenu = {
          ...state.selectedMenu,
          ...action.payload,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Menus
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
      })
      // Fetch Root Menus
      .addCase(fetchRootMenus.pending, (state) => {
        state.rootMenusLoading = true;
      })
      .addCase(fetchRootMenus.fulfilled, (state, action) => {
        state.rootMenusLoading = false;
        state.rootMenus = action.payload;
      })
      .addCase(fetchRootMenus.rejected, (state, action) => {
        state.rootMenusLoading = false;
        state.error = action.payload as string;
      })
      // Add new cases for save menu
      .addCase(saveMenu.pending, (state) => {
        state.formLoading = true;
        state.error = null;
      })
      .addCase(saveMenu.fulfilled, (state, action) => {
        state.formLoading = false;

        // If the saved menu already exists in the list, update it
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        } else {
          // Otherwise, add it to the list
          state.items.push(action.payload);
        }

        // Reset selected menu
        state.selectedMenu = null;
      })
      .addCase(saveMenu.rejected, (state, action) => {
        state.formLoading = false;
        state.error = action.payload as string;
      })
      // Add new cases for delete menu
      .addCase(deleteMenu.pending, (state) => {
        state.formLoading = true;
        state.error = null;
      })
      .addCase(deleteMenu.fulfilled, (state, action) => {
        state.formLoading = false;
        // Remove the deleted menu from the items
        state.items = state.items.filter((item) => item.id !== action.payload);
        // Reset selected menu
        state.selectedMenu = null;
      })
      .addCase(deleteMenu.rejected, (state, action) => {
        state.formLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  addMenuItem,
  updateMenuItem,
  setSelectedMenu,
  setSelectedRootMenu,
  updateSelectedMenuField,
} = menuSlice.actions;

export default menuSlice.reducer;
