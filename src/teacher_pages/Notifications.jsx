import { DashboardLayout } from "@/teacher_components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/teacher_components/ui/card";
import { Badge } from "@/teacher_components/ui/badge";
import { Button } from "@/teacher_components/ui/button";
import { Bell, Trash2 } from "lucide-react";
import { useState } from "react";

const notificationsList = [
  {
    id: 1,
    type: "assignment",
    title: "New assignment submitted",
    message: "Sarah Johnson submitted 'Algebra Quiz 3'",
    timestamp: "5 minutes ago",
    read: false,
  },
  {
    id: 2,
    type: "meeting",
    title: "Meeting reminder",
    message: "Staff meeting in 30 minutes",
    timestamp: "25 minutes ago",
    read: false,
  },
  {
    id: 3,
    type: "grades",
    title: "Grade report ready",
    message: "Class 10-A report is ready for review",
    timestamp: "1 hour ago",
    read: false,
  },
  {
    id: 4,
    type: "attendance",
    title: "Low attendance alert",
    message: "Michael Chen has attendance below 75%",
    timestamp: "2 hours ago",
    read: true,
  },
  {
    id: 5,
    type: "assignment",
    title: "Assignment deadline approaching",
    message: "'Physics Project' deadline is in 2 days",
    timestamp: "3 hours ago",
    read: true,
  },
  {
    id: 6,
    type: "system",
    title: "System update completed",
    message: "Dashboard has been updated to v2.1.0",
    timestamp: "Yesterday",
    read: true,
  },
  {
    id: 7,
    type: "message",
    title: "New message from Admin",
    message: "Please review the new grading policy",
    timestamp: "Yesterday",
    read: true,
  },
  {
    id: 8,
    type: "grades",
    title: "Grades submitted",
    message: "Your submitted grades for Class 11-A",
    timestamp: "2 days ago",
    read: true,
  },
];

const getNotificationColor = (type) => {
  switch (type) {
    case "assignment":
      return "bg-blue-500/10 text-blue-600";
    case "meeting":
      return "bg-purple-500/10 text-purple-600";
    case "grades":
      return "bg-green-500/10 text-green-600";
    case "attendance":
      return "bg-orange-500/10 text-orange-600";
    case "message":
      return "bg-pink-500/10 text-pink-600";
    default:
      return "bg-gray-500/10 text-gray-600";
  }
};

const getNotificationIcon = (type) => {
  switch (type) {
    case "assignment":
      return "📝";
    case "meeting":
      return "📅";
    case "grades":
      return "📊";
    case "attendance":
      return "📍";
    case "message":
      return "💬";
    default:
      return "🔔";
  }
};

export default function Notifications() {
  const [notifications, setNotifications] = useState(notificationsList);

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <DashboardLayout pageTitle="Notifications">
      <div className="space-y-4">
        {/* Header with stats */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
          <div>
            <h2 className="text-lg font-semibold">All Notifications</h2>
            <p className="text-sm text-muted-foreground">
              {unreadCount > 0
                ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`
                : "No unread notifications"}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setNotifications(notifications.map((n) => ({ ...n, read: true })));
              }}
              className="text-xs sm:text-sm"
            >
              Mark all as read
            </Button>
          )}
        </div>

        {/* Notifications list */}
        <div className="space-y-2 sm:space-y-3">
          {notifications.length === 0 ? (
            <Card className="border-border/50">
              <CardContent className="p-6 sm:p-8 text-center">
                <Bell className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">No notifications</p>
              </CardContent>
            </Card>
          ) : (
            notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`border-border/50 transition-all ${
                  !notification.read ? "bg-primary/5" : ""
                }`}
              >
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0 ${getNotificationColor(
                        notification.type
                      )}`}
                    >
                      {getNotificationIcon(notification.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold text-xs sm:text-sm">
                            {notification.title}
                          </p>
                          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                            {notification.message}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1" />
                        )}
                      </div>

                      <p className="text-[10px] xs:text-xs text-muted-foreground mt-1 sm:mt-2">
                        {notification.timestamp}
                      </p>

                      <div className="flex items-center gap-2 mt-2 sm:mt-3">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="h-6 px-2 text-[10px] xs:text-xs sm:text-sm"
                          >
                            Mark as read
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          className="h-6 px-2 text-[10px] xs:text-xs sm:text-sm text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
