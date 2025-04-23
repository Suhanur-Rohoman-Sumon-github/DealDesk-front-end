"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, CreditCard, Mail,  } from "lucide-react";
import { useUser } from "@/context/userProvider";
import { FaTelegram, FaTelegramPlane } from "react-icons/fa";

const Profile = () => {
  const { user } = useUser();
  return (
    <div className="space-y-6 p-4 md:p-6 text-white">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Profile Card */}
        <Card className=" md:col-span-1 backdrop-blur-md bg-[#1f1b37]/90 lg:bg-white/5 border-r border-white/10 text-white">
          <CardHeader className="pb-4">
            <CardTitle>Profile</CardTitle>
            <CardDescription>Manage your public information</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4 text-white">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user?.profilePicture} />
                <AvatarFallback>{user?.name}</AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="outline"
                className="absolute bottom-0 right-0 rounded-full bg-background"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-center text-white">
              <h3 className="text-xl font-semibold">{user?.name}</h3>
            </div>
            <div className="w-full space-y-3">
              {/* Email */}
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user?.email}</span>
              </div>

              {/* Telegram ID */}
              <div className="flex items-center gap-2">
                <FaTelegram className="h-4 w-4 text-[#0088cc]" />
                <a
                  href="https://t.me/yourTelegramUsername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:underline"
                >
                  @yourTelegramUsername
                </a>
              </div>

              {/* Telegram Channel */}
              <div className="flex items-center gap-2">
                <FaTelegramPlane className="h-4 w-4 text-[#0088cc]" />
                <a
                  href="https://t.me/yourTelegramChannel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:underline"
                >
                  t.me/yourTelegramChannel
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Tabs */}
        <Card className="glass-card md:col-span-2 backdrop-blur-md bg-[#1f1b37]/90 lg:bg-white/5 border-r border-white/10 text-white">
          <Tabs defaultValue="account">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Account Settings</CardTitle>
                <TabsList>
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="billing">Billing</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>

            <CardContent>
              <TabsContent value="account" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Jane Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="jane.doe@example.com" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" type="date" defaultValue="1990-04-15" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" defaultValue="123 Broadway Ave" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" defaultValue="New York" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" defaultValue="NY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">Zip Code</Label>
                    <Input id="zip" defaultValue="10001" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="security" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current">Current Password</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new">New Password</Label>
                  <Input id="new" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm">Confirm Password</Label>
                  <Input id="confirm" type="password" />
                </div>
              </TabsContent>

              <TabsContent value="billing" className="space-y-4">
                <div className="flex items-center gap-4 p-3 border rounded-lg">
                  <CreditCard className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-sm text-muted-foreground">
                      Expires 04/2026
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Add Payment Method
                </Button>
              </TabsContent>
            </CardContent>

            <CardFooter className="flex justify-end">
              <Button>Save Changes</Button>
            </CardFooter>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
