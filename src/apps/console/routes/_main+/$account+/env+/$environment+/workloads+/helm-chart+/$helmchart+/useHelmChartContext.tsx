import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { HelmChartIn } from "~/root/src/generated/gql/server";

const HelmChartContext = createContext<{
  helmChart: HelmChartIn,
  readOnlyHelmChart: HelmChartIn,
  setHelmChart: (helmChart: HelmChartIn) => void
  setReadOnlyHelmChart: (helmChart: HelmChartIn) => void
}>({
  helmChart: {
    displayName: ""
  }, readOnlyHelmChart: {
    displayName: ""
  }, setHelmChart: () => { }, setReadOnlyHelmChart() {

  },
})

const HelmChartContextProvider = ({ initialHelmChartState, children }: {
  initialHelmChartState:
  HelmChartIn, children?: ReactNode
}) => {
  const [helmChart, setHelmChart] = useState<HelmChartIn>(initialHelmChartState)
  const [readOnlyHelmChart, setReadOnlyHelmChart] = useState(initialHelmChartState)

  useEffect(() => {
    setHelmChart(initialHelmChartState)
    setReadOnlyHelmChart(initialHelmChartState)

    console.log("put...pp")
  }, [initialHelmChartState])

  const putHelmChart = (h: HelmChartIn) => {
    setHelmChart(h)
    console.log("put")
  }

  return <HelmChartContext.Provider value={{
    helmChart, readOnlyHelmChart,
    setHelmChart: putHelmChart,
    setReadOnlyHelmChart
  }}>{children}</HelmChartContext.Provider>
}

export const useHelmChartState = () => {
  return useContext(HelmChartContext)
}

export default HelmChartContextProvider
