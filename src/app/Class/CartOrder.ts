import { OrderItem } from "./order-item";

export class CartOrder {
    oid!: number;
    username!: string;
    firstName!: string;
    lastName!: string;
    address!: string;
    district!: string;
    pinCode!: number;
    state!: string;
    contact!: string;
    paidAmount!: number;
    paymentMode!: string;
    cartItem: OrderItem[] = [];

}