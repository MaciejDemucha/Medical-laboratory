import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingcartService {

  private cartKey = 'userShoppingCart';

  constructor(private cookieService: CookieService) { }

  // Add an item to the shopping cart
  addToCart(item: any): void {
    let cart = this.getCart();
    cart.push(item);
    this.saveCart(cart);
  }

  // Get the current shopping cart
  getCart(): any[] {
    const cartString = this.cookieService.get(this.cartKey);
    return cartString ? JSON.parse(cartString) : [];
  }

  getCartSize(){
    let cart = this.getCart();
    return cart.length;
  }

  // Save the shopping cart to the cookie
  saveCart(cart: any[]): void {
    this.cookieService.set(this.cartKey, JSON.stringify(cart));
  }

  // Clear the shopping cart
  clearCart(): void {
    this.cookieService.delete(this.cartKey);
  }
}
