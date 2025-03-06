export const ChartContainer = ({ children }) => {
  return <div className="chart-container">{children}</div>
}

export const ChartTooltip = () => {
  return <div className="chart-tooltip"></div>
}

export const ChartLegend = ({ className }) => {
  return <div className={`chart-legend ${className}`}></div>
}

export const ChartPie = () => {
  return <div className="chart-pie"></div>
}

