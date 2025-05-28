
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, RotateCcw, Sparkles } from 'lucide-react';

interface TryOnResultProps {
  resultImage: string;
  onDownload: () => void;
  onReset: () => void;
}

export const TryOnResult = ({ resultImage, onDownload, onReset }: TryOnResultProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Your Virtual Try-On Result
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <img
              src={resultImage}
              alt="Virtual try-on result"
              className="w-full max-w-md mx-auto rounded-lg shadow-lg"
            />
          </div>
          
          <div className="flex gap-2 justify-center">
            <Button onClick={onDownload} variant="default">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button onClick={onReset} variant="outline">
              <RotateCcw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
