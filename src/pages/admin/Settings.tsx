import { useState } from "react";
import { useLocation } from "wouter";
import { LogOut, ChevronLeft, KeyRound, Eye, EyeOff, Check, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

export default function AdminSettings() {
  const { signOut } = useAuth();
  const [, navigate] = useLocation();

  const [newPassword, setNewPassword]         = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew]                 = useState(false);
  const [showConfirm, setShowConfirm]         = useState(false);
  const [loading, setLoading]                 = useState(false);
  const [success, setSuccess]                 = useState(false);
  const [error, setError]                     = useState<string | null>(null);

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
    setLoading(false);

    if (updateError) {
      setError(updateError.message);
    } else {
      setSuccess(true);
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition";

  return (
    <div className="min-h-screen bg-background">

      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/admin/products")}
              className="flex items-center gap-1.5 text-sm text-foreground/60 hover:text-foreground transition"
            >
              <ChevronLeft className="w-4 h-4" />
              Products
            </button>
            <span className="text-foreground/20">|</span>
            <h1 className="font-serif text-lg font-bold text-foreground">
              Admin — Settings
            </h1>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-md">

          {/* Change password card */}
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <KeyRound className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold text-foreground">Change Password</h2>
                <p className="text-xs text-foreground/50">Update your admin account password.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* New password */}
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min. 6 characters"
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground/70 transition"
                  >
                    {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm password */}
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground/70 transition"
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              {/* Success */}
              {success && (
                <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                  <Check className="w-4 h-4 flex-shrink-0" />
                  Password updated successfully.
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? "Updating…" : "Update Password"}
              </button>

            </form>
          </div>

        </div>
      </main>
    </div>
  );
}