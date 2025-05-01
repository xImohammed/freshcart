import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: any[], text: string | null): any[] {
    if (!products) return [];
    if (!text || text === '') return products;
    
    return products.filter((product) => 
      product.title.toLowerCase().includes(text.toLowerCase())
    );
  }
}
