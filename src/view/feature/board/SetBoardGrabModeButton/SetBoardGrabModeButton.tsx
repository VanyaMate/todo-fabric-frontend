import { FC, memo, useLayoutEffect } from 'react';
import { Button, ButtonProps } from '@mui/joy';
import {
    $boardMode,
    toggleBoardModeEffect,
} from '@/model/board/board.model.ts';
import { BoardMode } from '@/model/board/types/board.model.types.ts';
import { IoMdHand } from 'react-icons/io';
import { useStore } from '@vanyamate/sec-react';


export type SetBoardGrabModeButtonProps =
    {}
    & ButtonProps;

export const SetBoardGrabModeButton: FC<SetBoardGrabModeButtonProps> = memo(function SetBoardGrabModeButton (props) {
    const boardMode = useStore($boardMode);

    return (
        <Button
            { ...props }
            onClick={ () => toggleBoardModeEffect(BoardMode.GRAB) }
            disabled={ boardMode === BoardMode.GRAB }
        >
            <IoMdHand/>
        </Button>
    );
});