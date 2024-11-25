import { DomainBoardUserPosition } from '@vanyamate/todo-fabric-types';


export const changeBoardUserPositionLocalstorageAction = async function (userId: string, position: DomainBoardUserPosition): Promise<[ string, DomainBoardUserPosition ]> {
    return [ userId, position ];
};