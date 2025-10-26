import { useState } from "react";

export function useCopyToClipboard() {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const copy = async (text: string) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard API not supported");
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setIsCopied(true);
      return true;
    } catch (error) {
      console.error("Failed to copy:", error);
      setIsCopied(false);
      return false;
    }
  };

  return { copy, copiedText, isCopied };
}
