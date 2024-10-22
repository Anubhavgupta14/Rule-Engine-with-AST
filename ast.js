class Node {
    constructor(type, value = null, left = null, right = null) {
        this.type = type;  // "operator" or "operand"
        this.value = value; // value for operand (e.g., number, string)
        this.left = left;   // left child node
        this.right = right; // right child node
    }
}

class AST {
    evaluate(node, data) {
        if (!node) return false;

        if (node.type === 'operand') {
            const [attr, operator, value] = node.value;
            switch (operator) {
                case '>': return data[attr] > value;
                case '<': return data[attr] < value;
                case '=': return data[attr] === value;
                case '>=': return data[attr] >= value;
                case '<=': return data[attr] <= value;
                case '!=': return data[attr] !== value;
                default: throw new Error(`Invalid operator ${operator}`);
            }
        }

        if (node.type === 'operator') {
            if (node.value === 'AND') {
                return this.evaluate(node.left, data) && this.evaluate(node.right, data);
            } else if (node.value === 'OR') {
                return this.evaluate(node.left, data) || this.evaluate(node.right, data);
            }
        }
    }
}

module.exports = {Node, AST};
