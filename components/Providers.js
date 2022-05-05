import { useEffect, useState } from 'react';
import { morningTheme, nightTheme } from '../theme.config';
import { ThemeProvider } from 'styled-components';
import useDarkMode from 'use-dark-mode';

const Providers = ({ children }) => {
  const { value } = useDarkMode(true);
  const theme = value ? nightTheme : morningTheme;

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const body =
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>

  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{body}</div>
  }

  return body
}

export default Providers;