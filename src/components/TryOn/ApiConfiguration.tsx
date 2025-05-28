
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';

interface ApiConfigurationProps {
  huggingFaceToken: string;
  onTokenChange: (token: string) => void;
}

export const ApiConfiguration = ({ huggingFaceToken, onTokenChange }: ApiConfigurationProps) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          Hugging Face API Configuration
        </CardTitle>
        <CardDescription>
          Enter your Hugging Face API token to use the virtual try-on feature. You can get one from{' '}
          <a 
            href="https://huggingface.co/settings/tokens" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            huggingface.co/settings/tokens
          </a>
          <br />
          <span className="text-amber-600 font-medium">Note: Virtual try-on models may have limited availability and require specific API permissions.</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="hf-token">Hugging Face API Token</Label>
          <Input
            id="hf-token"
            type="password"
            value={huggingFaceToken}
            onChange={(e) => onTokenChange(e.target.value)}
            placeholder="hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
          />
        </div>
      </CardContent>
    </Card>
  );
};
