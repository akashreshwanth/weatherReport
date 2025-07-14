import React, { useState } from 'react';
import { LogIn, User, Mail, Lock, X } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    signIn
  } = useAuth();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    try {
      await signIn(email, password);
      onClose();
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleDemoLogin = () => {
    setEmail('demo@weather.app');
    setPassword('demo123');
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      
      
      {/* Modal */}
      <div className="relative w-full max-w-md animate-scale-in">
        <GlassCard variant="glow" className="relative">
          {/* Close button */}
          <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors duration-200">
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-neon-cyan/20 to-neon-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-neon-cyan" />
            </div>
            <h2 className="text-2xl font-display font-bold text-foreground">
              Welcome Back
            </h2>
            <p className="text-muted-foreground mt-2">
              Sign in to save your favorite cities
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" className={cn("w-full pl-12 pr-4 py-3 rounded-lg transition-all duration-300", "bg-card/50 border border-border/50 text-foreground placeholder:text-muted-foreground", "focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 focus:border-neon-cyan/50", "hover:border-neon-cyan/30")} required />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" className={cn("w-full pl-12 pr-4 py-3 rounded-lg transition-all duration-300", "bg-card/50 border border-border/50 text-foreground placeholder:text-muted-foreground", "focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 focus:border-neon-cyan/50", "hover:border-neon-cyan/30")} required />
              </div>
            </div>

            <div className="space-y-3">
              <InteractiveHoverButton type="submit" disabled={loading || !email || !password} className="w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed">
                <LogIn className="w-4 h-4" />
                {loading ? 'Signing In...' : 'Sign In'}
              </InteractiveHoverButton>

              <button type="button" onClick={handleDemoLogin} className="w-full py-3 px-4 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 border border-border/30 hover:border-border/50">
                Try Demo Account
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="text-center mt-6 pt-6 border-t border-border/30">
            <p className="text-xs text-muted-foreground">
              This is a demo app. Your data is stored locally.
            </p>
          </div>
        </GlassCard>
      </div>
    </div>;
};