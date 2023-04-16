import { toast } from 'react-toastify';

export const successPopUp = (mess) => {
  toast.success(mess, {
    autoClose: false,
    theme: 'dark',
    autoClose: 1000,
    isLoading: false,
  });
};

export const failPopUp = (mess) => {
  toast.error(mess, {
    autoClose: false,
    theme: 'dark',
    autoClose: 1000,
    isLoading: false,
  });
};
