import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import langConfig, { LangKeys, LangConfig } from '@/lang.config';

interface LangState {
  locale: LangKeys;
  lang: LangConfig[LangKeys];
}

const initialState: LangState = {
  locale: 'zh',
  lang: langConfig.zh,
};

const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<LangKeys>) {
      state.locale = action.payload;
      state.lang = langConfig[action.payload];
    },
  },
});

export const { setLanguage } = langSlice.actions;
export default langSlice.reducer;
