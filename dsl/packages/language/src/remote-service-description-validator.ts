import type { /*ValidationAcceptor,*/ ValidationChecks } from 'langium';
import type { RemoteServiceDescriptionAstType } from './generated/ast.js';
import type { RemoteServiceDescriptionServices } from './remote-service-description-module.js';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: RemoteServiceDescriptionServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.RemoteServiceDescriptionValidator;
    const checks: ValidationChecks<RemoteServiceDescriptionAstType> = {
        //Person: validator.checkPersonStartsWithCapital
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class RemoteServiceDescriptionValidator {

    /*checkPersonStartsWithCapital(person: Person, accept: ValidationAcceptor): void {
        if (person.name) {
            const firstChar = person.name.substring(0, 1);
            if (firstChar.toUpperCase() !== firstChar) {
                accept('warning', 'Person name should start with a capital.', { node: person, property: 'name' });
            }
        }
    }*/

}