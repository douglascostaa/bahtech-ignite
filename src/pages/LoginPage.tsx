import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Presentation } from "lucide-react";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const result = await signIn(email, password);

        if (result.error) {
            setError(result.error);
            setLoading(false);
        } else {
            navigate("/dashboard", { replace: true });
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center p-4">
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="relative w-full max-w-md">
                {/* Logo & Title */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg shadow-blue-500/20">
                        <Presentation className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white font-display tracking-tight">
                        BahTech Slides
                    </h1>
                    <p className="text-zinc-500 text-sm mt-2">
                        Plataforma de apresentações
                    </p>
                </div>

                {/* Login Card */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 shadow-2xl"
                >
                    <div className="space-y-5">
                        <div>
                            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2 block">
                                E-mail
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="seu@bahtech.com.br"
                                required
                                autoFocus
                                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2 block">
                                Senha
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="mt-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3 text-center">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-60 disabled:cursor-wait flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Entrando...
                            </>
                        ) : (
                            "Entrar"
                        )}
                    </button>
                </form>

                <p className="text-center text-zinc-600 text-xs mt-6">
                    © {new Date().getFullYear()} BahTech Sistemas
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
