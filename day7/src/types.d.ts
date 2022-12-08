export interface File {
  type: "FILE";
  name: string;
  size: number;
}

export interface Directory {
  type: "DIRECTORY";
  name: string;
  children: (File | Directory)[];
}
