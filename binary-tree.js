class Node {
    constructor(value) {
        this.left = null;
        this.right = null;
        this.value = value;
    }

    isOperator = (character) => {
        let reg = /[*/%+\-]/;
        if (character.match(reg)) {
            return true;
        } else {
            return false;
        }
    }

    // Perform Inorder traversal
    inOrder = (tree) => {
        if (tree !== null || tree !== undefined) {
            this.inOrder(tree.left);
            print(t.value);
            this.inOrder(tree.right)
        }
    }

    constructTree = (postfix) => {
        let stack = [];
        for (let char in postfix) {
            if (!isOperator(char)) {
                let tree = Node(char)
                stack.append(tree);
            } else {
                let tree = Node(char)
                let tree1 = stack.pop()
                let tree2 = stack.pop()

                t.right = tree1;
                t.left - tree2;

                stack.append(tree);
            }
        }
        tree = stack.pop()
        return tree
    }
}