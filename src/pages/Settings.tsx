
import React from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings as SettingsIcon, Bell, Volume2, Clock, Wifi, Server } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been saved successfully.",
    });
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight mb-1">System Settings</h1>
        <p className="text-muted-foreground">
          Configure your sound system preferences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Volume2 className="h-5 w-5 text-harmony-secondary" />
              <CardTitle>Audio Settings</CardTitle>
            </div>
            <CardDescription>Configure your sound system volume and quality</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="master-volume">Master Volume</Label>
              <input
                id="master-volume"
                type="range"
                min="0"
                max="100"
                defaultValue="80"
                className="w-2/3"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="bell-volume">Bell Volume</Label>
              <input
                id="bell-volume"
                type="range"
                min="0"
                max="100"
                defaultValue="90"
                className="w-2/3"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="voice-volume">Voice Volume</Label>
              <input
                id="voice-volume"
                type="range"
                min="0"
                max="100"
                defaultValue="95"
                className="w-2/3"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="high-quality">High Quality Audio</Label>
              <Switch id="high-quality" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-harmony-secondary" />
              <CardTitle>Notification Settings</CardTitle>
            </div>
            <CardDescription>Configure system notifications and alerts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="schedule-notifications">Schedule Notifications</Label>
              <Switch id="schedule-notifications" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="system-status">System Status Alerts</Label>
              <Switch id="system-status" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="failure-alerts">Failure Alerts</Label>
              <Switch id="failure-alerts" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="emergency-override">Emergency Override</Label>
              <Switch id="emergency-override" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-harmony-secondary" />
              <CardTitle>Time Settings</CardTitle>
            </div>
            <CardDescription>Configure time zone and synchronization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-sync">Auto Sync with NTP</Label>
              <Switch id="auto-sync" defaultChecked />
            </div>

            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="timezone">Time Zone</Label>
              <select id="timezone" className="w-full p-2 border rounded">
                <option value="UTC">UTC</option>
                <option value="EST" selected>Eastern Time</option>
                <option value="CST">Central Time</option>
                <option value="MST">Mountain Time</option>
                <option value="PST">Pacific Time</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="24hour">Use 24-hour format</Label>
              <Switch id="24hour" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Server className="h-5 w-5 text-harmony-secondary" />
              <CardTitle>System Settings</CardTitle>
            </div>
            <CardDescription>Configure system behavior and functionality</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-startup">Auto-start on System Boot</Label>
              <Switch id="auto-startup" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="api-integration">Enable API Integration</Label>
              <Switch id="api-integration" />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="backup-daily">Daily Configuration Backup</Label>
              <Switch id="backup-daily" />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="diagnostics">Send Diagnostic Data</Label>
              <Switch id="diagnostics" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-3 mb-8">
        <Button variant="outline">Reset to Default</Button>
        <Button className="bg-harmony-secondary hover:bg-harmony-secondary/90" onClick={handleSave}>
          Save Settings
        </Button>
      </div>
    </Layout>
  );
};

export default Settings;
