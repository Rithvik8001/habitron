"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";

export function ProfileSettings() {
  const [username, setUsername] = useState("Rithvik");
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(username);

  const handleSave = () => {
    setUsername(newUsername);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <User className="h-5 w-5" />
          <CardTitle>Profile</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          {isEditing ? (
            <>
              <Input
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="max-w-[200px]"
                placeholder="Enter username"
              />
              <div className="flex gap-2">
                <Button onClick={handleSave} size="sm">
                  Save
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsEditing(false);
                    setNewUsername(username);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <span className="font-medium">{username}</span>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
