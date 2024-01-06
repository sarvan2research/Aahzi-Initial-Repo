export const useSessionStorage = (key: string) => {
  const setItem = (value: any) => {
    try {
      window.sessionStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
    }
  };

  const getItem = () => {
    try {
      const data: any = window.sessionStorage.getItem(key);
      return data ? JSON.parse(data) : undefined;
    } catch (error) {
      console.log(error);
    }
  };

  return { setItem, getItem };
};
