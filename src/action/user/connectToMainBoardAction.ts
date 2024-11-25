import { DomainUser, DomainUserCreateData } from '@vanyamate/todo-fabric-types';


export const connectToMainBoardAction = function (createData: DomainUserCreateData): Promise<DomainUser> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id  : '',
                name: createData.name,
            });
        }, 500);
    });
};