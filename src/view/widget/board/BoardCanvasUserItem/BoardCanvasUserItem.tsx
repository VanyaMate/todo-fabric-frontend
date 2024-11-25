import { FC, memo, useLayoutEffect, useRef } from 'react';
import * as fabric from 'fabric';
import { useStore } from '@vanyamate/sec-react';
import {
    $boardUsers,
} from '@/model/board/board.model.ts';


export type BoardCanvasUserItemProps = {
    fabricCanvas?: fabric.Canvas | null,
    userId: string;
};

export const BoardCanvasUserItem: FC<BoardCanvasUserItemProps> = memo(function BoardCanvasUserItem (props) {
    const { fabricCanvas, userId } = props;
    const boardUser                = useStore($boardUsers.get()[userId]);
    const item                     = useRef<fabric.Group>(
        new fabric.Group([
            new fabric.Textbox('👆🏻', {}),
            new fabric.Textbox(boardUser.user.name, {
                fill      : '#AAA',
                fontFamily: 'Consolas',
                fontSize  : 16,
                top       : 40,
                left      : 0,
            }),
        ], {
            top        : boardUser.position.top,
            left       : boardUser.position.left,
            selectable : false,
            hasControls: false,
            hasBorders : false,
            hoverCursor: 'default',
        }),
    );

    useLayoutEffect(() => {
        if (fabricCanvas) {
            item.current.left = boardUser.position.left;
            item.current.top  = boardUser.position.top;
            fabricCanvas.requestRenderAll();
        }
    }, [ boardUser, fabricCanvas ]);

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