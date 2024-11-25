import { DomainBoardTodo } from '@vanyamate/todo-fabric-types';
import {
    BOARD_LOCALSTORAGE_TODOS,
} from '@/action/board/localstorage/const/board-localstorage.const.ts';


export const createBoardTodoLocalstorageAction = async function (data: DomainBoardTodo): Promise<DomainBoardTodo> {
    const items: Record<string, DomainBoardTodo> = JSON.parse(localStorage.getItem(BOARD_LOCALSTORAGE_TODOS) ?? '{}');
    items[data.todo.id]                          = data;
    localStorage.setItem(BOARD_LOCALSTORAGE_TODOS, JSON.stringify(items));
    return data;
};