import { useEffect } from 'react';

const useRequiredValidation = (array, field, setIsDisabled) => {
  useEffect(() => {
    if (array.every((value) => value !== '') && field !== '') {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [array, field, setIsDisabled]);
};

export default useRequiredValidation;
