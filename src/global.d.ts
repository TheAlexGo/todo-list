declare module '*.css';
declare module '*.scss';

declare module '*.svg' {
    import type React from 'react';

    const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}
