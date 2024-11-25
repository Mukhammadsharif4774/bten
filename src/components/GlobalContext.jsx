import React, {createContext, useEffect, useState, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GlobalContext = createContext({});

export function GlobalProvider({children}) {
  const [state, setState] = useState({
    refresh: false,
    lang: 'ru',
    avatar: null,
    name: '',
    phone: '',
    address: '',
  });

  const setField = (field, value) => {
    setState(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const getLocale = useCallback(async () => {
    const fields = ['language', 'avatar', 'name', 'phone', 'address'];
    const values = await Promise.all(
      fields.map(field => AsyncStorage.getItem(field)),
    );

    setState(prevState => ({
      ...prevState,
      lang: values[0] || prevState.lang,
      avatar: values[1] || prevState.avatar,
      name: values[2] || prevState.name,
      phone: values[3] || prevState.phone,
      address: values[4] || prevState.address,
    }));
  }, []);

  useEffect(() => {
    getLocale();
  }, [getLocale]);

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        setRefresh: value => setField('refresh', value),
        setLang: value => setField('lang', value),
        setAvatar: value => setField('avatar', value),
        setName: value => setField('name', value),
        setPhone: value => setField('phone', value),
        setAddress: value => setField('address', value),
      }}>
      {children}
    </GlobalContext.Provider>
  );
}
