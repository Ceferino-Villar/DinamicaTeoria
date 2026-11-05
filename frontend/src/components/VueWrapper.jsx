import { useEffect, useRef } from 'react';
import { createApp } from 'vue';
import ModuloVue from './ModuloVue.vue';

export default function VueWrapper() {
  const containerRef = useRef(null);

  useEffect(() => {
    const app = createApp(ModuloVue);
    app.mount(containerRef.current);

    return () => {
      app.unmount();
    };
  }, []);

  return <div ref={containerRef}></div>;
}