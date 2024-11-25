import {
    DomainBoardTodo,
    DomainBoardTodoPosition,
} from '@vanyamate/todo-fabric-types';
import {
    BOARD_LOCALSTORAGE_TODOS,
} from '@/action/board/localstorage/const/board-localstorage.const.ts';


export const changeBoardTodoPositionLocalstorageAction = async function (todoId: string, position: DomainBoardTodoPosition): Promise<[ string, DomainBoardTodoPosition ]> {
    const items: Record<string, DomainBoardTodo> = JSON.parse(localStorage.getItem(BOARD_LOCALSTORAGE_TODOS) ?? '{}');
    const item                                   = items[todoId];
    if (item) {
        items[todoId].position = position;
        localStorage.setItem(BOARD_LOCALSTORAGE_TODOS, JSON.stringify(items));
    }
    return [ todoId, position ];
};