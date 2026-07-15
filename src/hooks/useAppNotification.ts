import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { showNotification as showAction } from '../store/notificationSlice';

type NotificationType = 'success' | 'error' | 'info';

/** Drop-in replacement for useNotification() from NotificationContext — uses Redux */
export function useNotification() {
    const dispatch = useDispatch();

    const showNotification = useCallback(
        (message: string, type: NotificationType = 'success') => {
            dispatch(showAction(message, type));
        },
        [dispatch]
    );

    return { showNotification };
}
