'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Bot, 
  Mail, 
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

export default function ForgotPasswordPage() {
  const { forgotPassword, isLoading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Vui lòng nhập email');
      return;
    }

    const result = await forgotPassword(email);
    
    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error || 'Không thể gửi email khôi phục');
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <Image 
            src="/logo.png" 
            alt="K-Patrol Logo" 
            width={48} 
            height={48}
            className="object-contain"
          />
          <span className="text-2xl font-bold text-gradient">K-Patrol</span>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-dark-text">Quên mật khẩu?</h2>
          <p className="text-dark-muted mt-2">
            Nhập email của bạn và chúng tôi sẽ gửi link khôi phục mật khẩu
          </p>
        </div>

        {success ? (
          <div className="text-center animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-status-success/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-status-success" />
            </div>
            <h3 className="text-xl font-semibold text-dark-text mb-2">Email đã được gửi!</h3>
            <p className="text-dark-muted mb-6">
              Kiểm tra hộp thư của bạn và làm theo hướng dẫn để đặt lại mật khẩu.
            </p>
            <Link href="/login">
              <Button variant="primary" size="lg" className="w-full">
                <ArrowLeft className="w-5 h-5" />
                Quay lại đăng nhập
              </Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-status-error/10 border border-status-error/30 rounded-xl flex items-center gap-3 animate-slide-up">
                <AlertCircle className="w-5 h-5 text-status-error shrink-0" />
                <p className="text-sm text-status-error">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
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

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Đang gửi...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Gửi email khôi phục
                  </>
                )}
              </Button>
            </form>

            {/* Back to Login */}
            <div className="mt-8 text-center">
              <Link 
                href="/login"
                className="inline-flex items-center gap-2 text-dark-muted hover:text-kpatrol-400 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Quay lại đăng nhập
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
