import { FC, memo } from 'react';
import css from './BoardTodoItem.module.css';
import { TodoItem } from '@/view/entity/todo/TodoItem/TodoItem.tsx';
import { useStore } from '@vanyamate/sec-react';
import { $boardTodos } from '@/model/board/board.model.ts';


export type BoardTodoItemProps = {
    todoId: string;
};

export const BoardTodoItem: FC<BoardTodoItemProps> = memo(function BoardTodoItem (props) {
    const { todoId } = props;
    const boardTodo  = useStore($boardTodos.get()[todoId]);

    return (
        <TodoItem
            className={ css.container }
            todo={ boardTodo.todo }
            style={ {
                width    : boardTodo.size.width - 20,
                height   : boardTodo.size.height - 20,
                transform: `translate(${ boardTodo.position.left + 10 }px, ${ boardTodo.position.top + 10 }px) rotate(${ boardTodo.position.rotation }deg)`,
            } }
        />
    );
});