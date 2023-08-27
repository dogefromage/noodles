import * as lang from "@fluss/language";
import { JointLocationKey } from "../types";
import { FlowJointStyling } from "../types/flowRows";

export function getJointLocationKey(location: lang.JointLocation): JointLocationKey {
    let key: JointLocationKey = `${location.nodeId}.${location.rowId}`;
    if (location.direction === 'input') {
        key = `${key}.${location.jointIndex}`;
    }
    return key;
}

const style = (
    background:  FlowJointStyling['background'],
    border:      FlowJointStyling['border'] = 'transparent',
    shape:       FlowJointStyling['shape'] = 'round',
    borderStyle: FlowJointStyling['borderStyle'] = 'solid',
): FlowJointStyling => ({ borderStyle, shape, background, border });

// jointStyles: {
//     boolean:   { fillColor: '#44adb3', borderColor: 'transparent' },
//     number:    { fillColor: '#347dcf', borderColor: 'transparent' },
//     string:    { fillColor: '#9249e6', borderColor: 'transparent' },
//     any:       { fillColor: 'transparent', borderColor: '#aaa' },
//     missing:   { fillColor: 'transparent', borderColor: '#aaa' },
//     function:  { fillColor: '#ff55ff', borderColor: 'transparent' },
//     map:       { fillColor: '#ff55ff', borderColor: 'transparent' },
//     list:      { fillColor: '#ff55ff', borderColor: 'transparent' },
//     tuple:     { fillColor: '#ff55ff', borderColor: 'transparent' },
// },

const primitiveColors: Record<string, Pick<FlowJointStyling, 'background' | 'border'>> = {
    boolean: { background: '#44adb3', border: null, },
    number:  { background: '#347dcf', border: null, },
    string:  { background: '#9249e6', border: null, },
    null:    { background: '#b5b5b5', border: null, },
}
const missingColor = '#ff00ff';

function getBaseStyling(argX: lang.TypeSpecifier, env: lang.FlowEnvironment): FlowJointStyling {
    const X = lang.tryResolveTypeAlias(argX, env);

    if (X == null || 
        X.type === 'any' || 
        X.type === 'missing'
    ) {
        return style(null, '#aaa');
    }
    
    switch (X.type) {
        case 'primitive':
            return {
                ...primitiveColors[X.name],
                shape: 'round',
                borderStyle: 'solid',
            };
        case 'list':
            return {
                ...getBaseStyling(X.element, env),
                shape: 'square',
            };
        case 'function':
        case 'map':
        case 'tuple':
        case 'union':
            return style(
                missingColor,
                null,
                'square',
            );
        default:
            throw new Error(`Unknown type`);
    }
}

export function getJointStyling(argX: lang.TypeSpecifier, env: lang.FlowEnvironment, additional = false): FlowJointStyling {
    const baseStyle = getBaseStyling(argX, env);
    
    if (additional) {
        const borderColor = baseStyle.background || baseStyle.border || missingColor;
        return style(null, borderColor, baseStyle.shape, 'dashed');
    }

    return baseStyle;
}
