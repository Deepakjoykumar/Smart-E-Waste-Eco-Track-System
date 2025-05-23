
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define types
export type WasteItem = {
  id: string;
  name: string;
  type: string;
  description: string;
  image: string;
  status: "collected" | "processing" | "recycled" | "component-extraction";
  dateCollected: Date;
  estimatedValue: number;
  components?: string[];
};

type WasteContextType = {
  wasteItems: WasteItem[];
  addWasteItem: (item: Omit<WasteItem, "id" | "dateCollected" | "status">) => void;
  updateWasteStatus: (id: string, status: WasteItem["status"]) => void;
  getWasteById: (id: string) => WasteItem | undefined;
};

const WasteContext = createContext<WasteContextType | undefined>(undefined);

export const WasteProvider = ({ children }: { children: ReactNode }) => {
  const [wasteItems, setWasteItems] = useState<WasteItem[]>([
    // Sample data
    {
      id: "1",
      name: "Old Laptop",
      type: "Computer",
      description: "Dell XPS 13, 5 years old",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      status: "collected",
      dateCollected: new Date(2023, 4, 15),
      estimatedValue: 45.50,
      components: ["CPU", "RAM", "SSD", "Battery"]
    },
    {
      id: "2",
      name: "Broken Smartphone",
      type: "Mobile",
      description: "iPhone 11, cracked screen",
      image: "https://images.unsplash.com/photo-1585909695284-32d2985ac9c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      status: "processing",
      dateCollected: new Date(2023, 5, 10),
      estimatedValue: 28.75,
      components: ["CPU", "Camera", "Battery"]
    },
    {
      id: "3",
      name: "Old Monitor",
      type: "Display",
      description: "Samsung 24-inch LCD",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
      status: "recycled",
      dateCollected: new Date(2023, 5, 25),
      estimatedValue: 15.20,
      components: ["LCD Panel", "Circuit Board"]
    }
  ]);

  const addWasteItem = (item: Omit<WasteItem, "id" | "dateCollected" | "status">) => {
    const newItem: WasteItem = {
      ...item,
      id: Date.now().toString(),
      dateCollected: new Date(),
      status: "collected"
    };
    setWasteItems([...wasteItems, newItem]);
  };

  const updateWasteStatus = (id: string, status: WasteItem["status"]) => {
    setWasteItems(
      wasteItems.map(item => (item.id === id ? { ...item, status } : item))
    );
  };

  const getWasteById = (id: string) => {
    return wasteItems.find(item => item.id === id);
  };

  return (
    <WasteContext.Provider value={{ wasteItems, addWasteItem, updateWasteStatus, getWasteById }}>
      {children}
    </WasteContext.Provider>
  );
};

export const useWaste = () => {
  const context = useContext(WasteContext);
  if (context === undefined) {
    throw new Error("useWaste must be used within a WasteProvider");
  }
  return context;
};
