import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from "react";

import type { QuoteChannel, QuoteDraftItem } from "../types";

interface QuoteContextValue {
  items: QuoteDraftItem[];
  itemCount: number;
  isPanelOpen: boolean;
  preferredChannel: QuoteChannel;
  addItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearItems: () => void;
  setPreferredChannel: (channel: QuoteChannel) => void;
  openPanel: () => void;
  closePanel: () => void;
  togglePanel: () => void;
}

const ITEMS_STORAGE_KEY = "torres_quote_items";
const CHANNEL_STORAGE_KEY = "torres_quote_channel";
const QuoteContext = createContext<QuoteContextValue | null>(null);

function getInitialItems() {
  const stored = window.localStorage.getItem(ITEMS_STORAGE_KEY);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored) as QuoteDraftItem[];
  } catch {
    return [];
  }
}

function getInitialChannel(): QuoteChannel {
  const stored = window.localStorage.getItem(CHANNEL_STORAGE_KEY);
  return stored === "sorocaba-fusiveis" ? "sorocaba-fusiveis" : "sorocaba-geral";
}

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteDraftItem[]>(getInitialItems);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [preferredChannel, setPreferredChannel] = useState<QuoteChannel>(getInitialChannel);

  useEffect(() => {
    window.localStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    window.localStorage.setItem(CHANNEL_STORAGE_KEY, preferredChannel);
  }, [preferredChannel]);

  const value: QuoteContextValue = {
    items,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    isPanelOpen,
    preferredChannel,
    addItem: (productId) => {
      setItems((currentItems) => {
        const existingItem = currentItems.find((item) => item.productId === productId);

        if (!existingItem) {
          return [...currentItems, { productId, quantity: 1 }];
        }

        return currentItems.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      });

      setIsPanelOpen(true);
    },
    setQuantity: (productId, quantity) => {
      setItems((currentItems) => {
        if (quantity <= 0) {
          return currentItems.filter((item) => item.productId !== productId);
        }

        return currentItems.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        );
      });
    },
    removeItem: (productId) => {
      setItems((currentItems) => currentItems.filter((item) => item.productId !== productId));
    },
    clearItems: () => {
      setItems([]);
    },
    setPreferredChannel,
    openPanel: () => setIsPanelOpen(true),
    closePanel: () => setIsPanelOpen(false),
    togglePanel: () => setIsPanelOpen((currentState) => !currentState)
  };

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote() {
  const context = useContext(QuoteContext);

  if (!context) {
    throw new Error("useQuote deve ser usado dentro de QuoteProvider");
  }

  return context;
}
