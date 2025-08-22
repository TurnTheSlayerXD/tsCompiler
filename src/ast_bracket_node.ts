import { OrderedToken } from "./ast_builder";
import { AstNode } from "./ast_node";
import { Context } from "./context";

export class AstBracketNode extends AstNode {
    constructor(order: OrderedToken, public area: { l_b: number, r_b: number }, public middle: AstNode | null, left: AstNode | null, right: AstNode | null, context: Context) {
        super(order, left, right, context);
    }

    override insert_node(node: AstNode) {
        if (this.area.l_b <= node.order.pos && node.order.pos <= this.area.r_b) {
            if (!this.middle) {
                this.middle = node;
            }
            else {
                this.middle.insert_node(node);
            }
        }
        if (node.order.pos < this.order.pos) {
            if (!this.left) {
                this.left = node;
            }
            else {
                this.left.insert_node(node);
            }
        } else if (node.order.pos > this.order.pos) {
            if (!this.right) {
                this.right = node;
            }
            else {
                this.right.insert_node(node);
            }
        }
    }

}