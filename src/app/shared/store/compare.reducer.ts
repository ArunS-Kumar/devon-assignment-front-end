import { createReducer, on } from '@ngrx/store';
import { CompareState } from './compare.state';
import { addToCompare, removeFromCompare } from './compare.actions';

export const initialState: CompareState = {
  compare: []
};

const _compareReducer = createReducer(
  initialState,
  on(addToCompare, (state, { item }) => {
    return {
      ...state,
      compare: [...state.compare, item]
    }
  }),
  on(removeFromCompare, (state, { itemToRemove }) => { 
    const updatedArray = state.compare.filter(array => array !== itemToRemove);
    console.log(itemToRemove, updatedArray);
    return {
      ...state,
      compare: updatedArray
    } 
   }),
);

export function compareReducer(state: any, action: any) {
  return _compareReducer(state, action);
}
