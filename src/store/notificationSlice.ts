import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type NotificationType = 'success' | 'error' | 'info';

interface Notification {
    id: string;
    message: string;
    type: NotificationType;
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState: [] as Notification[],
    reducers: {
        showNotification: {
            reducer(state, action: PayloadAction<Notification>) {
                state.push(action.payload);
            },
            prepare(message: string, type: NotificationType = 'success') {
                return {
                    payload: {
                        id: Math.random().toString(36).substring(2, 9),
                        message,
                        type,
                    },
                };
            },
        },
        removeNotification(state, action: PayloadAction<string>) {
            return state.filter(n => n.id !== action.payload);
        },
    },
    selectors: {
        selectNotifications: (state) => state,
    },
});

export const { showNotification, removeNotification } = notificationSlice.actions;
export const { selectNotifications } = notificationSlice.selectors;
export default notificationSlice.reducer;
