import { useEffect } from 'react';
import eruda from 'eruda';

export default function ErudaClient() {
  useEffect(() => {
    if (import.meta.env.PUBLIC_ENV === 'development') eruda.init();
  }, []);
  return;
}