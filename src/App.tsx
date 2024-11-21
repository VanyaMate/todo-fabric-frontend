import { ComponentPropsWithoutRef, FC, memo } from 'react';


export type AppProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const App: FC<AppProps> = memo(function App (props) {
    const { className, ...other } = props;

    return (
        <div { ...other }>
            App Component
        </div>
    );
});