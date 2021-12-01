export interface Raw {
    name: { common: string };
    flags: { svg?: string };
  }

export interface Country {
  name: string;
  flag?: string;
}
  
export interface Refetch {
  query: string;
  count: number;
}