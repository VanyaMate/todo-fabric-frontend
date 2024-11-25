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
import { $boardMode } from '@/model/board/board.model.ts';
import { BoardMode } from '@/model/board/types/board.model.types.ts';


export type BoardCanvasProps =
    {
        scrollContainerRef: RefObject<HTMLElement>;
        // add info about all
    }
    & ComponentPropsWithoutRef<'canvas'>;

export const BoardCanvas: FC<BoardCanvasProps> = memo(function BoardCanvas (props) {
    const { className, width, height, scrollContainerRef } = props;
    const boardMode                                        = useStore($boardMode);
    const [ blockScroll, setBlockScroll ]                  = useState<boolean>(false);
    const canvasRef                                        = useRef<HTMLCanvasElement>(null);
    const containerRef                                     = useRef<HTMLDivElement>(null);
    const fabricCanvas                                     = useRef<fabric.Canvas | null>(null);

    useScrollByMouseDrag(containerRef, scrollContainerRef, blockScroll || boardMode === BoardMode.SELECTION);

    useLayoutEffect(() => {
        if (canvasRef.current) {
            fabricCanvas.current = new fabric.Canvas(canvasRef.current, {
                selection: boardMode === BoardMode.SELECTION,
            });

            fabricCanvas.current!.on('selection:created', () => setBlockScroll(true));
            fabricCanvas.current!.on('selection:cleared', () => setBlockScroll(false));

            const interval = setInterval(() => {
                const rect = new fabric.Rect({
                    top   : 100,
                    left  : 100,
                    width : 50,
                    height: 100,
                    fill  : 'red',
                });
                fabricCanvas.current!.add(rect);
            }, 1000);

            return () => {
                fabricCanvas.current!.dispose();
                clearInterval(interval);
            };
        }
    }, []);

    useLayoutEffect(() => {
        const canvas = fabricCanvas.current;
        if (canvas) {
            canvas.selection = boardMode === BoardMode.SELECTION;
        }
    }, [ boardMode ]);

    return (
        <div ref={ containerRef } className={ css.container }>
            <canvas
                width={ width }
                height={ height }
                className={ className }
                ref={ canvasRef }
            ></canvas>
        </div>
    );
});