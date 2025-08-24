import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { ProductsList } from './products-list/products-list';
import { Cart } from './cart/cart';
import { ProductItem } from './product-item/product-item';

export const routes: Routes = [{
    path:'',
    // component: Layout,
    children: [
        { path: '', component: ProductsList },
        { path: 'cart', component: Cart},
    ]
}];
