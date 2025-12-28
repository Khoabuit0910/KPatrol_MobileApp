'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  Bot, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Loader2,
  AlertCircle,
  User,
  Check,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');

  // Password validation rules
  const passwordRules = [
    { label: 'Ít nhất 8 ký tự', valid: password.length >= 8 },
    { label: 'Có chữ hoa', valid: /[A-Z]/.test(password) },
    { label: 'Có chữ thường', valid: /[a-z]/.test(password) },
    { label: 'Có số', valid: /[0-9]/.test(password) },
    { label: 'Có ký tự đặc biệt', valid: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ];

  const isPasswordValid = passwordRules.every(rule => rule.valid);
  const doPasswordsMatch = password === confirmPassword && confirmPassword.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    if (!isPasswordValid) {
      setError('Mật khẩu không đáp ứng yêu cầu bảo mật');
      return;
    }

    if (!doPasswordsMatch) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    if (!agreeTerms) {
      setError('Vui lòng đồng ý với điều khoản sử dụng');
      return;
    }

    const result = await register({ name, email, password });
    
    if (result.success) {
      router.push('/');
    } else {
      setError(result.error || 'Đăng ký thất bại');
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-accent-600 via-kpatrol-500 to-kpatrol-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16">
          <div className="flex items-center gap-4 mb-8">
            <Image 
              src="/logo_with_branchname.png" 
              alt="K-Patrol Logo" 
              width={200} 
              height={80}
              className="object-contain"
            />
          </div>

          <h2 className="text-3xl font-bold text-white mb-4">
            Tạo tài khoản mới
          </h2>
          <p className="text-white/80 text-lg max-w-md">
            Đăng ký để bắt đầu sử dụng hệ thống điều khiển robot tuần tra K-Patrol.
          </p>

          {/* Steps */}
          <div className="mt-12 space-y-6">
            {[
              { step: 1, title: 'Đăng ký tài khoản', desc: 'Điền thông tin cơ bản' },
              { step: 2, title: 'Xác minh email', desc: 'Kiểm tra hộp thư đến' },
              { step: 3, title: 'Kết nối robot', desc: 'Cấu hình thiết bị của bạn' },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold shrink-0">
                  {item.step}
                </div>
                <div>
                  <p className="text-white font-medium">{item.title}</p>
                  <p className="text-white/60 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-kpatrol-400/30 rounded-full blur-3xl" />
      </div>

      {/* Right Panel - Register Form */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <Image 
              src="/logo.png" 
              alt="K-Patrol Logo" 
              width={48} 
              height={48}
              className="object-contain"
            />
            <span className="text-2xl font-bold text-gradient">K-Patrol</span>
          </div>

          <div className="text-center lg:text-left mb-8">
            <h2 className="text-2xl font-bold text-dark-text">Đăng ký</h2>
            <p className="text-dark-muted mt-2">Tạo tài khoản K-Patrol của bạn</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-status-error/10 border border-status-error/30 rounded-xl flex items-center gap-3 animate-slide-up">
              <AlertCircle className="w-5 h-5 text-status-error shrink-0" />
              <p className="text-sm text-status-error">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-dark-text">Họ và tên</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-muted" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className="w-full pl-12 pr-4 py-3 bg-dark-surface border border-dark-border rounded-xl text-dark-text placeholder-dark-muted focus:outline-none focus:border-kpatrol-500 focus:ring-2 focus:ring-kpatrol-500/20 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-dark-text">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full pl-12 pr-4 py-3 bg-dark-surface border border-dark-border rounded-xl text-dark-text placeholder-dark-muted focus:outline-none focus:border-kpatrol-500 focus:ring-2 focus:ring-kpatrol-500/20 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-dark-text">Mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 bg-dark-surface border border-dark-border rounded-xl text-dark-text placeholder-dark-muted focus:outline-none focus:border-kpatrol-500 focus:ring-2 focus:ring-kpatrol-500/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-muted hover:text-dark-text transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Password Rules */}
              {password.length > 0 && (
                <div className="mt-3 p-3 bg-dark-surface/50 rounded-lg space-y-2">
                  {passwordRules.map((rule, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      {rule.valid ? (
                        <Check className="w-4 h-4 text-status-success" />
                      ) : (
                        <X className="w-4 h-4 text-dark-muted" />
                      )}
                      <span className={rule.valid ? 'text-status-success' : 'text-dark-muted'}>
                        {rule.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-dark-text">Xác nhận mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className={cn(
                    "w-full pl-12 pr-12 py-3 bg-dark-surface border rounded-xl text-dark-text placeholder-dark-muted focus:outline-none focus:ring-2 transition-all",
                    confirmPassword.length > 0 && (
                      doPasswordsMatch 
                        ? "border-status-success focus:border-status-success focus:ring-status-success/20" 
                        : "border-status-error focus:border-status-error focus:ring-status-error/20"
                    ),
                    confirmPassword.length === 0 && "border-dark-border focus:border-kpatrol-500 focus:ring-kpatrol-500/20"
                  )}
                />
                {confirmPassword.length > 0 && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {doPasswordsMatch ? (
                      <Check className="w-5 h-5 text-status-success" />
                    ) : (
                      <X className="w-5 h-5 text-status-error" />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-dark-border bg-dark-surface text-kpatrol-500 focus:ring-kpatrol-500/20"
              />
              <span className="text-sm text-dark-muted">
                Tôi đồng ý với{' '}
                <Link href="/terms" className="text-kpatrol-400 hover:text-kpatrol-300">
                  Điều khoản sử dụng
                </Link>{' '}
                và{' '}
                <Link href="/privacy" className="text-kpatrol-400 hover:text-kpatrol-300">
                  Chính sách bảo mật
                </Link>
              </span>
            </label>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isLoading || !isPasswordValid || !doPasswordsMatch || !agreeTerms}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Đang đăng ký...
                </>
              ) : (
                <>
                  Đăng ký
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          {/* Login Link */}
          <p className="mt-8 text-center text-dark-muted">
            Đã có tài khoản?{' '}
            <Link 
              href="/login"
              className="text-kpatrol-400 hover:text-kpatrol-300 font-medium transition-colors"
            >
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
