import { effect, Store, store } from '@vanyamate/sec';
import {
    BoardMode,
} from '@/model/board/types/board.model.types.ts';
import {
    toggleBoardModeAction,
} from '@/action/board/toggleBoardMode.action.ts';
import { DomainBoardTodo, DomainBoardUser } from '@vanyamate/todo-fabric-types';


export const toggleBoardModeEffect = effect(toggleBoardModeAction);

// Выбранный board-mode
export const $boardMode = store<BoardMode>(BoardMode.GRAB)
    .on(toggleBoardModeEffect, 'onSuccess', (_, { result }) => result!);