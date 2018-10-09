type Dict<T> = {
  [key: string]: T;
};

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

interface WithId {
  id: string;
}

interface Point {
  x: number;
  y: number;
}

declare const R: R.Static;
