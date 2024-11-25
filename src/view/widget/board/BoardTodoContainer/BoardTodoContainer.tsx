import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './BoardTodoContainer.module.css';
import { useStore } from '@vanyamate/sec-react';
import { $boardTodos } from '@/model/board/board.model.ts';
import {
    BoardTodoItem,
} from '@/view/widget/board/BoardTodoItem/BoardTodoItem.tsx';


export type BoardTodoContainerProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const BoardTodoContainer: FC<BoardTodoContainerProps> = memo(function BoardTodoContainer (props) {
    const { className, ...other } = props;
    const boardTodos              = useStore($boardTodos);

    return (
        <div { ...other }
             className={ classNames(css.container, {}, [ className ]) }>
            {
                Object.keys(boardTodos).map((key) => (
                    <BoardTodoItem todoId={ key } key={ key }/>
                ))
            }
        </div>
    );
});