import { useNotification } from 'hooks/useNotification';

const Notification = () => {
  const { message, variant } = useNotification();
  if (!message) {
    return null;
  }

  let backgroundColor;
  let borderColor;
  let color;

  switch (variant) {
    case 'success':
      backgroundColor = 'bg-green-100';
      borderColor = 'border-green-400';
      color = 'text-green-700';
      break;
    case 'danger':
      backgroundColor = 'bg-red-100';
      borderColor = 'border-red-400';
      color = 'text-red-700';
      break;
    case 'info':
      backgroundColor = 'bg-blue-100';
      borderColor = 'border-blue-400';
      color = 'text-blue-700';
      break;
    case 'warning':
      backgroundColor = 'bg-yellow-100';
      borderColor = 'border-yellow-400';
      color = 'text-yellow-700';
      break;
    default:
      backgroundColor = 'bg-gray-100';
      borderColor = 'border-gray-400';
      color = 'text-gray-700';
  }

  return (
    <div className="flex justify-center">
      <div
        className={`border  rounded-md ${backgroundColor} ${borderColor} ${color} w-10/12 h-9 fixed top-6  z-[9999]`}
      >
        <div className="inline-flex items-start">{message}</div>
      </div>
    </div>
  );
};

export default Notification;
