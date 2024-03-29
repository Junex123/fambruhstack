
export class Product {
    [x: string]: any;
    pid!: number;
    name!: string;
    brand!: string;
    description!: string;
    salt!: string;
    totalAvailable!: number;
    discountedPrice!: number; // Corrected attribute name
    price!: number;
    available!: boolean;
    mainImage!:any;
    hoverImage!:any;
    detailImage!:any;
    image1!:any;
    image2!:any;
    image3!:any;
    img1!:any;
    img2!:any;
    img3!:any;
    img4!:any;
    img5!:any;
    img6!:any;
    Sizes!: ProductSize;
    Quantity!:ProductQuantity;
    state!:any;
    settings!:any;
}



export class ProductSize {
    sizeId!: number;
    sizeName!:any;
    isAvailable!: boolean;
}


export class ProductQuantity {
    pqid!: number;
    product!: Product;
    quantity!: number;
}

export class ComboProduct {
    id!: number;
    product1!: Product;
    product2!: Product;
}
