
import { Upload, FileText, X, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FileUploadProps {
  onFilesChange: (files: File[]) => void;
  acceptedTypes?: string[];
  maxFiles?: number;
}

export function FileUpload({ 
  onFilesChange, 
  acceptedTypes = ['.csv', '.xlsx', '.json', '.pkl'],
  maxFiles = 5 
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter(file => 
      acceptedTypes.some(type => file.name.toLowerCase().endsWith(type.toLowerCase()))
    );
    
    const newFiles = [...files, ...validFiles].slice(0, maxFiles);
    setFiles(newFiles);
    onFilesChange(newFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const newFiles = [...files, ...selectedFiles].slice(0, maxFiles);
      setFiles(newFiles);
      onFilesChange(newFiles);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesChange(newFiles);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      <Card
        className={`border-2 border-dashed transition-all duration-200 ${
          dragActive 
            ? 'border-primary bg-primary/5 animate-pulse-glow' 
            : 'border-muted-foreground/25 hover:border-primary/50'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        <div className="p-8 text-center">
          <Upload className={`w-12 h-12 mx-auto mb-4 transition-colors ${
            dragActive ? 'text-primary' : 'text-muted-foreground'
          }`} />
          <h3 className="text-lg font-medium mb-2">Upload your data files</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Drag and drop your files here, or click to browse
          </p>
          <input
            type="file"
            multiple
            accept={acceptedTypes.join(',')}
            onChange={handleFileInput}
            className="hidden"
            id="file-upload"
          />
          <Button 
            variant="outline" 
            onClick={() => document.getElementById('file-upload')?.click()}
            className="mb-4"
          >
            Browse Files
          </Button>
          <div className="flex flex-wrap gap-2 justify-center">
            {acceptedTypes.map(type => (
              <Badge key={type} variant="secondary" className="text-xs">
                {type.toUpperCase()}
              </Badge>
            ))}
          </div>
        </div>
      </Card>

      {files.length > 0 && (
        <Card className="p-4">
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Uploaded Files ({files.length}/{maxFiles})
          </h4>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
