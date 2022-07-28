import { Morning, Night, GlobalStyles } from '../theme.config';
import { ThemeProvider } from 'styled-components';
import ThemeToggler from '../utils/ThemeToggler';

const Providers = ({ children, theme, mountedComponent }) => {
  const themeMode = (theme === "Night") ? Night : Morning;

  const body =
  <ThemeProvider theme={themeMode}>
    <GlobalStyles />
    {children}
  </ThemeProvider>

  if (!mountedComponent) {
    return <div style={{ visibility: 'hidden' }}>{body}</div>
  }

  return body
}

export default Providers;