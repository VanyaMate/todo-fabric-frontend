import { FC, memo, Suspense } from 'react';
import { useStore } from '@vanyamate/sec-react';
import { $user } from '@/model/user/user.model.ts';
import AppContentLazy from '@/app/user-content/App.content.lazy.tsx';
import { AppWelcome } from '@/app/welcome-content/App.welcome.tsx';
import { CircularProgress, CssVarsProvider } from '@mui/joy';


export const App: FC = memo(function App () {
    const user = useStore($user);

    return (
        <CssVarsProvider defaultMode={ 'dark' }>
            {
                user
                ? <Suspense fallback={ <CircularProgress/> }>
                    <AppContentLazy/>
                </Suspense>
                : <AppWelcome/>
            }
        </CssVarsProvider>
    );
});