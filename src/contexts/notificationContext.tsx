import {
  Dispatch,
  createContext,
  useEffect,
  useReducer,
  ReactNode
} from 'react';

interface NotificationState {
  message?: string;
  duration?: number;
  variant?: 'danger' | 'info' | 'success' | 'warning';
}

interface NotificationAction {
  type: 'SET_MESSAGE';
  message: string;
  duration?: number;
  variant?: 'danger' | 'info' | 'success' | 'warning';
}

interface NotificationContextType {
  notificationState: NotificationState;
  notificationDispatch: Dispatch<NotificationAction>;
  showNotification: (options?: Partial<NotificationState>) => void;
}
const initialNotificationState = {
  message: '',
  duration: 5000,
  variant: 'success' as const
};

const notificationReducer = (
  state: NotificationState,
  action: NotificationAction
) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return {
        ...state,
        message: action.message,
        duration: action.duration || state.duration,
        variant: action.variant || state.variant
      };
    default:
      return state;
  }
};

export const NotificationContext = createContext<NotificationContextType>({
  notificationState: initialNotificationState,
  notificationDispatch: () => {},
  showNotification: () => {}
});

export const NotificationContextProvider: React.FC<{
  children: ReactNode;
}> = (props) => {
  const [notificationState, notificationDispatch] = useReducer(
    notificationReducer,
    initialNotificationState
  );

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (notificationState.message) {
      timer = setTimeout(() => {
        notificationDispatch({ type: 'SET_MESSAGE', message: '' });
      }, notificationState.duration || 5000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [notificationState, notificationDispatch]);

  const showNotification = (options?: Partial<NotificationState>) => {
    notificationDispatch({
      type: 'SET_MESSAGE',
      message: options?.message || '',
      duration: options?.duration,
      variant: options?.variant ?? 'success'
    });
  };

  const contextValue = {
    notificationState,
    notificationDispatch,
    showNotification
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
