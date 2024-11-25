import { FC, memo, useLayoutEffect } from 'react';
import { Button, ButtonProps } from '@mui/joy';
import {
    $boardMode,
    toggleBoardModeEffect,
} from '@/model/board/board.model.ts';
import { BoardMode } from '@/model/board/types/board.model.types.ts';
import { IoMdQrScanner } from 'react-icons/io';
import { useStore } from '@vanyamate/sec-react';


export type SetBoardSelectionModeButtonProps =
    {}
    & ButtonProps;

export const SetBoardSelectionModeButton: FC<SetBoardSelectionModeButtonProps> = memo(function SetBoardSelectionModeButton (props) {
    const boardMode = useStore($boardMode);

    return (
        <Button
            { ...props }
            onClick={ () => toggleBoardModeEffect(BoardMode.SELECTION) }
            disabled={ boardMode === BoardMode.SELECTION }
        >
            <IoMdQrScanner/>
        </Button>
    );
});