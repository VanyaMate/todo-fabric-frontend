import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    RefObject,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import css from './BoardCanvas.module.css';
import {
    useScrollByMouseDrag,
} from '@/view/widget/board/Board/hooks/useScrollByMouseDrag.ts';
import * as fabric from 'fabric';
import { useStore } from '@vanyamate/sec-react';
import {
    $boardMode,
    $boardTodos,
    $boardUsers,
    changeBoardUserPositionEffect,
} from '@/model/board/board.model.ts';
import { BoardMode } from '@/model/board/types/board.model.types.ts';
import {
    BoardCanvasUserItem,
} from '@/view/widget/board/BoardCanvasUserItem/BoardCanvasUserItem.tsx';
import {
    BoardCanvasTodoItem,
} from '@/view/widget/board/BoardCanvasTodoItem/BoardCanvasTodoItem.tsx';


export type BoardCanvasProps =
    {
        scrollContainerRef: RefObject<HTMLElement>;
    }
    & ComponentPropsWithoutRef<'canvas'>;

export const BoardCanvas: FC<BoardCanvasProps> = memo(function BoardCanvas (props) {
    const { className, width, height, scrollContainerRef } = props;
    const boardMode                                        = useStore($boardMode);
    const boardUsers                                       = useStore($boardUsers);
    const boardTodos                                       = useStore($boardTodos);
    const [ blockScroll, setBlockScroll ]                  = useState<boolean>(false);
    const canvasRef                                        = useRef<HTMLCanvasElement>(null);
    const containerRef                                     = useRef<HTMLDivElement>(null);
    const [ fabricCanvas, setFabricCanvas ]                = useState<fabric.Canvas | null>(null);

    useScrollByMouseDrag(containerRef, scrollContainerRef, blockScroll || boardMode === BoardMode.SELECTION);

    useLayoutEffect(() => {
        if (canvasRef.current) {
            const fabricCanvas = new fabric.Canvas(canvasRef.current, {
                selection: boardMode === BoardMode.SELECTION,
            });

            setFabricCanvas(fabricCanvas);

            fabricCanvas.on('selection:created', () => setBlockScroll(true));
            fabricCanvas.on('selection:cleared', () => setBlockScroll(false));

            return () => {
                fabricCanvas.dispose();
            };
        }
    }, []);

    useLayoutEffect(() => {
        if (fabricCanvas) {
            fabricCanvas.selection = boardMode === BoardMode.SELECTION;
        }
    }, [ boardMode ]);

    useLayoutEffect(() => {
        const ref = containerRef.current;
        if (ref) {
            const movehandler  = function (e: MouseEvent) {
                changeBoardUserPositionEffect('test-1', {
                    top: e.layerY, left: e.layerX,
                });
            };
            const clickhandler = function () {
                /*                const id = Math.random().toString(16);
                 createBoardTodoLocalstorageEffect({
                 todo    : {
                 id         : id,
                 title      : `todo-${ id }`,
                 description: `description for ${ id }`,
                 dueTime    : Date.now() + 60000,
                 createdTime: Date.now(),
                 status     : DomainTodoStatus.PENDING,
                 },
                 position: {
                 top     : e.layerY,
                 left    : e.layerX,
                 rotation: 0,
                 },
                 size    : {
                 width : 300,
                 height: 200,
                 },
                 });*/
            };
            ref.addEventListener('mousemove', movehandler);
            ref.addEventListener('click', clickhandler);
            return () => {
                ref.removeEventListener('mousemove', movehandler);
                ref.removeEventListener('click', clickhandler);
            };
        }
    }, []);

    return (
        <div ref={ containerRef } className={ css.container }>
            <canvas
                width={ width }
                height={ height }
                className={ className }
                ref={ canvasRef }
            ></canvas>
            {
                fabricCanvas
                ? Object.keys(boardUsers).map((key) => (
                    <BoardCanvasUserItem
                        fabricCanvas={ fabricCanvas }
                        userId={ key }
                        key={ `user-${ key }` }
                    />
                ))
                : null
            }
            {
                fabricCanvas
                ? Object.keys(boardTodos).map((key) => (
                    <BoardCanvasTodoItem
                        fabricCanvas={ fabricCanvas }
                        todoId={ key }
                        key={ `todo-${ key }` }
                    />
                ))
                : null
            }
        </div>
    );
});