
import { TrendingUp } from "lucide-react";
import { useState } from "react";
import { ModuleLayout } from "@/components/ModuleLayout";

export function TimeSeriesModule() {
  const [parameters, setParameters] = useState([
    {
      id: 'forecast_method',
      label: 'Forecasting Method',
      type: 'select' as const,
      value: 'arima',
      options: ['arima', 'lstm', 'prophet', 'seasonal_decompose', 'exponential_smoothing']
    },
    {
      id: 'forecast_horizon',
      label: 'Forecast Horizon (periods)',
      type: 'number' as const,
      value: 30,
      min: 1,
      max: 365
    },
    {
      id: 'seasonality',
      label: 'Seasonality',
      type: 'select' as const,
      value: 'auto',
      options: ['auto', 'daily', 'weekly', 'monthly', 'yearly', 'none']
    },
    {
      id: 'confidence_interval',
      label: 'Confidence Interval',
      type: 'slider' as const,
      value: 0.95,
      min: 0.8,
      max: 0.99,
      step: 0.01
    },
    {
      id: 'trend_analysis',
      label: 'Include Trend Analysis',
      type: 'switch' as const,
      value: true
    },
    {
      id: 'anomaly_detection',
      label: 'Anomaly Detection',
      type: 'switch' as const,
      value: false
    }
  ]);

  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleParameterChange = (id: string, value: any) => {
    setParameters(prev => prev.map(p => p.id === id ? { ...p, value } : p));
  };

  const handleFilesChange = (files: File[]) => {
    console.log('Files uploaded:', files);
  };

  const handleRun = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setResults({
        gptResponse: "Time series analysis complete! Your data shows clear seasonal patterns with an upward trend. The ARIMA model achieved excellent fit with MAPE of 3.2%. Forecast indicates continued growth over the next 30 periods with 95% confidence intervals. Several anomalies were detected and flagged for review.",
        status: 'success',
        processingTime: 5.1
      });
      setIsLoading(false);
    }, 3500);
  };

  const handleReset = () => {
    setParameters(prev => prev.map(p => ({ 
      ...p, 
      value: p.id === 'forecast_method' ? 'arima' : 
             p.id === 'forecast_horizon' ? 30 : 
             p.id === 'seasonality' ? 'auto' : 
             p.id === 'confidence_interval' ? 0.95 : 
             p.id === 'trend_analysis' ? true : 
             p.id === 'anomaly_detection' ? false : ''
    })));
  };

  return (
    <ModuleLayout
      title="Time Series Analysis"
      description="Forecast future values and analyze temporal patterns in your data"
      icon={<TrendingUp className="w-6 h-6 text-white" />}
      tags={['Forecasting', 'ARIMA', 'Prophet', 'Anomaly Detection']}
      parameters={parameters}
      onParameterChange={handleParameterChange}
      onFilesChange={handleFilesChange}
      onRun={handleRun}
      onReset={handleReset}
      results={results}
      isLoading={isLoading}
      acceptedTypes={['.csv', '.xlsx', '.json']}
    />
  );
}
