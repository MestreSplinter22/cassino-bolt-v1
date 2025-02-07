'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, Lock, Mail, X, HelpCircle, Crown, Phone, Globe } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// CPF validation helper
const validateCPF = (cpf: string) => {
  const cleanCPF = cpf.replace(/[^\d]/g, '');
  if (cleanCPF.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let digit = 11 - (sum % 11);
  const firstDigit = digit >= 10 ? 0 : digit;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  digit = 11 - (sum % 11);
  const secondDigit = digit >= 10 ? 0 : digit;

  return parseInt(cleanCPF.charAt(9)) === firstDigit && 
         parseInt(cleanCPF.charAt(10)) === secondDigit;
};

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  phone: z.object({
    countryCode: z.string().min(1, 'Country code is required'),
    number: z.string().min(8, 'Phone number is too short').max(15, 'Phone number is too long'),
  }),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  nationality: z.string().min(1, 'Nationality is required'),
  cpf: z.string().optional()
    .refine((val) => {
      if (!val) return true;
      return validateCPF(val);
    }, 'Invalid CPF'),
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

interface AuthModalsProps {
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  onLoginClose: () => void;
  onRegisterClose: () => void;
  onSwitchToRegister: () => void;
  onSwitchToLogin: () => void;
}

const countries = [
  { code: '+1', flag: '🇺🇸', name: 'United States' },
  { code: '+55', flag: '🇧🇷', name: 'Brazil' },
  { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
  // Add more countries as needed
];

const nationalities = [
  'Afghan', 'Albanian', 'Algerian', 'American', 'Andorran', 'Angolan', 'Brazilian',
  // Add more nationalities alphabetically
];

export function AuthModals({
  isLoginOpen,
  isRegisterOpen,
  onLoginClose,
  onRegisterClose,
  onSwitchToRegister,
  onSwitchToLogin,
}: AuthModalsProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedNationality, setSelectedNationality] = useState<string>('');

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      phone: {
        countryCode: '',
        number: '',
      },
      password: '',
      nationality: '',
      cpf: '',
    },
  });

  const onLoginSubmit = (data: LoginFormData) => {
    console.log('Login data:', data);
  };

  const onRegisterSubmit = (data: RegisterFormData) => {
    console.log('Register data:', data);
  };

  const handleNationalityChange = (value: string) => {
    setSelectedNationality(value);
    registerForm.setValue('nationality', value);
    if (value !== 'Brazilian') {
      registerForm.setValue('cpf', '');
    }
  };

  const renderAuthContent = (isLogin: boolean) => {
    const currentForm = isLogin ? loginForm : registerForm;
    const onSubmit = isLogin ? onLoginSubmit : onRegisterSubmit;
    const title = isLogin ? 'Sign In' : 'Create Account';

    return (
      <Dialog open={isLogin ? isLoginOpen : isRegisterOpen} onOpenChange={isLogin ? onLoginClose : onRegisterClose}>
        <DialogContent className="p-0 gap-0 max-w-none md:max-w-[800px] w-screen h-screen md:h-auto bg-transparent border-0 rounded-none">
          <DialogTitle className="sr-only">
            {isLogin ? 'Sign In to Golden Crown' : 'Create Golden Crown Account'}
          </DialogTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-lg md:rounded-lg h-full">
            {/* Desktop Banner - Hidden on Mobile */}
            <div className="hidden md:block relative">
              <img
                src="https://images.unsplash.com/photo-1634443686889-d0e9726ba84a?w=800&q=80"
                alt="Auth banner"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Form Container */}
            <div className="bg-black/90 relative flex flex-col md:p-6 h-full">
              {/* Header Section */}
              <div className="flex items-center justify-between p-4 md:p-0 md:mb-8 bg-black/90 md:bg-transparent">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#FFD700] hover:text-[#FFD700]/80"
                >
                  <HelpCircle className="h-5 w-5 mr-1" />
                  Support
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#FFD700] hover:text-[#FFD700]/80"
                  onClick={isLogin ? onSwitchToRegister : onSwitchToLogin}
                >
                  {isLogin ? 'Register' : 'Login'}
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white/70 hover:text-white"
                  onClick={isLogin ? onLoginClose : onRegisterClose}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Mobile Banner Card */}
              <Card className="block md:hidden mx-4 rounded-lg overflow-hidden border-[#FFD700]/20 bg-black/50 backdrop-blur-sm">
                <div className="relative h-48 w-full">
                  <img
                    src="https://imagedelivery.net/BgH9d8bzsn4n0yijn4h7IQ/6637bfc9-963c-4071-d933-78510838a300/w=1024"
                    alt="Mobile banner"
                    className="w-full h-full object-scale-down"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                </div>
              </Card>

              {/* Content Container */}
              <div className="p-4 md:p-0 flex-1 md:pt-0">
                {/* Logo */}
                <div className="flex flex-col items-center mb-8">
                  <Crown className="h-12 w-12 text-[#FFD700] mb-2" />
                  <h2 className="text-2xl font-bold text-[#FFD700]">Golden Crown</h2>
                </div>

                {/* Form */}
                <Form {...currentForm}>
                  <form onSubmit={currentForm.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={currentForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                              <Input
                                placeholder="Email"
                                className="pl-10 bg-white/5 border-[#FFD700]/20 focus:border-[#FFD700]/50"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {!isLogin && (
                      <>
                        <div className="grid grid-cols-3 gap-2">
                          <FormField
                            control={registerForm.control}
                            name="phone.countryCode"
                            render={({ field }) => (
                              <FormItem>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="bg-white/5 border-[#FFD700]/20">
                                      <SelectValue placeholder="Code" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {countries.map((country) => (
                                      <SelectItem key={country.code} value={country.code}>
                                        <span className="mr-2">{country.flag}</span>
                                        {country.code}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={registerForm.control}
                            name="phone.number"
                            render={({ field }) => (
                              <FormItem className="col-span-2">
                                <FormControl>
                                  <div className="relative">
                                    <Phone className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                    <Input
                                      placeholder="Phone number"
                                      className="pl-10 bg-white/5 border-[#FFD700]/20 focus:border-[#FFD700]/50"
                                      {...field}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={registerForm.control}
                          name="nationality"
                          render={({ field }) => (
                            <FormItem>
                              <Select
                                onValueChange={handleNationalityChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="w-full bg-white/5 border-[#FFD700]/20">
                                    <Globe className="h-5 w-5 mr-2 text-muted-foreground" />
                                    <SelectValue placeholder="Select nationality" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {nationalities.map((nationality) => (
                                    <SelectItem key={nationality} value={nationality}>
                                      {nationality}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {selectedNationality === 'Brazilian' && (
                          <FormField
                            control={registerForm.control}
                            name="cpf"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    placeholder="CPF"
                                    className="bg-white/5 border-[#FFD700]/20 focus:border-[#FFD700]/50"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </>
                    )}

                    <FormField
                      control={currentForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                              <Input
                                type={showPassword ? 'text' : 'password'}
                                className="pl-10 pr-10 bg-white/5 border-[#FFD700]/20 focus:border-[#FFD700]/50"
                                placeholder="Password"
                                {...field}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-5 w-5 text-muted-foreground" />
                                ) : (
                                  <Eye className="h-5 w-5 text-muted-foreground" />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {isLogin && (
                      <div className="flex items-center justify-between">
                        <Button
                          type="button"
                          variant="link"
                          className="text-sm text-[#FFD700] hover:text-[#FFD700]/80 px-0"
                        >
                          Forgot password?
                        </Button>

                        <FormField
                          control={loginForm.control}
                          name="rememberMe"
                          render={({ field }) => (
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="rememberMe"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="border-[#FFD700]/50 data-[state=checked]:bg-[#FFD700] data-[state=checked]:text-black"
                              />
                              <label
                                htmlFor="rememberMe"
                                className="text-sm font-medium leading-none cursor-pointer"
                              >
                                Remember me
                              </label>
                            </div>
                          )}
                        />
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black hover:opacity-90"
                    >
                      {title}
                    </Button>

                    {isLogin && (
                      <>
                        <div className="relative my-6">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[#FFD700]/20" />
                          </div>
                          <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-black px-2 text-muted-foreground">
                              Or continue with
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full bg-white/5 border-[#FFD700]/20 hover:bg-white/10"
                            onClick={() => {/* Handle Google login */}}
                          >
                            <img
                              src="https://www.google.com/favicon.ico"
                              alt="Google"
                              className="h-4 w-4 mr-2"
                            />
                            Sign in with Google
                          </Button>
                          
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full bg-[#6441A4]/10 border-[#6441A4]/50 hover:bg-[#6441A4]/20 text-white"
                            onClick={() => {/* Handle Twitch login */}}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              className="h-4 w-4 mr-2 fill-current"
                            >
                              <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
                            </svg>
                            Sign in with Twitch
                          </Button>
                        </div>
                      </>
                    )}
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <>
      {renderAuthContent(true)}
      {renderAuthContent(false)}
    </>
  );
}