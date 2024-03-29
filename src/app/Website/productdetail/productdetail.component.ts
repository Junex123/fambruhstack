import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import Swiper from 'swiper';
import { UserService } from '../../service/user.service';
import { Product } from '../../Class/product';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CartService } from '../../service/cart.service';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarComponent, FooterComponent],
  styleUrls: ['./productdetail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductdetailComponent implements OnInit, AfterViewInit, OnDestroy {
  public sizeChartVisible = false;
  public prevClass = '.prev';
  public nextClass = '.next';
  pid!: number;
  product!: Product;
  swiper!: Swiper | null;
  addToCartButtonDisabled = false;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private productService: UserService,
    private route: ActivatedRoute,
    private cartservice: CartService,
    private loginservice: LoginService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pid = +params['id'];
      this.getProductDetail(this.pid);
    });
    window.scrollTo(0, 0); // Scroll to top when component initializes
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit() called');
    this.swiper = new Swiper('.product-slider', {
      direction: 'horizontal',
      loop: false,
      spaceBetween: 500,
      effect: 'fade',
      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      on: {
        init: () => {
          console.log('Swiper initialized');
          this.handleSlideChange();
        },
        slideChange: () => {
          console.log('Slide changed');
          this.handleSlideChange();
        }
      },
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });

    console.log('Swiper instance:', this.swiper); // Log Swiper instance for debugging
  }

  ngOnDestroy(): void {
    if (this.swiper) {
      this.swiper.destroy(true, true);
    }
  }

  getProductDetail(id: number): void {
    this.productService.findById(id).subscribe(product => {
      this.product = product;
      this.product.img1 = 'data:image/jpeg;base64,' + product.mainImage.imageData;
      this.product.img3 = 'data:image/jpeg;base64,' + product.detailImage.imageData;
      this.product.img4 = 'data:image/jpeg;base64,' + product.image1.imageData;
      this.product.img5 = 'data:image/jpeg;base64,' + product.image2.imageData;
      this.product.img6 = 'data:image/jpeg;base64,' + product.image3.imageData;
  console.log(this.product.img3);
    });
  }

  toggleSizeChart(): void {
    this.sizeChartVisible = !this.sizeChartVisible;
  }

  private handleSlideChange() {
    console.log('handleSlideChange() called');
    if (!this.swiper) {
      console.error('Swiper not initialized');
      return;
    }
    console.log('Swiper initialized successfully');
  }
   

  addToCart(product: Product, quantity: number, username: string) {
    this.cartservice.addToCart(product, quantity).subscribe(
      (response) => {
        // Handle successful addition to cart
        console.log(`Product added to cart successfully for user ${username}:`, response);
      },
      (error) => {
        // Handle error
        console.error('Failed to add product to cart:', error);
      }
    );
  }
  
  

  disableAddToCartButton(): void {
    this.addToCartButtonDisabled = true;
  }

  enableAddToCartButton(): void {
    this.addToCartButtonDisabled = false;
  }

  updateUIAfterAddToCart(): void {
    // Update the UI after adding product to cart
  }

  toggleFavorite(): void {
    const heart = this.elementRef.nativeElement.querySelector('.heart');
    if (heart) {
      heart.classList.toggle('is-active');
    }
  }
}
