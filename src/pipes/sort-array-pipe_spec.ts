/**
 * Created by divya.raghunathan on 3/9/2016.
 */

import { inject, TestBed} from '@angular/core/testing';
import {SortArrayPipe, SortOrder, SortType, SortOptions} from './sort-array-pipe';

export function main():void {
    describe('SortArrayPipe tests', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                providers : [
                    SortArrayPipe
                ]
            });
        });

        it('should sort array ascending order by default',
                inject([SortArrayPipe], (sortArrayPipe:SortArrayPipe) => {
            let list1 = [{id: 2, name: 'item2'}, {id: 3, name: 'item3'}, {id: 4, name: 'item4'}, {id: 1, name: 'item1'}];
            let sortOptions1 = {sortBy : 'id', sortType : SortType.NUM_TYPE};

            let sortOutput1 = sortArrayPipe.transform(list1, sortOptions1);
            expect(sortOutput1).not.toBeNull();
            expect(sortOutput1.length).toEqual(list1.length);
            expect(sortOutput1[0].id).toEqual(1);
            expect(sortOutput1[1].id).toEqual(2);
            expect(sortOutput1[2].id).toEqual(3);
            expect(sortOutput1[3].id).toEqual(4);

        }));


        it('should sort array descending order', inject([SortArrayPipe], (sortArrayPipe:SortArrayPipe) => {
            let list1 = [{id: 2, name: 'item2'}, {id: 3, name: 'item3'}, {id: 4, name: 'item4'}, {id: 1, name: 'item1'}];
            let sortOptions1 = {sortBy : 'id', sortType : SortType.NUM_TYPE, orderBy : SortOrder.DESC};

            let sortOutput1 = sortArrayPipe.transform(list1, sortOptions1);
            expect(sortOutput1).not.toBeNull();
            expect(sortOutput1.length).toEqual(list1.length);
            expect(sortOutput1[0].id).toEqual(4);
            expect(sortOutput1[1].id).toEqual(3);
            expect(sortOutput1[2].id).toEqual(2);
            expect(sortOutput1[3].id).toEqual(1);

        }));

        it('should sort by string type default', inject([SortArrayPipe], (sortArrayPipe:SortArrayPipe) => {
            let list1 = [{id: 2, name: 'item2'}, {id: 3, name: 'item3'}, {id: 4, name: 'item4'}, {id: 1, name: 'item1'}];
            let sortOptions1 = {sortBy : 'name'};

            let sortOutput1 = sortArrayPipe.transform(list1, sortOptions1);
            expect(sortOutput1).not.toBeNull();
            expect(sortOutput1.length).toEqual(list1.length);
            expect(sortOutput1[0].id).toEqual(1);
            expect(sortOutput1[1].id).toEqual(2);
            expect(sortOutput1[2].id).toEqual(3);
            expect(sortOutput1[3].id).toEqual(4);

        }));

        it('should sort by date type', inject([SortArrayPipe], (sortArrayPipe:SortArrayPipe) => {
            let list1 = [{id: 2, name: 'item2', created : '2014-05-11T11:29:31'},
                {id: 3, name: 'item3', created : '2014-05-12T10:29:31'},
                {id: 4, name: 'item4', created : '2014-05-13T11:29:31'},
                {id: 1, name: 'item1', created : '2014-05-10T12:29:31'}];

            let sortOptions1 = {sortBy : 'created', sortType : SortType.DATE_TYPE};

            let sortOutput1 = sortArrayPipe.transform(list1, sortOptions1);
            expect(sortOutput1).not.toBeNull();
            expect(sortOutput1.length).toEqual(list1.length);
            expect(sortOutput1[0].id).toEqual(1);
            expect(sortOutput1[1].id).toEqual(2);
            expect(sortOutput1[2].id).toEqual(3);
            expect(sortOutput1[3].id).toEqual(4);
        }));

        it('should do nothing for empty array', inject([SortArrayPipe], (sortArrayPipe:SortArrayPipe) => {
            let list1 = [];
            let sortOptions1 = {sortBy : 'name'};

            let sortOutput1 = sortArrayPipe.transform(list1, sortOptions1);
            expect(sortOutput1).not.toBeNull();
            expect(sortOutput1.length).toEqual(0);
        }));

        it('should do nothing if sort options have no sortBy field defined', inject([SortArrayPipe],
            (sortArrayPipe:SortArrayPipe) => {
            let list1 = [{id: 2, name: 'item2'},
                {id: 3, name: 'item3'},
                {id: 4, name: 'item4'},
                {id: 1, name: 'item1'}];
            let sortOptions1 = <SortOptions>{};

            let sortOutput1 = sortArrayPipe.transform(list1, sortOptions1);
            expect(sortOutput1).not.toBeNull();
            expect(sortOutput1[0].id).toEqual(2);
            expect(sortOutput1[1].id).toEqual(3);
            expect(sortOutput1[2].id).toEqual(4);
            expect(sortOutput1[3].id).toEqual(1);
        }));

        it('should not sort if sort by field type does not match with the input type for string',
            inject([SortArrayPipe], (sortArrayPipe:SortArrayPipe) => {
            let list1 = [{id: 2, name: 'item2'},
                {id: 3, name: 'item3'},
                {id: 4, name: 'item4'},
                {id: 1, name: 'item1'}];
            let sortOptions1 = {sortBy : 'id'};

            let sortOutput1 = sortArrayPipe.transform(list1, sortOptions1);
            expect(sortOutput1).not.toBeNull();
            expect(sortOutput1.length).toEqual(list1.length);
            expect(sortOutput1[0].id).toEqual(2);
            expect(sortOutput1[1].id).toEqual(3);
            expect(sortOutput1[2].id).toEqual(4);
            expect(sortOutput1[3].id).toEqual(1);

        }));

        it('should not sort if sort by field type does not match with the input type for date',
            inject([SortArrayPipe], (sortArrayPipe:SortArrayPipe) => {
            let list1 = [{id: 2, name: 'item2'},
                {id: 3, name: 'item3'},
                {id: 4, name: 'item4'},
                {id: 1, name: 'item1'}];
            let sortOptions1 = {sortBy : 'name', sortType : SortType.DATE_TYPE};

            let sortOutput1 = sortArrayPipe.transform(list1, sortOptions1);
            expect(sortOutput1).not.toBeNull();
            expect(sortOutput1.length).toEqual(list1.length);
            expect(sortOutput1[0].id).toEqual(2);
            expect(sortOutput1[1].id).toEqual(3);
            expect(sortOutput1[2].id).toEqual(4);
            expect(sortOutput1[3].id).toEqual(1);

        }));
    });
}
