import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { IntlProvider } from 'react-intl';
import zhCN from './locales/zh-CN.json';
import enUS from './locales/en-US.json';

const messages: Record<string, any> = {
  'en-US': enUS,
  'zh-CN': zhCN
}

const locale = navigator.language;

createRoot(document.getElementById('root')!).render(
    <IntlProvider 
      messages={messages[locale]}
      locale={locale}
    >
      <App />
    </IntlProvider>
)
