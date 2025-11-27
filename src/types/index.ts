export interface Asset {
  id: string;
  name: string;
  class: string;
  value: number;
  quantity: number;
}

export interface Allocation {
  [key: string]: number;
}

export interface RebalanceData {
  class: string;
  current: number;
  ideal: number;
  difference: number;
}

export interface ChartData {
  name: string;
  value: number;
}
