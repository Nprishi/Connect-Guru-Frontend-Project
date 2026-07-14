import { ArrowRight, Eye, Star, User, Users } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const students = [
  { name: "Maya Singh", email: "maya.singh@example.com", status: "Active", joined: "2026-04-16" },
  { name: "Noah Williams", email: "noah.williams@example.com", status: "Pending", joined: "2026-05-01" },
  { name: "Sophia Brown", email: "sophia.brown@example.com", status: "Active", joined: "2026-03-28" },
  { name: "Liam Johnson", email: "liam.johnson@example.com", status: "Paused", joined: "2026-02-10" },
];

const teachers = [
  { name: "Jasmine Lee", subject: "Mathematics", rating: "4.9", status: "Verified" },
  { name: "Ethan Patel", subject: "Physics", rating: "4.8", status: "Active" },
  { name: "Avery Chen", subject: "English", rating: "4.7", status: "Interview" },
  { name: "Noah Morgan", subject: "Biology", rating: "4.8", status: "Verified" },
];

const hires = [
  { student: "Maya Singh", teacher: "Jasmine Lee", package: "Premium Math", status: "Awaiting", date: "2026-05-12" },
  { student: "Liam Johnson", teacher: "Ethan Patel", package: "Physics Boost", status: "Confirmed", date: "2026-05-10" },
  { student: "Sophia Brown", teacher: "Avery Chen", package: "Essay Review", status: "Pending", date: "2026-05-09" },
];

const transactions = [
  { id: "TXN-9812", user: "Maya Singh", amount: "$320", method: "Card", status: "Paid" },
  { id: "TXN-9704", user: "Noah Williams", amount: "$210", method: "PayPal", status: "Refunded" },
  { id: "TXN-9645", user: "Avery Chen", amount: "$480", method: "Card", status: "Paid" },
];

const statusColors: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Paused: "bg-slate-100 text-slate-700",
  Verified: "bg-blue-100 text-blue-700",
  Confirmed: "bg-emerald-100 text-emerald-700",
  Awaiting: "bg-amber-100 text-amber-700",
  Paid: "bg-emerald-100 text-emerald-700",
  Refunded: "bg-rose-100 text-rose-700",
};

export function AdminTablesSection() {
  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between px-6 py-6">
          <div>
            <CardTitle className="text-lg">Recent Students</CardTitle>
            <p className="text-sm text-slate-500">A quick view of new learner signups.</p>
          </div>
          <Button variant="outline" size="sm" className="mt-2 sm:mt-0">
            View all
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Avatar</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.email}>
                    <TableCell>
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>{student.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${statusColors[student.status]}`}>
                        {student.status}
                      </span>
                    </TableCell>
                    <TableCell>{student.joined}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="icon" className="h-9 w-9 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between px-6 py-6">
          <div>
            <CardTitle className="text-lg">Recent Teachers</CardTitle>
            <p className="text-sm text-slate-500">Latest educators joining the platform.</p>
          </div>
          <Button variant="outline" size="sm" className="mt-2 sm:mt-0">
            Manage
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Avatar</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teachers.map((teacher) => (
                  <TableRow key={teacher.name}>
                    <TableCell>
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>{teacher.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>{teacher.name}</TableCell>
                    <TableCell>{teacher.subject}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-amber-500" />
                      {teacher.rating}
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${statusColors[teacher.status]}`}>
                        {teacher.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="icon" className="h-9 w-9 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between px-6 py-6">
          <div>
            <CardTitle className="text-lg">Recent Hire Requests</CardTitle>
            <p className="text-sm text-slate-500">Hire requests waiting for admin approval.</p>
          </div>
          <Button variant="outline" size="sm" className="mt-2 sm:mt-0">
            Review
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Package</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hires.map((request) => (
                  <TableRow key={`${request.student}-${request.teacher}`}>
                    <TableCell>{request.student}</TableCell>
                    <TableCell>{request.teacher}</TableCell>
                    <TableCell>{request.package}</TableCell>
                    <TableCell>
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${statusColors[request.status]}`}>
                        {request.status}
                      </span>
                    </TableCell>
                    <TableCell>{request.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between px-6 py-6">
          <div>
            <CardTitle className="text-lg">Recent Transactions</CardTitle>
            <p className="text-sm text-slate-500">Snapshot of the latest payment activity.</p>
          </div>
          <Button variant="outline" size="sm" className="mt-2 sm:mt-0">
            Reports
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.id}</TableCell>
                    <TableCell>{transaction.user}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>{transaction.method}</TableCell>
                    <TableCell>
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${statusColors[transaction.status]}`}>
                        {transaction.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
