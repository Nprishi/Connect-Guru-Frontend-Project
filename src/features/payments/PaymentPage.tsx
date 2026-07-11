import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PaymentPage() {
  return (
    <div className="space-y-4">
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Payments</CardTitle>
              <CardDescription>Secure checkout for your selected package.</CardDescription>
            </div>
            <Badge variant="secondary">Protected</Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Payment details</CardTitle>
            <CardDescription>Enter card information to complete checkout.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Cardholder name</Label>
              <Input placeholder="Alex Johnson" className="mt-2" />
            </div>
            <div>
              <Label>Card number</Label>
              <Input placeholder="4242 4242 4242 4242" className="mt-2" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Expiry</Label>
                <Input placeholder="MM/YY" className="mt-2" />
              </div>
              <div>
                <Label>CVC</Label>
                <Input placeholder="123" className="mt-2" />
              </div>
            </div>
            <Button className="w-full">Pay now</Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Order summary</CardTitle>
            <CardDescription>Review the package before paying.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-600">
            <div className="flex items-center justify-between">
              <span>Premium package</span>
              <span className="font-semibold text-slate-900">$99</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Tax</span>
              <span>$8</span>
            </div>
            <div className="flex items-center justify-between border-t pt-3 font-semibold text-slate-900">
              <span>Total</span>
              <span>$107</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
