import { ComponentPropsWithoutRef, FC, memo, useRef } from 'react';
import classNames from 'classnames';
import css from './Board.module.css';
import {
    BoardControlPanels,
} from '@/view/widget/board/BoardControlPanels/BoardControlPanels.tsx';
import { BoardCanvas } from '@/view/widget/board/BoardCanvas/BoardCanvas.tsx';


export type BoardProps =
    {
        width: number | string;
        height: number | string;
        boardWidth: number | string;
        boardHeight: number | string;
    }
    & ComponentPropsWithoutRef<'div'>;

export const Board: FC<BoardProps> = memo(function Board (props) {
    const {
              width,
              height,
              boardHeight,
              boardWidth,
              className,
              ...other
          }                  = props;
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    return (
        <div { ...other }
             style={ { width, height } }
             className={ classNames(css.container, {}, [ className ]) }
             ref={ scrollContainerRef }
        >
            <BoardControlPanels/>
            <BoardCanvas
                width={ boardWidth }
                height={ boardHeight }
                scrollContainerRef={ scrollContainerRef }
            />
        </div>
    );
});