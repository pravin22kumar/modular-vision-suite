
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  BarChart, 
  LineChart, 
  Activity, 
  MessageSquare, 
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp
} from "lucide-react";
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface OutputPanelProps {
  results?: {
    gptResponse?: string;
    metrics?: { [key: string]: number };
    chartData?: any[];
    status?: 'success' | 'error' | 'loading' | 'idle';
    processingTime?: number;
  };
  isLoading?: boolean;
}

const sampleChartData = [
  { name: 'Jan', value: 400, accuracy: 0.85 },
  { name: 'Feb', value: 300, accuracy: 0.88 },
  { name: 'Mar', value: 500, accuracy: 0.92 },
  { name: 'Apr', value: 280, accuracy: 0.87 },
  { name: 'May', value: 590, accuracy: 0.94 },
  { name: 'Jun', value: 320, accuracy: 0.89 },
];

const pieData = [
  { name: 'Positive', value: 400, color: '#10B981' },
  { name: 'Neutral', value: 300, color: '#F59E0B' },
  { name: 'Negative', value: 300, color: '#EF4444' },
];

export function OutputPanel({ results, isLoading }: OutputPanelProps) {
  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'loading':
        return <Clock className="w-4 h-4 text-yellow-500 animate-spin" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case 'success': return 'Completed';
      case 'error': return 'Failed';
      case 'loading': return 'Processing';
      default: return 'Ready';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="w-5 h-5" />
            Model Output & Analysis
          </CardTitle>
          <div className="flex items-center gap-2">
            {getStatusIcon(results?.status)}
            <Badge variant={results?.status === 'success' ? 'default' : 'secondary'}>
              {getStatusText(results?.status)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center space-y-4">
              <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
              <p className="text-muted-foreground">Processing your model...</p>
            </div>
          </div>
        ) : (
          <Tabs defaultValue="response" className="h-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="response" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Response
              </TabsTrigger>
              <TabsTrigger value="metrics" className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Metrics
              </TabsTrigger>
              <TabsTrigger value="charts" className="flex items-center gap-2">
                <BarChart className="w-4 h-4" />
                Charts
              </TabsTrigger>
              <TabsTrigger value="placeholder" className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Logic
              </TabsTrigger>
            </TabsList>

            <TabsContent value="response" className="mt-4">
              <Card>
                <CardContent className="p-4">
                  <ScrollArea className="h-64">
                    {results?.gptResponse ? (
                      <div className="prose prose-sm max-w-none dark:prose-invert">
                        <p>{results.gptResponse}</p>
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground py-8">
                        <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No response generated yet. Run your model to see results here.</p>
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="metrics" className="mt-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-green-500">94.2%</div>
                    <p className="text-sm text-muted-foreground">Accuracy</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-blue-500">0.89</div>
                    <p className="text-sm text-muted-foreground">F1 Score</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-purple-500">2.3s</div>
                    <p className="text-sm text-muted-foreground">Processing Time</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-orange-500">1,247</div>
                    <p className="text-sm text-muted-foreground">Samples Processed</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="charts" className="mt-4">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Performance Over Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <RechartsLineChart data={sampleChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="accuracy" 
                          stroke="#3B82F6" 
                          strokeWidth={2}
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Sample Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={200}>
                        <RechartsBarChart data={sampleChartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" fill="#3B82F6" />
                        </RechartsBarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Sentiment Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            outerRadius={60}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="placeholder" className="mt-4">
              <Card className="border-dashed border-2">
                <CardContent className="p-8 text-center">
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Activity className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold">Insert Model Logic Here</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      This is a placeholder for your custom model implementation. 
                      Connect your ML pipelines, algorithms, or API integrations here.
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Badge variant="outline">TensorFlow</Badge>
                      <Badge variant="outline">PyTorch</Badge>
                      <Badge variant="outline">Scikit-learn</Badge>
                      <Badge variant="outline">Custom API</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}
