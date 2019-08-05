import {Item} from './item.model';

export class Task {
  id: number;
  name: string;
  description: string;
  itemList: Item[];
}
