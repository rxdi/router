import { Container } from "@rxdi/core";
import { Router } from "../history";
export function RouteParams() {
    return function (target, propertyKey, descriptor) {
        var originalMethod = descriptor.value;
        descriptor.value = function (a) {
            return originalMethod(Container.get(Router).activatedRoute.getValue());
        };
        return descriptor;
    };
}
;
