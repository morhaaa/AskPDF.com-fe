import { Dictionary, getDictionary } from "@/dictionaries/get-dictionary";
import { Locale } from "@/utils/i18nConfig";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface DictionaryState {
  data: Dictionary | undefined;
  loading: "idle" | "pending";
  error: string | null;
}

const initialState: DictionaryState = {
  data: undefined,
  loading: "idle",
  error: null,
};

export const setLang = createAsyncThunk<Dictionary, Locale>(
  "i18n/lang",
  async (lang) => {
    try {
      const dictionary = await getDictionary(lang);
      return dictionary;
    } catch (error: any) {
      throw new Error("Failed to fetch lang");
    }
  }
);

const langSlice = createSlice({
  name: "lang",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setLang.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(setLang.fulfilled, (state, action) => {
        state.loading = "idle";
        state.data = action.payload;
      })
      .addCase(setLang.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export const {} = langSlice.actions;

export default langSlice;
