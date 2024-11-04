export const getChartType = (type: string, defaultType?: string) => {
  switch (type) {
    case 'area':
      return 'line';
    default:
      return type || defaultType;
  }
}
