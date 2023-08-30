import { createAction, props } from '@ngrx/store';

export const addToCompare = createAction('add to compare', props<{ item: any }>());
export const removeFromCompare = createAction('remove from compare', props<{ itemToRemove: any }>());