
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Settings, Play, RotateCcw } from "lucide-react";

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

interface ParameterPanelProps {
  parameters: Parameter[];
  onParameterChange: (id: string, value: any) => void;
  onRun: () => void;
  onReset: () => void;
  isLoading?: boolean;
}

export function ParameterPanel({ 
  parameters, 
  onParameterChange, 
  onRun, 
  onReset,
  isLoading = false 
}: ParameterPanelProps) {
  const renderParameter = (param: Parameter) => {
    switch (param.type) {
      case 'text':
      case 'number':
        return (
          <Input
            type={param.type}
            value={param.value}
            onChange={(e) => onParameterChange(param.id, e.target.value)}
            placeholder={param.placeholder}
            min={param.min}
            max={param.max}
            step={param.step}
          />
        );
      
      case 'textarea':
        return (
          <Textarea
            value={param.value}
            onChange={(e) => onParameterChange(param.id, e.target.value)}
            placeholder={param.placeholder}
            rows={3}
          />
        );
      
      case 'select':
        return (
          <Select value={param.value} onValueChange={(value) => onParameterChange(param.id, value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select option..." />
            </SelectTrigger>
            <SelectContent>
              {param.options?.map(option => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      case 'slider':
        return (
          <div className="space-y-3">
            <Slider
              value={[param.value]}
              onValueChange={(value) => onParameterChange(param.id, value[0])}
              min={param.min || 0}
              max={param.max || 100}
              step={param.step || 1}
              className="w-full"
            />
            <div className="text-center text-sm text-muted-foreground">
              {param.value}
            </div>
          </div>
        );
      
      case 'switch':
        return (
          <Switch
            checked={param.value}
            onCheckedChange={(checked) => onParameterChange(param.id, checked)}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Settings className="w-5 h-5" />
          Parameters & Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          {parameters.map((param) => (
            <div key={param.id} className="space-y-2">
              <Label htmlFor={param.id} className="text-sm font-medium">
                {param.label}
              </Label>
              {renderParameter(param)}
            </div>
          ))}
        </div>
        
        <div className="pt-4 border-t space-y-3">
          <Button 
            onClick={onRun} 
            className="w-full" 
            disabled={isLoading}
            size="lg"
          >
            <Play className="w-4 h-4 mr-2" />
            {isLoading ? 'Processing...' : 'Run Model'}
          </Button>
          
          <Button 
            onClick={onReset} 
            variant="outline" 
            className="w-full"
            disabled={isLoading}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Parameters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
