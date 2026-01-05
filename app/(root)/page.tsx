import TradingViewWidget from "@/components/TradingViewWidget"
import { Button } from "@/components/ui/button"
import { HEATMAP_WIDGET_CONFIG, MARKET_DATA_WIDGET_CONFIG, MARKET_OVERVIEW_WIDGET_CONFIG, TOP_STORIES_WIDGET_CONFIG } from "@/lib/constants"

const Home = () => {
  const widgetUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;
  return (
    <div className="flex min-h-screen home-wrapper">
      <section className="grid w-full gap-8 home-section">
        <div className="h-full md:col-span-1 xl:col-span-1">
          <TradingViewWidget
            title="Market Overview"
            scriptUrl={`${widgetUrl}market-overview.js`}
            config = {MARKET_OVERVIEW_WIDGET_CONFIG}
            className="custom-chart"
           />
        </div>
        <div className="h-full md:col-span-1 xl:col-span-2">
          <TradingViewWidget
            title="Stock Heatmap"
            scriptUrl={`${widgetUrl}stock-heatmap.js`}
            config = {HEATMAP_WIDGET_CONFIG}
            className="custom-chart"
           />
        </div>
      </section>

      <section className="grid w-full gap-8 home-section">
        <div className="h-full md:col-span-1 xl:col-span-1">
          <TradingViewWidget
            title="Market Overview"
            scriptUrl={`${widgetUrl}timeline.js`}
            config = {TOP_STORIES_WIDGET_CONFIG}
            className="custom-chart"
           />
        </div>
        <div className="h-full md:col-span-1 xl:col-span-2">
          <TradingViewWidget
            title="Stock Heatmap"
            scriptUrl={`${widgetUrl}market-quotes.js`}
            config = {MARKET_DATA_WIDGET_CONFIG}
            className="custom-chart"
           />
        </div>
      </section>
    </div>
  )
}

export default Home