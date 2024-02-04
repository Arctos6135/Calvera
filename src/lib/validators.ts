/**
 * Contains various built-in validators for dropdowns.
 */

/**
 * Ensures that choice is not an empty
 * string.
 */
export const defaultValidator = (choice: string) => {
    if (choice.trim().length == 0) {
        return "Choice cannot be empty!";
    }
    
    return undefined;
}

/**
 * Ensures that choice is numeric.
 */
export const numericValidator = (choice: string) => {
    if (typeof choice != "string" || (choice.trim().length != choice.length) || isNaN(+choice.trim()))
        return "Must be a number!";

    return undefined;
}


/**
 * Ensures that choice is in range [min, max].
 * 
 * @param choice The value to be checked.
 * @param min The minimum value. Defaults to Number.MIN_SAFE_INTEGER
 * @param max The maximum value. Defaults to Number.MAX_SAFE_INTEGER
 * @returns 
 */
export const rangeValidator = (choice: number, min=Number.MIN_SAFE_INTEGER, max=Number.MAX_SAFE_INTEGER) => {
    if (typeof choice != "number") return false;

    return (choice >= min) && (choice <= max);
}