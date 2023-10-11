import { BigNumber } from "@ijstech/eth-wallet";
import { ModeType } from "@scom/scom-chart-data-source-setup"

export interface IMixedChartOptions {
  xColumn?: {
    key: string,
    type: 'time' | 'category',
    timeFormat?: string
  },
  yColumns?: string[],
  globalSeriesType: 'bar' | 'line' | 'area' | 'scatter',
  groupBy?: string,
  seriesOptions: {
    key: string,
    type: 'bar' | 'line' | 'area' | 'scatter',
    yAxis: 'left' | 'right',
    zIndex?: number,
    title?: string,
    color?: string
  }[],
  stacking?: boolean,
  xAxis?: {
    title?: string,
    fontColor?: string,
    tickFormat?: string,
    reverseValues?: boolean
  },
  leftYAxis?: {
    title?: string,
    fontColor?: string,
    tickFormat?: string,
    labelFormat?: string,
  },
  rightYAxis?: {
    title?: string,
    fontColor?: string,
    tickFormat?: string,
    labelFormat?: string,
  },
  mergeDuplicateData?: boolean,
  smooth?: boolean,
  legend?: {
    show?: boolean,
    fontColor?: string,
    scroll?: boolean,
    position?: 'top' | 'bottom' | 'left' | 'right'
  },
  padding?: {
    top?: number,
    bottom?: number,
    left?: number,
    right?: number
  },
  showSymbol?: boolean,
  showDataLabels?: boolean,
  percentage?: boolean
}

export interface IMixedChartConfig {
  dataSource: string;
  queryId?: string;
  apiEndpoint?: string;
  title: string,
  description?: string,
  options: IMixedChartOptions,
  file?: {
    cid: string,
    name: string
  },
  mode: ModeType
}

export interface IFormatNumberOptions {
  precision?: number;
  roundingMode?: BigNumber.RoundingMode;
}
