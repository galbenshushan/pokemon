import { createSlice } from '@reduxjs/toolkit'

const answersSlice = createSlice({
    name: 'answers',
    initialState: {
        answers: [],
        correct: 0,
        justCount: 0,
        total:5,
        games:0
    },
    reducers: {
        addAnswers(state, action) {
            state.answers.push(action.payload);
            state.justCount += 1;
            if (action.payload.correct_answer === action.payload.user_answer) {
                state.correct += 1
                console.log(state.correct)
                console.log(action.payload.user_answer)
                console.log(action.payload.correct_answer)
            }
        },
        correctReset( state, action){
           state.correct = 0
           console.log(state.correct);
        }
    }
})

export const answersActions = answersSlice.actions;

export default answersSlice