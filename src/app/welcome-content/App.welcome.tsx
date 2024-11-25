import { FC, memo } from 'react';
import {
    ConnectToMainBoardForm,
} from '@/view/widget/user/ConnectToMainBoardForm/ConnectToMainBoardForm.tsx';


export const AppWelcome: FC = memo(function AppWelcome () {
    return (
        <ConnectToMainBoardForm/>
    );
});