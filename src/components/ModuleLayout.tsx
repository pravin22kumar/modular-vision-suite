
import { FileUpload } from "./FileUpload";
import { ParameterPanel } from "./ParameterPanel";
import { OutputPanel } from "./OutputPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Parameter {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'slider' | 'switch' | 'number';
  value: any;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
}

interface ModuleLayoutProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  parameters: Parameter[];
  onParameterChange: (id: string, value: any) => void;
  onFilesChange: (files: File[]) => void;
  onRun: () => void;
  onReset: () => void;
  results?: any;
  isLoading?: boolean;
  acceptedTypes?: string[];
}

export function ModuleLayout({
  title,
  description,
  icon,
  tags,
  parameters,
  onParameterChange,
  onFilesChange,
  onRun,
  onReset,
  results,
  isLoading,
  acceptedTypes
}: ModuleLayoutProps) {
  return (
    <div className="h-full p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                {icon}
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">{title}</CardTitle>
                <p className="text-muted-foreground mt-1">{description}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
        {/* Left Column - Upload & Parameters */}
        <div className="col-span-4 space-y-6">
          <FileUpload 
            onFilesChange={onFilesChange} 
            acceptedTypes={acceptedTypes}
          />
          <ParameterPanel
            parameters={parameters}
            onParameterChange={onParameterChange}
            onRun={onRun}
            onReset={onReset}
            isLoading={isLoading}
          />
        </div>

        {/* Right Column - Output */}
        <div className="col-span-8">
          <OutputPanel 
            results={results}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
