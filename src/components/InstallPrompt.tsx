import { useState, useEffect } from "react";

const InstallPrompt = () => {
  const [show, setShow] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Suppress if already installed as PWA (standalone mode)
    const isInstalled =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as any).standalone === true;

    if (isInstalled) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setTimeout(() => setShow(true), 3000);
    };
    window.addEventListener("beforeinstallprompt", handler as EventListener);
    return () => window.removeEventListener("beforeinstallprompt", handler as EventListener);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="install-prompt-card animate-slide-in-right">
      <h3 className="text-base font-semibold text-foreground mb-2">
        📱 Install GCC Playbook
      </h3>
      <p className="text-sm text-muted-foreground mb-3">
        Access the playbook offline, anytime, anywhere.
      </p>
      <button
        onClick={handleInstall}
        className="expand-button w-full text-sm"
      >
        Install Now
      </button>
      <button
        onClick={() => setShow(false)}
        className="w-full mt-2 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      >
        Maybe Later
      </button>
    </div>
  );
};

export default InstallPrompt;
