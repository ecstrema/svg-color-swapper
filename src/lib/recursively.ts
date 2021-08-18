type NodeCallback = (node: unknown) => void;

/**
 * Recurse through a an item's children to run a callback function.
 */
export function recursively(item: Element, callback: NodeCallback): void {
    const icl = item.children.length;
    for (let i = 0; i < icl; i++) {
        const child = item.children[i];
        callback(child);
        recursively(child, callback);
    }
}
