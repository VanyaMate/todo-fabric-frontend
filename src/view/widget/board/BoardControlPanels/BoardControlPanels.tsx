import { FC, memo } from 'react';
import css from './BoardControlPanels.module.css';
import { ButtonGroup, Sheet, SheetProps } from '@mui/joy';
import classNames from 'classnames';
import {
    SetBoardGrabModeButton,
} from '@/view/feature/board/SetBoardGrabModeButton/SetBoardGrabModeButton.tsx';
import {
    SetBoardSelectionModeButton,
} from '@/view/feature/board/SetBoardSelectionModeButton/SetBoardSelectionModeButton.tsx';


export type BoardControlPanelsProps =
    {}
    & SheetProps;

export const BoardControlPanels: FC<BoardControlPanelsProps> = memo(function BoardControlPanels (props) {
    const { className, ...other } = props;

    return (
        <>
            <Sheet { ...other }
                   variant={ 'soft' }
                   className={ classNames(css.container, [ className, css.left ]) }
            >
                <ButtonGroup>
                    <SetBoardGrabModeButton/>
                    <SetBoardSelectionModeButton/>
                </ButtonGroup>
            </Sheet>
            <Sheet { ...other }
                   variant={ 'soft' }
                   className={ classNames(css.container, [ className, css.right ]) }
            >
                Right Component
            </Sheet>
        </>
    );
});