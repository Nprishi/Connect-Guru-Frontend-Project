/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { getOwnProfile } from "@/api/profile.api";
import { useAuthStore } from "@/store/useAuthStore";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { UserProfile } from "@/types/user";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);
  const [profile, setProfile] = useState<UserProfile | null>(user ?? null);
  const [name, setName] = useState<string>(user ? `${user.firstName} ${user.lastName}` : "");
  const [email, setEmail] = useState<string>(user?.email ?? "");

  useEffect(() => {
    if (user) {
      setProfile(user);
      setName(`${user.firstName} ${user.lastName}`);
      setEmail(user.email);
      return;
    }

    getOwnProfile()
      .then((response) => {
        setProfile(response.data);
        setName(`${response.data.firstName} ${response.data.lastName}`);
        setEmail(response.data.email);
      })
      .catch(() => setProfile(null));
  }, [user]);

  function handleSave() {
    if (!profile) {
      return;
    }

    const [firstName, ...rest] = name.trim().split(" ");
    const lastName = rest.join(" ");

    const updatedProfile = {
      ...profile,
      firstName,
      lastName,
      email,
    };

    setProfile(updatedProfile);
    updateUser({ firstName, lastName, email });
  }

  function handleReset() {
    if (!profile) {
      return;
    }

    setName(`${profile.firstName} ${profile.lastName}`);
    setEmail(profile.email);
  }

  const initials = profile ? `${profile.firstName?.[0] ?? ""}${profile.lastName?.[0] ?? ""}` : "U";
  const fullName = profile ? `${profile.firstName} ${profile.lastName}` : "Your profile";
  const roleLabel = profile?.role ?? "Member";

  return (
    <div className="space-y-4">
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-14 w-14">
                <AvatarFallback>{profile ? `${profile.firstName?.[0] ?? ""}${profile.lastName?.[0] ?? ""}` : "U"}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{profile ? `${profile.firstName} ${profile.lastName}` : "Your profile"}</CardTitle>
                <CardDescription>{profile?.email ?? "Update your details and preferences"}</CardDescription>
              </div>
            </div>
            <Badge variant="secondary">{profile?.role ?? "Member"}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Full name</Label>
              <Input
                placeholder="Full name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2"
              />
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleSave}>Save changes</Button>
            <Button variant="outline" onClick={handleReset}>Reset</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
