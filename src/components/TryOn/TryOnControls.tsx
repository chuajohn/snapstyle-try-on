
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import type { TryOnParams } from '@/pages/TryOn';

interface TryOnControlsProps {
  params: TryOnParams;
  onChange: (params: TryOnParams) => void;
}

export const TryOnControls = ({ params, onChange }: TryOnControlsProps) => {
  const updateParams = (updates: Partial<TryOnParams>) => {
    onChange({ ...params, ...updates });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="denoising-steps">
          Denoising Steps: {params.denoisingSteps}
        </Label>
        <Slider
          id="denoising-steps"
          min={10}
          max={50}
          step={1}
          value={[params.denoisingSteps]}
          onValueChange={(value) => updateParams({ denoisingSteps: value[0] })}
          className="w-full"
        />
        <p className="text-xs text-gray-500">
          Higher values provide better quality but take longer (recommended: 30)
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="seed">Seed</Label>
        <Input
          id="seed"
          type="number"
          value={params.seed}
          onChange={(e) => updateParams({ seed: parseInt(e.target.value) || 42 })}
          placeholder="Random seed for generation"
        />
        <p className="text-xs text-gray-500">
          Use the same seed for reproducible results
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="is-checked"
            checked={params.isChecked}
            onCheckedChange={(checked) => updateParams({ isChecked: checked })}
          />
          <Label htmlFor="is-checked">Enable garment preprocessing</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="is-checked-crop"
            checked={params.isCheckedCrop}
            onCheckedChange={(checked) => updateParams({ isCheckedCrop: checked })}
          />
          <Label htmlFor="is-checked-crop">Auto-crop garment</Label>
        </div>
      </div>
    </div>
  );
};
