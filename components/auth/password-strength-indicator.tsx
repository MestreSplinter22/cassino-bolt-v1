'use client';

import { Progress } from '@/components/ui/progress';

interface PasswordStrengthIndicatorProps {
  password: string;
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const calculateStrength = (password: string): number => {
    if (!password) return 0;
    
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 25;
    
    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 25;
    
    // Contains lowercase
    if (/[a-z]/.test(password)) strength += 25;
    
    // Contains number
    if (/[0-9]/.test(password)) strength += 12.5;
    
    // Contains special character
    if (/[^A-Za-z0-9]/.test(password)) strength += 12.5;
    
    return strength;
  };

  const strength = calculateStrength(password);
  
  const getStrengthColor = (strength: number): string => {
    if (strength < 25) return 'bg-red-500';
    if (strength < 50) return 'bg-orange-500';
    if (strength < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = (strength: number): string => {
    if (strength < 25) return 'Weak';
    if (strength < 50) return 'Fair';
    if (strength < 75) return 'Good';
    return 'Strong';
  };

  if (!password) return null;

  return (
    <div className="space-y-2">
      <Progress
        value={strength}
        className="h-1.5"
        indicatorClassName={getStrengthColor(strength)}
      />
      <p className="text-xs text-muted-foreground">
        Password strength: {getStrengthText(strength)}
      </p>
    </div>
  );
}