
import { Brain, Database, Eye, TrendingUp, Users, Bot, Cpu, BarChart3, Settings, Moon, Sun } from "lucide-react";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

const modules = [
  {
    title: "Natural Language Processing",
    icon: Brain,
    id: "nlp",
    description: "Text analysis, sentiment, and language models"
  },
  {
    title: "Computer Vision",
    icon: Eye,
    id: "vision",
    description: "Image processing and recognition"
  },
  {
    title: "Time Series Analysis",
    icon: TrendingUp,
    id: "timeseries",
    description: "Forecasting and temporal patterns"
  },
  {
    title: "Recommendation Systems",
    icon: Users,
    id: "recommendations",
    description: "Personalization and content filtering"
  },
  {
    title: "Data Processing",
    icon: Database,
    id: "dataprocessing",
    description: "ETL, cleaning, and transformation"
  },
  {
    title: "Model Deployment",
    icon: Cpu,
    id: "deployment",
    description: "Production deployment and monitoring"
  },
];

const tools = [
  {
    title: "Analytics Dashboard",
    icon: BarChart3,
    id: "analytics"
  },
  {
    title: "Model Comparison",
    icon: Bot,
    id: "comparison"
  },
];

interface AppSidebarProps {
  activeModule: string;
  onModuleChange: (moduleId: string) => void;
}

export function AppSidebar({ activeModule, onModuleChange }: AppSidebarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <Sidebar className="border-r bg-sidebar">
      <SidebarHeader className="p-6 border-b">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-sidebar-foreground">AI Studio</h1>
            <p className="text-xs text-sidebar-foreground/60">Model Development</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-sidebar-foreground/70 mb-2">
            AI Modules
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {modules.map((module) => (
                <SidebarMenuItem key={module.id}>
                  <SidebarMenuButton
                    onClick={() => onModuleChange(module.id)}
                    className={`w-full justify-start h-auto p-3 rounded-lg transition-all duration-200 ${
                      activeModule === module.id
                        ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                        : "hover:bg-sidebar-accent/50"
                    }`}
                  >
                    <module.icon className="w-4 h-4 mr-3 flex-shrink-0" />
                    <div className="text-left">
                      <div className="text-sm font-medium">{module.title}</div>
                      <div className="text-xs text-sidebar-foreground/60 mt-0.5">
                        {module.description}
                      </div>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-xs font-medium text-sidebar-foreground/70 mb-2">
            Tools
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {tools.map((tool) => (
                <SidebarMenuItem key={tool.id}>
                  <SidebarMenuButton
                    onClick={() => onModuleChange(tool.id)}
                    className={`w-full justify-start p-3 rounded-lg transition-all duration-200 ${
                      activeModule === tool.id
                        ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                        : "hover:bg-sidebar-accent/50"
                    }`}
                  >
                    <tool.icon className="w-4 h-4 mr-3" />
                    <span className="text-sm font-medium">{tool.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="w-auto px-3"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 mr-2" />
            ) : (
              <Moon className="w-4 h-4 mr-2" />
            )}
            {theme === 'dark' ? 'Light' : 'Dark'}
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
