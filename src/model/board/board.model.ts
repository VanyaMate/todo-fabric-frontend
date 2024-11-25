import { effect, Store, store } from '@vanyamate/sec';
import { BoardMode } from '@/model/board/types/board.model.types.ts';
import {
    toggleBoardModeLocalstorageAction,
} from '@/action/board/localstorage/toggleBoardModeLocalstorage.action.ts';
import {
    DomainBoardTodo,
    DomainBoardUser,
    DomainBoardUserStatus,
    DomainBoardUserTargetType,
} from '@vanyamate/todo-fabric-types';
import {
    changeBoardUserPositionLocalstorageAction,
} from '@/action/board/localstorage/user/changeBoardUserPositionLocalstorage.action.ts';
import {
    changeBoardTodoPositionLocalstorageAction,
} from '@/action/board/localstorage/todo/changeBoardTodoPositionLocalstorage.action.ts';
import {
    createBoardTodoLocalstorageAction,
} from '@/action/board/localstorage/todo/createBoardTodoLocalstorage.action.ts';
import {
    BOARD_LOCALSTORAGE_TODOS,
} from '@/action/board/localstorage/const/board-localstorage.const.ts';
import {
    changeBoardTodoSizeLocalstorageAction,
} from '@/action/board/localstorage/todo/changeBoardTodoSizeLocalstorage.action.ts';


export const toggleBoardModeEffect               = effect(toggleBoardModeLocalstorageAction);
export const changeBoardUserPositionEffect       = effect(changeBoardUserPositionLocalstorageAction);
export const changeBoardTodoPositionEffect       = effect(changeBoardTodoPositionLocalstorageAction);
export const changeBoardTodoSizeEffect           = effect(changeBoardTodoSizeLocalstorageAction);
export const shadowChangeBoardTodoPositionEffect = effect(changeBoardTodoPositionLocalstorageAction);
export const createBoardTodoLocalstorageEffect   = effect(createBoardTodoLocalstorageAction);

// Выбранный board-mode
export const $boardMode = store<BoardMode>(BoardMode.GRAB)
    .on(toggleBoardModeEffect, 'onSuccess', (_, { result }) => result!);

export const $boardUsers = store<Record<string, Store<DomainBoardUser>>>({
    'test-1': store<DomainBoardUser>({
        user    : {
            id  : '',
            name: 'admin2',
        },
        position: {
            top : 100,
            left: 200,
        },
        activity: {
            target: {
                id  : '',
                type: DomainBoardUserTargetType.NONE,
            },
            status: DomainBoardUserStatus.CURSOR,
        },
    }),
})
    .on(changeBoardUserPositionEffect, 'onSuccess', (state, { result }) => {
        const userStore = state[result![0]];
        if (userStore) {
            userStore.set({
                ...userStore.get(),
                position: result![1],
            });
        }
        return state;
    });
export const $boardTodos = store<Record<string, Store<DomainBoardTodo>>>((() => {
    const items                                            = JSON.parse(localStorage.getItem(BOARD_LOCALSTORAGE_TODOS) ?? '{}');
    const response: Record<string, Store<DomainBoardTodo>> = {};

    Object.keys(items).forEach((key) => {
        response[key] = store(items[key]);
    });

    return response;
})())
    .on(changeBoardTodoPositionEffect, 'onSuccess', (state, { result }) => {
        const [ id, position ] = result!;
        const todoStore        = state[id];
        if (todoStore) {
            todoStore.set({
                ...todoStore.get(),
                position,
            });
        }
        return state;
    })
    .on(changeBoardTodoSizeEffect, 'onSuccess', (state, { result }) => {
        const [ id, size ] = result!;
        const todoStore    = state[id];
        if (todoStore) {
            todoStore.set({
                ...todoStore.get(),
                size,
            });
        }
        return state;
    })
    .on(shadowChangeBoardTodoPositionEffect, 'onSuccess', (state, { result }) => {
        const [ id, position ] = result!;
        const todoStore        = state[id];
        if (todoStore) {
            todoStore.get().position = position;
        }
        return state;
    })
    .on(createBoardTodoLocalstorageEffect, 'onSuccess', (state, { result }) => {
        state[result!.todo.id] = store(result!);
        return { ...state };
    });