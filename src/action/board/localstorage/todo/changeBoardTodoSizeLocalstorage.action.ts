import {
    DomainBoardTodo,
    DomainBoardTodoSize,
} from '@vanyamate/todo-fabric-types';
import {
    BOARD_LOCALSTORAGE_TODOS,
} from '@/action/board/localstorage/const/board-localstorage.const.ts';


export const changeBoardTodoSizeLocalstorageAction = async function (todoId: string, size: DomainBoardTodoSize): Promise<[ string, DomainBoardTodoSize ]> {
    const items: Record<string, DomainBoardTodo> = JSON.parse(localStorage.getItem(BOARD_LOCALSTORAGE_TODOS) ?? '{}');
    const item                                   = items[todoId];
    if (item) {
        items[todoId].size = size;
        localStorage.setItem(BOARD_LOCALSTORAGE_TODOS, JSON.stringify(items));
    }
    return [ todoId, size ];
};