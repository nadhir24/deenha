import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { selectNotifications, removeNotification } from '../../store/notificationSlice';

/** Renders notification toasts from Redux state. Auto-dismiss after 3s. */
export default function NotificationToast() {
    const notifications = useSelector(selectNotifications);
    const dispatch = useDispatch();

    return (
        <div className="fixed top-24 right-8 z-[100] flex flex-col gap-3 pointer-events-none">
            <AnimatePresence>
                {notifications.map((n) => (
                    <NotificationItem
                        key={n.id}
                        id={n.id}
                        message={n.message}
                        type={n.type}
                        onDismiss={() => dispatch(removeNotification(n.id))}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}

function NotificationItem({
    id, message, type, onDismiss,
}: {
    id: string; message: string; type: 'success' | 'error' | 'info'; onDismiss: () => void;
}) {
    useEffect(() => {
        const timer = setTimeout(onDismiss, 3000);
        return () => clearTimeout(timer);
    }, [id, onDismiss]);

    const colors = {
        success: { border: 'border-green-100', bg: 'bg-green-50', text: 'text-green-600', label: 'Success' },
        error: { border: 'border-red-100', bg: 'bg-red-50', text: 'text-red-600', label: 'Error' },
        info: { border: 'border-blue-100', bg: 'bg-blue-50', text: 'text-blue-600', label: 'Notification' },
    }[type];

    return (
        <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`pointer-events-auto min-w-[300px] p-4 shadow-2xl flex items-center gap-3 border bg-white ${colors.border}`}
        >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${colors.bg} ${colors.text}`}>
                {type === 'success' && <CheckIcon />}
                {type === 'error' && <XIcon />}
                {type === 'info' && <InfoIcon />}
            </div>
            <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-primary">{colors.label}</p>
                <p className="text-[11px] text-secondary mt-0.5">{message}</p>
            </div>
            <button onClick={onDismiss} className="ml-auto p-1 text-secondary hover:text-primary transition-colors">
                <XIcon small />
            </button>
        </motion.div>
    );
}

const CheckIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const XIcon = ({ small }: { small?: boolean }) => (
    <svg className={small ? 'w-4 h-4' : 'w-5 h-5'} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const InfoIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
