import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserDetails {
  id: number;
  firstName: string;
  email: string;
  role: number;
  iat: number;
  exp: number;
}

interface UserState {
  userDetails: UserDetails | null;
}

const initialState: UserState = {
  userDetails: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<UserDetails>) => {
      return {
        ...state,
        userDetails: action.payload,
      };
    },
  },
});
export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;
