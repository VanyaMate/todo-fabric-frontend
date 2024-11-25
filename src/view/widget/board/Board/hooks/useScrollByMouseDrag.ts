import { RefObject, useLayoutEffect } from 'react';


export const useScrollByMouseDrag = function (triggerRef: RefObject<HTMLElement>, scrollRef: RefObject<HTMLElement>, blockScroll: boolean = false) {
    useLayoutEffect(() => {
        const triggerContainer = triggerRef.current;
        const scrollContainer  = scrollRef.current;

        if (scrollContainer && triggerContainer && !blockScroll) {
            let initScrollX: number = 0;
            let initScrollY: number = 0;
            let posX: number        = 0;
            let posY: number        = 0;
            let dragged: boolean    = false;

            const dragstart = function (event: MouseEvent) {
                posX        = event.clientX;
                posY        = event.clientY;
                initScrollX = scrollContainer.scrollLeft;
                initScrollY = scrollContainer.scrollTop;
                dragged     = true;
            };

            const drag = function (event: MouseEvent) {
                if (dragged) {
                    console.log('scroll to', initScrollX + posX - event.clientX, initScrollY + posY - event.clientY);
                    scrollContainer.scrollTo({
                        left    : initScrollX + posX - event.clientX,
                        top     : initScrollY + posY - event.clientY,
                        behavior: 'instant',
                    });
                }
            };

            const dragend = function () {
                dragged = false;
            };

            triggerContainer.addEventListener('mousedown', dragstart);
            triggerContainer.addEventListener('mousemove', drag);
            triggerContainer.addEventListener('mouseup', dragend);
            triggerContainer.addEventListener('mouseout', dragend);
            triggerContainer.addEventListener('mouseleave', dragend);

            return () => {
                triggerContainer.removeEventListener('mousedown', dragstart);
                triggerContainer.removeEventListener('mousemove', drag);
                triggerContainer.removeEventListener('mouseup', dragend);
                triggerContainer.removeEventListener('mouseout', dragend);
                triggerContainer.removeEventListener('mouseleave', dragend);
            };
        }
    }, [ scrollRef.current, triggerRef.current, blockScroll ]);
};