import { DomainUser } from '@vanyamate/todo-fabric-types';
import { effect, store } from '@vanyamate/sec';
import { connectToMainBoardAction } from '@/action/user/connectToMainBoardAction.ts';


export const connectToMainBoardEffect = effect(connectToMainBoardAction);

export const $userConnecting = store<boolean>(false)
    .on(connectToMainBoardEffect, 'onBefore', () => true)
    .on(connectToMainBoardEffect, 'onFinally', () => false);

export const $user = store<DomainUser | null>(null)
    .on(connectToMainBoardEffect, 'onSuccess', (_, { result }) => result!);