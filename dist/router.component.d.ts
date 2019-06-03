import { LitElement, TemplateResult } from 'lit-element';
export declare class RouterComponent extends LitElement {
    private routerPlate;
    private routerInitialized;
    header: string;
    footer: string;
    outlet: TemplateResult;
    connectedCallback(): void;
    render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'router-outlet': RouterComponent;
    }
}
