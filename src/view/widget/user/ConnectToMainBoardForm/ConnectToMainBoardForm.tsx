import { FC, memo } from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Typography,
} from '@mui/joy';
import { connectToMainBoardEffect } from '@/model/user/user.model.ts';
import { useForm } from 'react-hook-form';
import { DomainUserCreateData } from '@vanyamate/todo-fabric-types';


export const ConnectToMainBoardForm: FC = memo(function ConnectToMainBoardForm () {
    const {
              register,
              handleSubmit,
              formState,
          } = useForm<DomainUserCreateData>();

    return (
        <form onSubmit={ handleSubmit(connectToMainBoardEffect) }>
            <Stack direction={ 'column' } spacing={ 3 }>
                <Typography level={ 'h2' }>Подключение к доске</Typography>
                <Stack direction={ 'column' } spacing={ 1 }>
                    <FormControl>
                        <FormLabel>Имя</FormLabel>
                        <Input
                            { ...register('name', {
                                minLength: 1,
                                required : true,
                            }) }
                            color={ 'primary' }
                            variant={ 'outlined' }
                            placeholder={ 'Введите имя' }
                        />
                    </FormControl>
                    <Button
                        type={ 'submit' }
                        loading={ formState.isSubmitting }
                        disabled={ !formState.isValid }
                    >
                        Подключиться
                    </Button>
                </Stack>
            </Stack>
        </form>
    );
});