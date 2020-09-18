 import { Injectable } from '@angular/core';

@Injectable()
export class FilterService {
  headerFilter: string;

  constructor() { }

  public getFilter(): string {
    return this.headerFilter;
  }

  public setFilter(filter): void {
    this.headerFilter = filter;
  }
}