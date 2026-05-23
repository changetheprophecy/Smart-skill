import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  User,
  Mail,
  MapPin,
  BookOpen,
  Sparkles,
  Zap,
  Lock,
  MessageCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* PASSWORD STRENGTH */
function getStrength(password) {
  let score = 0;
  if (password.length > 5) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

function StrengthBar({ password }) {
  const strength = getStrength(password);
  const labels = ["Weak", "Fair", "Good", "Strong"];
  const colors = ["#ef4444", "#f59e0b", "#3b82f6", "#22c55e"];

  return (
    <div className="mt-2">
      <div className="h-2 bg-base-300 rounded-full overflow-hidden">
        <motion.div
          className="h-full"
          animate={{ width: `${(strength / 4) * 100}%` }}
          style={{ backgroundColor: colors[strength - 1] || "#d1d5db" }}
        />
      </div>
      <p className="text-xs mt-1 text-base-content/50">
        {password ? labels[strength - 1] || "Very Weak" : "Enter password"}
      </p>
    </div>
  );
}

/* INPUTS */
function Input({ icon, value, setValue, placeholder, type = "text", inputRef }) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm mb-2 text-base-content/70">
        {icon} {placeholder}
      </label>
      <input
        ref={inputRef}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="input input-bordered w-full focus:input-primary"
      />
    </div>
  );
}

function Textarea({ icon, value, setValue, placeholder }) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm mb-2 text-base-content/70">
        {icon} {placeholder}
      </label>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="textarea textarea-bordered w-full focus:textarea-primary"
        rows={3}
      />
    </div>
  );
}

export default function LoginPage() {
  const { user, register, login: backendLogin } = useAuth();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [aiMode, setAiMode] = useState(false);
  const [step, setStep] = useState(1);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [location, setLocation] = useState("");
  const locationRef = useRef(null);

  const [bio, setBio] = useState("");
  const [skillsOffered, setSkillsOffered] = useState("");
  const [skillsWanted, setSkillsWanted] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate("/profile", { replace: true });
  }, [user]);

  useEffect(() => {
    setStep(1);
    setError("");
  }, [isLogin]);

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        await backendLogin(email, password);
      } else {
        await register({
          name,
          email,
          password,
          location,
          bio,
          skillsOffered: skillsOffered.split(",").map((s) => s.trim()),
          skillsWanted: skillsWanted.split(",").map((s) => s.trim()),
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
        });
      }

      navigate("/profile");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-base-200">

      <div className="w-full max-w-5xl">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary">
            {isLogin ? "Welcome Back" : "Join SkillSwap"}
          </h1>
          <p className="text-base-content/60">Learn & Share Skills</p>
        </div>

        {/* MODE SWITCH */}
        <div className="flex justify-center gap-2 mb-6">
          <button className={`btn btn-sm ${isLogin ? "btn-primary" : "btn-ghost"}`} onClick={() => setIsLogin(true)}>Login</button>
          <button className={`btn btn-sm ${!isLogin ? "btn-primary" : "btn-ghost"}`} onClick={() => setIsLogin(false)}>Sign Up</button>
          <button className="btn btn-sm btn-ghost" onClick={() => setAiMode(!aiMode)}>
            AI Mode
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* FORM */}
          {!aiMode && (
            <form onSubmit={handleSubmit} className="bg-base-100 p-8 rounded-2xl space-y-4">

              {error && <div className="alert alert-error">{error}</div>}

              {/* LOGIN */}
              {isLogin ? (
                <>
                  <Input icon={<Mail />} value={email} setValue={setEmail} placeholder="Email" type="email" />
                  <Input icon={<Lock />} value={password} setValue={setPassword} placeholder="Password" type="password" />

                  <button className="btn btn-primary w-full mt-4">
                    {loading ? "Loading..." : "Sign In"}
                  </button>
                </>
              ) : (
                <>
                  {step === 1 && (
                    <>
                      <Input icon={<User />} value={name} setValue={setName} placeholder="Full Name" />
                      <Input icon={<Mail />} value={email} setValue={setEmail} placeholder="Email" />
                      <Input icon={<Lock />} value={password} setValue={setPassword} placeholder="Password" type="password" />
                      <StrengthBar password={password} />
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <Input icon={<MapPin />} value={location} setValue={setLocation} placeholder="Location" inputRef={locationRef} />
                      <Textarea icon={<BookOpen />} value={bio} setValue={setBio} placeholder="Bio" />
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <Input icon={<Sparkles />} value={skillsOffered} setValue={setSkillsOffered} placeholder="Skills you teach" />
                      <Input icon={<Zap />} value={skillsWanted} setValue={setSkillsWanted} placeholder="Skills you want" />
                    </>
                  )}

                  {/* NAV */}
                  <div className="flex gap-2 mt-4">
                    {step > 1 && <button type="button" onClick={prevStep} className="btn btn-ghost flex-1">Back</button>}
                    {step < 3 ? (
                      <button type="button" onClick={nextStep} className="btn btn-primary flex-1">Next</button>
                    ) : (
                      <button type="submit" className="btn btn-primary flex-1">
                        {loading ? "Creating..." : "Create Account"}
                      </button>
                    )}
                  </div>
                </>
              )}
            </form>
          )}

          {/* AI MODE */}
          {aiMode && (
            <div className="bg-base-100 p-8 rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle />
                <h2 className="font-bold">AI Assistant</h2>
              </div>

              <p className="text-sm text-base-content/60 mb-4">
                Tell me your skills and I’ll build your profile.
              </p>

              <input className="input input-bordered w-full" placeholder="I know React, Node..." />
              <button className="btn btn-primary w-full mt-3">Generate</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}