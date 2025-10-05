export interface ComponentData {
    id: string;
    name: string;
    description: string;
    image: string;
    type: 'centrifuge' | 'heatcont' | 'printer' | 'slugwaste' | 'spool';
}
export interface CarouselConfig {
    autoplayInterval: number;
    slideWidth: number;
    visibleSlides: number;
    maxSlide: number;
}
export interface TouchEvent {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    isDragging: boolean;
}
export interface MouseEvent {
    startX: number;
    isDragging: boolean;
}
export interface NavigationItem {
    id: string;
    label: string;
    href: string;
    active?: boolean;
    children?: NavigationItem[];
}
export interface TechnologySpec {
    name: string;
    value: string;
    description?: string;
}
export interface ProcessStep {
    number: number;
    title: string;
    description: string;
}
export interface SpaceBenefit {
    title: string;
    description: string;
}
export interface PhaseData {
    name: string;
    duration: string;
    cost: string;
    focus: string;
    status: string;
}
export interface FinancialProjection {
    phase: string;
    revenue: string;
    costs: string;
    timeline: string;
}
export interface WindowDimensions {
    width: number;
    height: number;
}
export interface CarouselState {
    currentSlide: number;
    isAutoplayActive: boolean;
    isDragging: boolean;
    touchStart: TouchEvent;
    mouseStart: MouseEvent;
}
export interface ResponsiveBreakpoints {
    mobile: number;
    tablet: number;
    desktop: number;
    large: number;
}
export interface FullScreenConfig {
    enableFullScreen: boolean;
    hideNavigation: boolean;
    immersiveMode: boolean;
    autoHideUI: boolean;
}
//# sourceMappingURL=index.d.ts.map