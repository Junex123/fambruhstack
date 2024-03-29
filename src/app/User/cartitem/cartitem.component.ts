import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../Website/footer/footer.component';
import { NavbarComponent } from '../../Website/navbar/navbar.component';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Cart } from '../../Class/Cart';
import { CartService } from '../../service/cart.service';
import { CartItemResponseDto } from '../../Class/CartItemResponseDto';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../service/login.service';
import { Product } from '../../Class/product';

@Component({
  selector: 'app-cartitem',
  standalone: true,
  imports: [FooterComponent,NavbarComponent,RouterModule,RouterLink,CommonModule],
  templateUrl: './cartitem.component.html',
  styleUrl: './cartitem.component.scss'
})
export class CartitemComponent implements OnInit {
  cartItems: Cart[] = [];
  User: any;
  totalPrice: number=0;
  public emptyCart: boolean=true;

  constructor(private cartService: CartService,private router: Router,private loginService: LoginService) { }

  ngOnInit(): void {
    const userDetails = this.loginService.getUserDetails();
    if (userDetails && userDetails.username) {
      this.getCartItems(userDetails.username);
    } else {
      // Handle case where username is not available
      console.error('Username not available');
    }
  
  }
  
  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  getCartItems(username: string) {
    this.cartService.getCartDetails(username).subscribe(
        (cartItemResponseDtos: CartItemResponseDto[]) => {
            // Log the cart items array to the console after it has been populated
            console.log('Cart Items:', cartItemResponseDtos);

            // Iterate through each cart item and check if product has images
            cartItemResponseDtos.forEach(dto => {
                console.log('Product:', dto.product);
                console.log('Product Main Image:', dto.product.mainImage); // Example: Check main image
                console.log('Product Detail Image:', dto.product.detailImage); // Example: Check detail image

                // Check if product has images and do something accordingly
                if (dto.product.mainImage && dto.product.detailImage) {
                    // Product has images, perform necessary actions
                    console.log('Product has images');
                } else {
                    // Product does not have images, perform necessary actions
                    console.log('Product does not have images');
                }
            });

            // Map CartItemResponseDto to Cart
            this.cartItems = cartItemResponseDtos.map(dto => ({
                id: dto.id,
                product: dto.product,
                quantity: dto.quantity,
                user: dto.user
            }));
            this.calculateTotalPrice(); 
         
        },
        (error) => {
            console.error('Error fetching cart items:', error);
        }
    );
}


  
  
  

  removeCartItem(cartItemId: number) {
    this.cartService.deleteCartItem(cartItemId).subscribe(
      () => {
        this.cartItems = this.cartItems.filter(item => item.id !== cartItemId);
        this.calculateTotalPrice();
      },
      (error) => {
        console.error('Error removing cart item:', error);
      }
    );
  }

  goToShipping() {
    this.router.navigate(['cart', 'shippingaddress']);
  }


}











