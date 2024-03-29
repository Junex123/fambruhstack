
import { Product } from "./product";
import { User } from "./user";

export class Cart {
    id!: number;
    user!: User;
    product!: Product;
    quantity!:number;

}
