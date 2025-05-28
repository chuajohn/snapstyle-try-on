
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  acceptedTypes: string;
  placeholder: string;
  currentImage?: File | null;
}

export const ImageUpload = ({ 
  onImageUpload, 
  acceptedTypes, 
  placeholder, 
  currentImage 
}: ImageUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const removeImage = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <Card
        className={`relative border-2 border-dashed transition-colors cursor-pointer ${
          isDragOver
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="p-6">
          {previewUrl ? (
            <div className="relative">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
              />
              <Button
                size="sm"
                variant="destructive"
                className="absolute top-2 right-2"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage();
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">{placeholder}</p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          )}
        </div>
      </Card>

      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes}
        onChange={handleFileInputChange}
        className="hidden"
      />

      {!previewUrl && (
        <Button
          variant="outline"
          className="w-full"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="mr-2 h-4 w-4" />
          Choose File
        </Button>
      )}
    </div>
  );
};
