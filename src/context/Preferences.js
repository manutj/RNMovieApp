import {createContext} from 'react';

const Preferences = createContext({
  theme: '',
  toggleTheme: () => {},
});

export default Preferences;
