
import { Brain } from "lucide-react";
import { useState } from "react";
import { ModuleLayout } from "@/components/ModuleLayout";

export function NLPModule() {
  const [parameters, setParameters] = useState([
    {
      id: 'task',
      label: 'NLP Task',
      type: 'select' as const,
      value: 'sentiment',
      options: ['sentiment', 'classification', 'ner', 'summarization', 'translation']
    },
    {
      id: 'model',
      label: 'Model Type',
      type: 'select' as const,
      value: 'transformer',
      options: ['transformer', 'lstm', 'cnn', 'traditional']
    },
    {
      id: 'prompt',
      label: 'Custom Prompt',
      type: 'textarea' as const,
      value: '',
      placeholder: 'Enter your custom prompt for text analysis...'
    },
    {
      id: 'max_length',
      label: 'Max Token Length',
      type: 'slider' as const,
      value: 512,
      min: 128,
      max: 2048,
      step: 128
    },
    {
      id: 'temperature',
      label: 'Temperature',
      type: 'slider' as const,
      value: 0.7,
      min: 0.1,
      max: 2.0,
      step: 0.1
    },
    {
      id: 'batch_processing',
      label: 'Batch Processing',
      type: 'switch' as const,
      value: true
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
    // Simulate processing
    setTimeout(() => {
      setResults({
        gptResponse: "Analysis complete! Your text data has been processed using advanced NLP techniques. The sentiment analysis shows predominantly positive sentiment (78%) with neutral responses at 15% and negative at 7%. Key entities identified include locations, organizations, and person names. The model achieved 94.2% accuracy on your dataset.",
        status: 'success',
        processingTime: 2.3
      });
      setIsLoading(false);
    }, 3000);
  };

  const handleReset = () => {
    setParameters(prev => prev.map(p => ({ ...p, value: p.id === 'task' ? 'sentiment' : p.id === 'model' ? 'transformer' : p.id === 'max_length' ? 512 : p.id === 'temperature' ? 0.7 : p.id === 'batch_processing' ? true : '' })));
  };

  return (
    <ModuleLayout
      title="Natural Language Processing"
      description="Analyze text data with advanced NLP models for sentiment analysis, classification, and more"
      icon={<Brain className="w-6 h-6 text-white" />}
      tags={['Text Analysis', 'Sentiment', 'Classification', 'NER']}
      parameters={parameters}
      onParameterChange={handleParameterChange}
      onFilesChange={handleFilesChange}
      onRun={handleRun}
      onReset={handleReset}
      results={results}
      isLoading={isLoading}
      acceptedTypes={['.txt', '.csv', '.json']}
    />
  );
}
