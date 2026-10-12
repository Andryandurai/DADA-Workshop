import type { CategoryId } from './data';

type Kind = CategoryId | 'star' | 'arrow' | 'flower' | 'plane' | 'loop';

// Small, original pen drawings. Decorative only; controls always have text labels.
export default function Doodle({ kind, size = 48, className = '' }: { kind: Kind; size?: number; className?: string }) {
  const drawings = {
    star: <><path d="M60 9 68 43 102 30 78 57 108 76 73 73 67 108 54 78 22 94 39 65 9 48 44 47Z" /><path d="m96 8 3 11m7-7-12 3M9 90l9 2m-5-7-2 11" /></>,
    arrow: <><path d="M12 20c55-22 70 50 38 58-30 8-22-33 0-25 15 5 20 31 55 32" /><path d="m91 70 16 16-19 12" /></>,
    flower: <><path d="M61 43C22-8 3 40 39 54 0 70 35 111 52 77 59 121 105 92 77 66 125 60 96 12 72 43 84 1 38 0 61 43Z" /><circle cx="60" cy="60" r="10" /></>,
    plane: <><path d="m12 49 96-34-27 92-23-35-29 13 10-27Z" /><path d="m39 58 69-43-50 57m-29 13 29-13" /><path d="M9 105c7-18 15-7 12-1" strokeDasharray="3 7" /></>,
    loop: <><path d="M105 47C114-6 18 5 13 57c-5 51 95 65 97 11 2-49-91-53-92-5" /><path d="m96 37 10 13 7-16" /></>,
    coding: <><path d="M37 30 13 58l25 29m44-58 25 29-25 29M69 19 51 99" /><path d="m16 17 7 4m76 80 8 3" /></>,
    web: <><path d="m16 25 89-2 1 79-90-2Z" /><path d="m17 43 86-2M27 33h2m10 0h2m10 0h2M28 60l25-1m-25 13 47 1m-47 12 30-1" /><path d="m83 63 17 28-13-3-8 10Z" /></>,
    ai: <><path d="M48 24c-19-14-34 6-28 20-17 11-10 31 4 35-1 22 21 30 35 16V26c-3-9-8-11-11-2Zm23 0c19-14 34 6 28 20 17 11 10 31-4 35 1 22-21 30-35 16" /><path d="M21 44c14-6 25 3 20 14m-16 20c12-10 22-5 22 5m51-40c-13-6-23 3-18 15m14 21c-11-10-22-5-22 5M76 20l-2 18" /></>,
    design: <><path d="m22 78 51-56 23 21-52 54-28 5Z" /><path d="m65 31 23 22M22 78l22 19m-10-9 46-50M17 101l5-23" /><path d="m17 30 8-13 9 14-16-1m68 62c14-16 25 3 9 12" /></>,
    innovation: <><path d="M43 76C6 45 26 18 60 18s52 33 16 58l-2 17-31-1Z" /><path d="m44 103 29 1m-23 8 17 1M60 90V56l-12-9m12 9 13-11M60 3v6m43 12-8 7M9 19l10 10m88 28 10 1M2 57l11-1" /></>,
  };
  return <svg className={`doodle ${className}`} width={size} height={size} viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{drawings[kind]}</svg>;
}
