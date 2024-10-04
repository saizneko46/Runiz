import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, Trash2 } from 'lucide-react';

const generateDummyData = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    uptime: Math.random() > 0.1 ? 100 : 0,
  }));
};

const UptimeMonitorDashboard = () => {
  const [monitors, setMonitors] = useState([
    { id: 1, name: 'Website 1', url: 'https://website1.com', status: 'up' },
    { id: 2, name: 'API Server', url: 'https://api.example.com', status: 'down' },
    { id: 3, name: 'Database', url: 'db.example.com', status: 'up' },
  ]);

  const [selectedMonitor, setSelectedMonitor] = useState(null);
  const [uptimeData, setUptimeData] = useState([]);

  useEffect(() => {
    if (selectedMonitor) {
      setUptimeData(generateDummyData());
    }
  }, [selectedMonitor]);

  const addMonitor = () => {
    const newMonitor = {
      id: monitors.length + 1,
      name: `New Monitor ${monitors.length + 1}`,
      url: 'https://example.com',
      status: 'up',
    };
    setMonitors([...monitors, newMonitor]);
  };

  const removeMonitor = (id) => {
    setMonitors(monitors.filter(monitor => monitor.id !== id));
    if (selectedMonitor && selectedMonitor.id === id) {
      setSelectedMonitor(null);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Uptime Monitor Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {monitors.map((monitor) => (
          <Card key={monitor.id} className="cursor-pointer" onClick={() => setSelectedMonitor(monitor)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {monitor.name}
              </CardTitle>
              <Badge variant={monitor.status === 'up' ? 'success' : 'destructive'}>
                {monitor.status.toUpperCase()}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">{monitor.url}</div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={(e) => {
                  e.stopPropagation();
                  removeMonitor(monitor.id);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
        <Card className="flex items-center justify-center cursor-pointer" onClick={addMonitor}>
          <Plus className="h-8 w-8 text-muted-foreground" />
        </Card>
      </div>
      {selectedMonitor && (
        <Card>
          <CardHeader>
            <CardTitle>{selectedMonitor.name} - Uptime Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={uptimeData}>
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="stepAfter" dataKey="uptime" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UptimeMonitorDashboard;
