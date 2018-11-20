export declare function RouteParams(): (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => PropertyDescriptor;
export interface RouteParams {
    route: string;
    params: any;
}
