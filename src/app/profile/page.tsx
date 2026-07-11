"use client";

import { useEffect, useState } from "react";
import { getOwnProfile } from "@/api/profile.api";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { UserProfile } from "@/types/user";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    getOwnProfile()
      .then((response) => setProfile(response.data))
      .catch(() => setProfile(null));
  }, []);

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
              <Input placeholder="Full name" defaultValue={profile ? `${profile.firstName} ${profile.lastName}` : ""} className="mt-2" />
            </div>
            <div>
              <Label>Email</Label>
              <Input placeholder="Email" defaultValue={profile?.email ?? ""} className="mt-2" />
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex flex-wrap gap-2">
            <Button>Save changes</Button>
            <Button variant="outline">Reset</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
