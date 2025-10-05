import type { FullScreenConfig } from '../types/index.js';
export declare class FullScreenManager {
    private static instance;
    private config;
    private isFullScreen;
    private originalStyles;
    private constructor();
    static getInstance(): FullScreenManager;
    enterFullScreen(element?: HTMLElement): Promise<void>;
    exitFullScreen(): Promise<void>;
    toggleFullScreen(element?: HTMLElement): void;
    isInFullScreen(): boolean;
    private applyFullScreenStyles;
    private restoreOriginalStyles;
    private applyImmersiveMode;
    setConfig(config: Partial<FullScreenConfig>): void;
    getConfig(): FullScreenConfig;
    addFullScreenListeners(): void;
    private handleFullScreenChange;
}
//# sourceMappingURL=fullscreen.d.ts.map