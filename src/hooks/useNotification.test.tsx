import { renderHook } from '@testing-library/react-hooks';
import { NotificationContext } from 'contexts/notificationContext';
import { useNotification } from 'hooks/useNotification';

test('returns correct notification values', () => {
  const mockState = {
    message: 'Test message',
    variant: 'success',
    duration: 5000
  };

  const wrapper = ({ children }) => (
    <NotificationContext.Provider value={{ notificationState: mockState }}>
      {children}
    </NotificationContext.Provider>
  );

  const { result } = renderHook(() => useNotification(), { wrapper });

  expect(result.current.message).toBe('Test message');
  expect(result.current.variant).toBe('success');
  expect(result.current.duration).toBe(5000);
});
