import {
    FC,
    memo,
    useLayoutEffect,
    useRef,
} from 'react';
import { useStore } from '@vanyamate/sec-react';
import {
    $boardTodos,
    changeBoardTodoPositionEffect,
    changeBoardTodoSizeEffect,
} from '@/model/board/board.model.ts';
import * as fabric from 'fabric';


export type BoardCanvasTodoItemProps = {
    fabricCanvas: fabric.Canvas,
    todoId: string;
};

export const BoardCanvasTodoItem: FC<BoardCanvasTodoItemProps> = memo(function BoardCanvasTodoItem (props) {
    const { fabricCanvas, todoId } = props;
    const todo                     = useStore($boardTodos.get()[todoId]);

    const item = useRef<fabric.Rect>(
        new fabric.Rect({
            width       : todo.size.width,
            height      : todo.size.height,
            fill        : '#555',
            top         : todo.position.top,
            left        : todo.position.left,
            lockRotation: true,
        }),
    );

    useLayoutEffect(() => {
        item.current.on('moving', () => {
            changeBoardTodoPositionEffect(todoId, {
                top     : item.current.top,
                left    : item.current.left,
                rotation: item.current.angle,
            });
        });

        item.current.on('scaling', () => {
            changeBoardTodoSizeEffect(todoId, {
                width : item.current.width * item.current.scaleX,
                height: item.current.height * item.current.scaleY,
            });
            changeBoardTodoPositionEffect(todoId, {
                top     : item.current.top,
                left    : item.current.left,
                rotation: item.current.angle,
            });
            item.current.scale(1);
        });

        return () => {
            item.current.dispose();
        };
    }, []);

    useLayoutEffect(() => {
        if (fabricCanvas) {
            item.current.left   = todo.position.left;
            item.current.top    = todo.position.top;
            item.current.angle  = todo.position.rotation;
            item.current.width  = todo.size.width;
            item.current.height = todo.size.height;

            console.log(todo.size);

            fabricCanvas.requestRenderAll();
        }
    }, [ todo, fabricCanvas ]);

    useLayoutEffect(() => {
        if (fabricCanvas) {
            fabricCanvas.add(item.current);
            return () => {
                fabricCanvas.remove(item.current);
            };
        }
    }, [ fabricCanvas ]);

    return null;
});