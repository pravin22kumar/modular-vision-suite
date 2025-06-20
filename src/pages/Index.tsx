
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { NLPModule } from "@/modules/NLPModule";
import { VisionModule } from "@/modules/VisionModule";
import { TimeSeriesModule } from "@/modules/TimeSeriesModule";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Eye, TrendingUp, Users, Database, Cpu, BarChart3, Bot } from "lucide-react";

const Index = () => {
  const [activeModule, setActiveModule] = useState("nlp");

  const renderModule = () => {
    switch (activeModule) {
      case "nlp":
        return <NLPModule />;
      case "vision":
        return <VisionModule />;
      case "timeseries":
        return <TimeSeriesModule />;
      case "recommendations":
        return <PlaceholderModule 
          title="Recommendation Systems" 
          icon={<Users className="w-6 h-6 text-white" />}
          description="Build personalized recommendation engines"
        />;
      case "dataprocessing":
        return <PlaceholderModule 
          title="Data Processing" 
          icon={<Database className="w-6 h-6 text-white" />}
          description="ETL pipelines and data transformation"
        />;
      case "deployment":
        return <PlaceholderModule 
          title="Model Deployment" 
          icon={<Cpu className="w-6 h-6 text-white" />}
          description="Deploy models to production"
        />;
      case "analytics":
        return <PlaceholderModule 
          title="Analytics Dashboard" 
          icon={<BarChart3 className="w-6 h-6 text-white" />}
          description="Monitor model performance and metrics"
        />;
      case "comparison":
        return <PlaceholderModule 
          title="Model Comparison" 
          icon={<Bot className="w-6 h-6 text-white" />}
          description="Compare different model architectures"
        />;
      default:
        return <NLPModule />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar activeModule={activeModule} onModuleChange={setActiveModule} />
        <main className="flex-1 flex flex-col">
          <div className="sticky top-0 z-10 flex items-center gap-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 border-b">
            <SidebarTrigger />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">AI Model Development Studio</span>
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            {renderModule()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

const PlaceholderModule = ({ title, icon, description }: { title: string; icon: React.ReactNode; description: string }) => (
  <div className="h-full p-6 flex items-center justify-center animate-fade-in">
    <Card className="border-dashed border-2 w-full max-w-2xl">
      <CardContent className="p-12 text-center">
        <div className="space-y-6">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            {icon}
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-muted-foreground text-lg mb-6">{description}</p>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              This module is coming soon! It will feature the same clean interface with:
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-4 bg-muted/50 rounded-lg">
                <strong>Data Upload</strong><br />
                Multi-format support
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <strong>Parameter Controls</strong><br />
                Dynamic configuration
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <strong>Output Analysis</strong><br />
                Charts & visualizations
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <strong>Model Integration</strong><br />
                Insert custom logic
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default Index;
