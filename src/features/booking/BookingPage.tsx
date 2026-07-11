import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

export default function BookingPage() {
  return (
    <div className="space-y-4">
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Book a session</CardTitle>
              <CardDescription>Choose a teacher, pick a time, and confirm your slot.</CardDescription>
            </div>
            <Badge variant="secondary">Next available</Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Session details</CardTitle>
            <CardDescription>Fill in your preferred tutor and package.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Teacher</Label>
                <Select defaultValue="maya" className="mt-2">
                  <option value="maya">Maya Chen</option>
                  <option value="david">David Kim</option>
                  <option value="sofia">Sofia Patel</option>
                </Select>
              </div>
              <div>
                <Label>Package</Label>
                <Select defaultValue="premium" className="mt-2">
                  <option value="premium">Premium</option>
                  <option value="intensive">Intensive</option>
                  <option value="starter">Starter</option>
                </Select>
              </div>
            </div>
            <div>
              <Label>Preferred date</Label>
              <Input type="date" className="mt-2" />
            </div>
            <div>
              <Label>Notes</Label>
              <Input placeholder="Share goals or topics" className="mt-2" />
            </div>
            <Button className="w-full">Confirm booking</Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>What you get</CardTitle>
            <CardDescription>Everything included with your booking.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-600">
            <div className="rounded-xl border border-slate-200 p-3">60-minute live session</div>
            <div className="rounded-xl border border-slate-200 p-3">Personalized learning plan</div>
            <div className="rounded-xl border border-slate-200 p-3">Session recap and notes</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
