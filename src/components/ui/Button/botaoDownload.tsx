import { useState } from "react";
import { Download, Loader2 } from "lucide-react";

export default function BotaoDownload() {
  const [carregando, setCarregando] = useState(false);

  async function baixar() {
    setCarregando(true);
    try {
      // lógica do download
    } finally {
      setCarregando(false);
    }
  }

  return (
    <button
      type="button"
      aria-label={carregando ? "Preparando download" : "Download"}
      aria-busy={carregando}
      disabled={carregando}
      onClick={baixar}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-(--tinta-4) bg-(--color-fundo-header) text-white transition-colors hover:border-(--color-border-clara) hover:bg-(--tinta-2) disabled:cursor-wait disabled:opacity-70 sm:h-9 sm:w-9"
    >
      {carregando ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Download className="h-4 w-4 text-amber-50" />
      )}
    </button>
  );
}