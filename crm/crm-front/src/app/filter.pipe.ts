import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(lists: any, search: any): any {
    if(search=== undefined) return lists;
    return lists.filter(function(list){
return list.firstname.toLowerCase().includes(search.toLowerCase());
    })
    
  }

}
