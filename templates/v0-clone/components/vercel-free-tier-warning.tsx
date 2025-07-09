"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Clock, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";

export default function VercelFreeTierWarning() {
  const [isVisible, setIsVisible] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [showCountdown, setShowCountdown] = useState(false);

  useEffect(() => {
    // Show warning on mount
    setIsVisible(true);
    
    // Auto-hide after 10 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const startCountdown = () => {
    setShowCountdown(true);
    setCountdown(10);
    
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowCountdown(false);
          return 10;
        }
        return prev - 1;
      });
    }, 1000);
  };

  if (!isVisible) return null;

  return (
    <Alert className="mb-4 border-orange-200 bg-orange-50 text-orange-800">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <strong>Vercel Free Tier Notice:</strong> Functions timeout after 10 seconds. 
            Complex AI tasks may be interrupted.
            {showCountdown && (
              <div className="flex items-center gap-2 mt-2">
                <Clock className="h-3 w-3" />
                <span className="text-sm">Timeout warning: {countdown}s remaining</span>
              </div>
            )}
          </div>
          <button
            onClick={startCountdown}
            className="text-orange-600 hover:text-orange-800 text-sm underline ml-4"
          >
            Test Timeout
          </button>
        </div>
      </AlertDescription>
    </Alert>
  );
}