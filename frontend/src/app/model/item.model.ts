export class Item {
  id: number;
  name: string;
  description: string;
  deadline: string;
  status: string;
  dependencyItems: Item[];
}
