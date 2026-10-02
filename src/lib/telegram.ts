// Telegram WebApp helper — safely access Telegram Mini App API

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        close: () => void;
        MainButton: {
          text: string;
          color: string;
          textColor: string;
          isVisible: boolean;
          isActive: boolean;
          show: () => void;
          hide: () => void;
          onClick: (cb: () => void) => void;
          offClick: (cb: () => void) => void;
          enable: () => void;
          disable: () => void;
        };
        BackButton: {
          isVisible: boolean;
          show: () => void;
          hide: () => void;
          onClick: (cb: () => void) => void;
          offClick: (cb: () => void) => void;
        };
        themeParams: {
          bg_color?: string;
          text_color?: string;
          hint_color?: string;
          link_color?: string;
          button_color?: string;
          button_text_color?: string;
          secondary_bg_color?: string;
        };
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
          };
        };
        colorScheme: "light" | "dark";
        headerColor: string;
        backgroundColor: string;
        isExpanded: boolean;
        viewportHeight: number;
        viewportStableHeight: number;
        platform: string;
      };
    };
  }
}

export function getTelegramWebApp() {
  if (typeof window !== "undefined" && window.Telegram?.WebApp) {
    return window.Telegram.WebApp;
  }
  return null;
}

export function getTelegramUser() {
  const webapp = getTelegramWebApp();
  if (webapp?.initDataUnsafe?.user) {
    return webapp.initDataUnsafe.user;
  }
  return null;
}

export function initTelegramApp() {
  const webapp = getTelegramWebApp();
  if (webapp) {
    webapp.ready();
    webapp.expand();
  }
}

export function isTelegramContext(): boolean {
  return getTelegramWebApp() !== null;
}
