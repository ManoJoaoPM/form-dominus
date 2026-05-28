declare global {
  interface Window {
    dataLayer: any[];
  }
}

export const getUTMs = (): Record<string, string> => {
  if (typeof window === 'undefined') return {};
  
  const params = new URLSearchParams(window.location.search);
  const utms: Record<string, string> = {};
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  
  utmKeys.forEach(key => {
    const value = params.get(key);
    if (value) {
      utms[key] = value;
    }
  });
  
  // Try to get from localStorage if not in URL, so they persist across reloads
  if (Object.keys(utms).length > 0) {
    localStorage.setItem('dominus_utms', JSON.stringify(utms));
  } else {
    const saved = localStorage.getItem('dominus_utms');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
  }
  
  return utms;
};

export const pushToDataLayer = (eventName: string, data: Record<string, any> = {}) => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    
    const utms = getUTMs();
    
    window.dataLayer.push({
      event: eventName,
      ...utms,
      ...data,
      timestamp: new Date().toISOString()
    });
  }
};
