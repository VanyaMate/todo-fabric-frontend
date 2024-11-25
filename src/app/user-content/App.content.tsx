import { FC, memo } from 'react';
import { Board } from '@/view/widget/board/Board/Board.tsx';


export const AppContent: FC = memo(function AppContent () {
    return (
        <Board
            width={ '100dvw' }
            height={ '100dvh' }
            boardWidth={ 3000 }
            boardHeight={ 3000 }
        />
    );
});