
export * from './types';
export {
    validateDocument
} from './validation/validateDocument';

export {
    collectTotalEnvironmentContent,
    findEnvironmentSignature,
    findEnvironmentType,
} from './core/environment';

export {
    createMissingType,
    createAnyType,
    createPrimitiveType,
    createListType,
    createTupleType,
    createFunctionType,
    createMapType,
} from './typeSystem';

export {
    tryResolveTypeAlias,
} from './typeSystem/resolution';

export {
    isSubsetType,
} from './typeSystem/comparison';

export {
    compileDocument,
} from './byteCode/byteCompiler';
export {
    StackMachine,
} from './byteCode/stackMachine';