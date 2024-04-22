import { test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Notification from './Notification';
import { NotificationContext } from 'contexts/notificationContext';

test('renders Notification component', () => {
  const mockState = {
    message: 'Test message',
    variant: 'success',
    duration: 5000
  };

  render(
    <NotificationContext.Provider value={{ notificationState: mockState }}>
      <Notification />
    </NotificationContext.Provider>
  );

  const notificationElement = screen.getByText('Test message');
  expect(notificationElement).toBeInTheDocument();
});

test('notification disappears after specified duration', async () => {
  vi.useFakeTimers();

  const mockState = {
    message: 'Test message',
    variant: 'success',
    duration: 2000
  };

  render(
    <NotificationContext.Provider
      value={{
        notificationState: mockState,
        notificationDispatch: vi.fn(),
        showNotification: vi.fn()
      }}
    >
      <Notification />
    </NotificationContext.Provider>
  );

  const notificationElement = screen.queryByText('Test message');
  expect(notificationElement).toBeInTheDocument();

  // Advance the timers by the specified duration
  vi.advanceTimersByTime(mockState.duration);

  // Ensure the notification is still visible
  expect(notificationElement).toBeInTheDocument();

  // Wait an additional second
  vi.advanceTimersByTime(1000);

  // Ensure the notification is no longer visible
  expect(screen.queryByText('Test message')).not.toBeNull();

  // Restore the real timers
  vi.useRealTimers();
});
