import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { app } from '../config/firebase';
import { getFirestore, getDocs, where, query, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firestore = getFirestore(app)
const auth = getAuth(app)

const fetchBoardsByUserId = createAsyncThunk("fs/getBoards",
    async () => {
        const arr = []
        const userid = auth.currentUser.uid;
        const q = query(collection(firestore, "boards"), where("user", "==", userid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc)=>{
            const object = {}
            object.id = doc.id;
            object.boardName = doc.data().boardName
            arr.push(object)
        })
        return arr;
    }

)

const initialState = {
    loading: false,
    boards: [],
    error: ''
}

export const boardsSlice = createSlice({
    name: "boards",
    initialState,
    reducers: {
        // ...
    },
    extraReducers: builder => {
        builder.addCase(fetchBoardsByUserId.pending, state => {
            state.loading = true;
        })
        builder.addCase(fetchBoardsByUserId.fulfilled, (state, action) => {
            state.loading = false;
            state.boards = action.payload
            state.error = ''
        })
        builder.addCase(fetchBoardsByUserId.rejected, (state, action) => {
            state.loading = false;
            state.boards = []
            state.error = action.error.message
        })
    },
    

});


export const boardActions = {
    ...boardsSlice.actions,
    fetchBoardsByUserId,
  }


export default boardsSlice.reducer;