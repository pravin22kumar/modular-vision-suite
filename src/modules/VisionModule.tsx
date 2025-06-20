
import { Eye } from "lucide-react";
import { useState } from "react";
import { ModuleLayout } from "@/components/ModuleLayout";

export function VisionModule() {
  const [parameters, setParameters] = useState([
    {
      id: 'task',
      label: 'Vision Task',
      type: 'select' as const,
      value: 'classification',
      options: ['classification', 'detection', 'segmentation', 'ocr', 'face_recognition']
    },
    {
      id: 'model_architecture',
      label: 'Model Architecture',
      type: 'select' as const,
      value: 'resnet',
      options: ['resnet', 'vgg', 'efficientnet', 'yolo', 'rcnn']
    },
    {
      id: 'confidence_threshold',
      label: 'Confidence Threshold',
      type: 'slider' as const,
      value: 0.8,
      min: 0.1,
      max: 1.0,
      step: 0.05
    },
    {
      id: 'image_size',
      label: 'Input Image Size',
      type: 'select' as const,
      value: '224',
      options: ['224', '256', '512', '1024']
    },
    {
      id: 'augmentation',
      label: 'Data Augmentation',
      type: 'switch' as const,
      value: true
    },
    {
      id: 'batch_size',
      label: 'Batch Size',
      type: 'slider' as const,
      value: 32,
      min: 1,
      max: 128,
      step: 1
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
        gptResponse: "Computer vision analysis completed successfully! Your image dataset has been processed using state-of-the-art deep learning models. Classification accuracy achieved: 96.8%. Key objects detected with high confidence scores. The model identified 15 distinct categories with excellent precision and recall metrics across all classes.",
        status: 'success',
        processingTime: 4.7
      });
      setIsLoading(false);
    }, 4000);
  };

  const handleReset = () => {
    setParameters(prev => prev.map(p => ({ 
      ...p, 
      value: p.id === 'task' ? 'classification' : 
             p.id === 'model_architecture' ? 'resnet' : 
             p.id === 'confidence_threshold' ? 0.8 : 
             p.id === 'image_size' ? '224' : 
             p.id === 'augmentation' ? true : 
             p.id === 'batch_size' ? 32 : ''
    })));
  };

  return (
    <ModuleLayout
      title="Computer Vision"
      description="Process and analyze images with deep learning models for classification, detection, and more"
      icon={<Eye className="w-6 h-6 text-white" />}
      tags={['Image Processing', 'Classification', 'Detection', 'OCR']}
      parameters={parameters}
      onParameterChange={handleParameterChange}
      onFilesChange={handleFilesChange}
      onRun={handleRun}
      onReset={handleReset}
      results={results}
      isLoading={isLoading}
      acceptedTypes={['.jpg', '.jpeg', '.png', '.bmp', '.tiff']}
    />
  );
}
