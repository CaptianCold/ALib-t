import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'tfContainsFilter',
    pure: true
})
export class ContainsFilterPipe implements PipeTransform {
    transform<T>(value: Array<T>, args:any[]):Array<T> {
        if (Array.isArray(value) && args && args.length > 0 && typeof args[0] === 'string') {
            if (args.length > 1) {
                if (!args[1]) {
                    return value;
                }

                let key: string = args[0];
                let searchFor: string = args[1].toLocaleString().toLocaleLowerCase();
                let predicate = (item: T) => item && item[key].toLocaleLowerCase().includes(searchFor);
                return value.filter(predicate);
            }

            let searchFor: string = args[0].toLocaleLowerCase();
            let predicate = (item: T) => item && item.toString().toLocaleLowerCase().includes(searchFor);
            return value.filter(predicate);
        }

        return value;
    }
}
