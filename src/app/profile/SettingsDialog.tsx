import React, { useState } from "react";
import { Dialog } from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { categories } from "@/app/components/ui/sidebar"; // Adjust import as needed

export function SettingsDialog({ open, onOpenChange, lockedCategories, setLockedCategories }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lockedCategories: string[];
  setLockedCategories: (cats: string[]) => void;
}) {
  const handleToggleCategory = (cat: string) => {
    setLockedCategories(
      lockedCategories.includes(cat)
        ? lockedCategories.filter(c => c !== cat)
        : [...lockedCategories, cat]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="p-6">
        <h3 className="text-lg font-bold mb-4">Settings</h3>
        <div className="mb-6">
          <h4 className="font-semibold mb-2">Parental Lock</h4>
          <p className="text-sm text-slate-400 mb-2">
            Select categories to lock. Locked categories will be hidden from navigation.
          </p>
          <div className="flex flex-col gap-2">
            {categories.map(cat => (
              <label key={cat.key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={lockedCategories.includes(cat.key)}
                  onChange={() => handleToggleCategory(cat.key)}
                />
                <span>{cat.label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </div>
    </Dialog>
  );
}