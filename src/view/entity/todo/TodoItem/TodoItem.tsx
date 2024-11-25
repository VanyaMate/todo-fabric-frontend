import { FC, memo } from 'react';
import classNames from 'classnames';
import css from './TodoItem.module.css';
import { Card, CardProps, Option, Select, Typography } from '@mui/joy';
import { DomainTodo, DomainTodoStatus } from '@vanyamate/todo-fabric-types';


export type TodoItemProps =
    {
        todo: DomainTodo;
    }
    & CardProps;

export const TodoItem: FC<TodoItemProps> = memo(function TodoItem (props) {
    const { todo, className, ...other } = props;

    return (
        <Card { ...other }
              className={ classNames(css.container, {}, [ className ]) }>
            <Typography level={ 'body-xs' }>{ todo.createdTime }</Typography>
            <Typography level={ 'h2' }>{ todo.title }</Typography>
            <Typography level={ 'body-md' }>{ todo.description }</Typography>
            <Typography level={ 'body-sm' }>{ todo.dueTime }</Typography>
            <Select placeholder={ 'Выберите состояние' }>
                <Option value={ DomainTodoStatus.PENDING }>Ожидает</Option>
                <Option value={ DomainTodoStatus.WIP }>В работе</Option>
                <Option value={ DomainTodoStatus.COMPLETED }>Завершено</Option>
            </Select>
        </Card>
    );
});