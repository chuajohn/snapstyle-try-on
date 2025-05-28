
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ImageUpload } from './ImageUpload';
import { TryOnControls } from './TryOnControls';
import { User, Shirt, Loader2 } from 'lucide-react';
import type { TryOnParams } from '@/pages/TryOn';

interface TryOnUploadSectionProps {
  personImage: File | null;
  garmentImage: File | null;
  tryOnParams: TryOnParams;
  isLoading: boolean;
  huggingFaceToken: string;
  onPersonImageUpload: (file: File) => void;
  onGarmentImageUpload: (file: File) => void;
  onParamsChange: (params: TryOnParams) => void;
  onTryOn: () => void;
}

export const TryOnUploadSection = ({
  personImage,
  garmentImage,
  tryOnParams,
  isLoading,
  huggingFaceToken,
  onPersonImageUpload,
  onGarmentImageUpload,
  onParamsChange,
  onTryOn,
}: TryOnUploadSectionProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Person Image Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Your Photo
          </CardTitle>
          <CardDescription>
            Upload a clear photo of yourself
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ImageUpload
            onImageUpload={onPersonImageUpload}
            acceptedTypes="image/*"
            placeholder="Upload your photo"
            currentImage={personImage}
          />
        </CardContent>
      </Card>

      {/* Garment Image Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shirt className="h-5 w-5" />
            Garment
          </CardTitle>
          <CardDescription>
            Upload the garment you want to try on
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ImageUpload
            onImageUpload={onGarmentImageUpload}
            acceptedTypes="image/*"
            placeholder="Upload garment image"
            currentImage={garmentImage}
          />
        </CardContent>
      </Card>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Try-On Settings</CardTitle>
          <CardDescription>
            Adjust the virtual try-on parameters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TryOnControls
            params={tryOnParams}
            onChange={onParamsChange}
          />
          <Button
            onClick={onTryOn}
            disabled={!personImage || !garmentImage || !huggingFaceToken.trim() || isLoading}
            className="w-full mt-4"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Try On Garment"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
