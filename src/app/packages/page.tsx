import { getPackages } from "@/api/package.api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function PackagesPage() {
  const packages = await getPackages().then((res) => res.data).catch(() => []);

  return (
    <div className="space-y-4">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Learning packages</CardTitle>S
          <CardDescription>Choose a package suited to your learning needs.</CardDescription>
        </CardHeader>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        {packages?.map((pkg) => (
          <Card key={pkg.id} className="shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{pkg.name}</CardTitle>
                <Badge variant="secondary">{pkg.sessions} sessions</Badge>
              </div>
              <CardDescription>{pkg.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Flexible access</span>
              <div className="text-right">
                <p className="text-lg font-semibold text-blue-600">${pkg.price}</p>
                <Button size="sm" className="mt-2">Buy now</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
