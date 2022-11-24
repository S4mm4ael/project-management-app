export interface IBoard {
  id: number;
  title: string;
  items: {
    id: number;
    title: string;
  }[];
}
