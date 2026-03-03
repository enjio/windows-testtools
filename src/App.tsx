/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  MemoryStick, 
  Settings, 
  HelpCircle, 
  LayoutDashboard, 
  PlayCircle, 
  BarChart3, 
  Info, 
  FileText, 
  Wifi, 
  Palette, 
  Activity, 
  Bluetooth, 
  RefreshCw, 
  Play, 
  Clock, 
  Search, 
  Filter, 
  Download, 
  MoreVertical, 
  ChevronLeft, 
  ChevronRight,
  Cpu,
  HardDrive,
  Battery,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

type View = 'individual-test' | 'automation' | 'history' | 'system-info' | 'real-time-logs' | 'hardware-config';

interface LogEntry {
  id: string;
  timestamp: string;
  module: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  description: string;
}

// --- Mock Data ---

const MOCK_LOGS: LogEntry[] = [
  { id: '1', timestamp: '2023-10-27 10:15:02', module: 'EngineControl', level: 'INFO', description: '系统初始化完成，所有子模块已成功启动。' },
  { id: '2', timestamp: '2023-10-27 10:16:45', module: 'SensorModule', level: 'WARN', description: '传感器响应延迟 > 50ms。当前负载: 78%' },
  { id: '3', timestamp: '2023-10-27 10:17:12', module: 'NetworkStack', level: 'ERROR', description: '无法连接到远程服务器: ERR_CONNECTION_REFUSED' },
  { id: '4', timestamp: '2023-10-27 10:18:00', module: 'PowerManager', level: 'INFO', description: '电池状态正常：正在使用外部电源充电中' },
  { id: '5', timestamp: '2023-10-27 10:19:33', module: 'EngineControl', level: 'ERROR', description: '关键运行参数超出预设安全范围 (Threshold: 4500rpm)' },
  { id: '6', timestamp: '2023-10-27 10:20:15', module: 'UI_Module', level: 'DEBUG', description: '日志列表已刷新，加载 150 条新记录。' },
];

// --- Components ---

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  active, 
  onClick 
}: { 
  icon: any, 
  label: string, 
  active?: boolean, 
  onClick: () => void 
}) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
      active 
        ? 'bg-primary text-white shadow-lg shadow-primary/20' 
        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
    }`}
  >
    <Icon size={18} />
    <span className="text-sm font-medium">{label}</span>
  </button>
);

const Card = ({ children, title, subtitle, icon: Icon, enabled, onToggle }: any) => (
  <div className="bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
    <div className="flex items-start justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <Icon size={20} />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 dark:text-slate-100">{title}</h3>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input 
          type="checkbox" 
          className="sr-only peer" 
          checked={enabled} 
          onChange={onToggle}
        />
        <div className="w-11 h-6 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
      </label>
    </div>
    <div className={`space-y-4 transition-opacity ${enabled ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
      {children}
    </div>
  </div>
);

// --- Views ---

const IndividualTestView = () => {
  const [activeTab, setActiveTab] = useState('common');
  const [configs, setConfigs] = useState({
    wifi: true,
    screen: false,
    audio: true,
    bluetooth: false
  });

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100 font-display">个体测试</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">选择特定的硬件模块进行精准化性能测试与校准</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors font-medium text-sm text-slate-700 dark:text-slate-200">
            <RefreshCw size={14} /> 重置配置
          </button>
          <button className="flex items-center gap-2 px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors font-bold shadow-lg shadow-primary/30">
            <Play size={16} fill="currentColor" /> 开始测试
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-6 border-b border-slate-200 dark:border-slate-800">
        {['常用测试', '通信模块', '显示与音频', '传感器'].map((tab, i) => {
          const id = ['common', 'comm', 'display', 'sensor'][i];
          return (
            <button 
              key={id}
              onClick={() => setActiveTab(id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === id 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card 
          title="Wi-Fi 扫描测试" 
          subtitle="检测信号强度与频段稳定性" 
          icon={Wifi}
          enabled={configs.wifi}
          onToggle={() => setConfigs(prev => ({ ...prev, wifi: !prev.wifi }))}
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-500">扫描频段</label>
            <select className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm p-2 outline-none focus:ring-1 focus:ring-primary text-slate-900 dark:text-slate-100">
              <option>2.4GHz + 5GHz (混合模式)</option>
              <option>仅 2.4GHz</option>
              <option>仅 5GHz</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm dark:text-slate-300">启用详细包检测</span>
            <input type="checkbox" className="w-4 h-4 text-primary bg-slate-100 border-slate-300 rounded focus:ring-primary" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm dark:text-slate-300">连续扫描模式</span>
            <input type="checkbox" defaultChecked className="w-4 h-4 text-primary bg-slate-100 border-slate-300 rounded focus:ring-primary" />
          </div>
        </Card>

        <Card 
          title="屏幕显色模式" 
          subtitle="坏点检测与伽马值校准" 
          icon={Palette}
          enabled={configs.screen}
          onToggle={() => setConfigs(prev => ({ ...prev, screen: !prev.screen }))}
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-500">自动切换间隔 (毫秒)</label>
            <input type="number" placeholder="2000" className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm p-2 outline-none focus:ring-1 focus:ring-primary text-slate-900 dark:text-slate-100" />
          </div>
          <div className="grid grid-cols-5 gap-2">
            <div className="h-8 rounded bg-red-500 border border-white/20"></div>
            <div className="h-8 rounded bg-green-500 border border-white/20"></div>
            <div className="h-8 rounded bg-blue-500 border border-white/20"></div>
            <div className="h-8 rounded bg-white border border-slate-200"></div>
            <div className="h-8 rounded bg-black border border-white/20"></div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm dark:text-slate-300">最大亮度强制开启</span>
            <input type="checkbox" defaultChecked className="w-4 h-4 text-primary bg-slate-100 border-slate-300 rounded focus:ring-primary" />
          </div>
        </Card>

        <Card 
          title="音频频响测试" 
          subtitle="扬声器与麦克风回路测试" 
          icon={Activity}
          enabled={configs.audio}
          onToggle={() => setConfigs(prev => ({ ...prev, audio: !prev.audio }))}
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-500">目标频率 (Hz)</label>
            <div className="flex items-center gap-4">
              <input type="range" className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary" />
              <span className="text-xs font-mono w-12 text-right dark:text-slate-300">1000</span>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-500">采样率</label>
            <select className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm p-2 outline-none focus:ring-1 focus:ring-primary text-slate-900 dark:text-slate-100">
              <option>44.1 kHz</option>
              <option>48.0 kHz</option>
              <option>96.0 kHz</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm dark:text-slate-300">双声道独立控制</span>
            <input type="checkbox" className="w-4 h-4 text-primary bg-slate-100 border-slate-300 rounded focus:ring-primary" />
          </div>
        </Card>

        <Card 
          title="蓝牙配对测试" 
          subtitle="低功耗蓝牙 (BLE) 扫描与发现" 
          icon={Bluetooth}
          enabled={configs.bluetooth}
          onToggle={() => setConfigs(prev => ({ ...prev, bluetooth: !prev.bluetooth }))}
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-500">信号阈值 (dBm)</label>
            <input type="number" placeholder="-80" className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm p-2 outline-none focus:ring-1 focus:ring-primary text-slate-900 dark:text-slate-100" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm dark:text-slate-300">自动配对请求</span>
            <input type="checkbox" className="w-4 h-4 text-primary bg-slate-100 border-slate-300 rounded focus:ring-primary" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm dark:text-slate-300">忽略已知设备</span>
            <input type="checkbox" defaultChecked className="w-4 h-4 text-primary bg-slate-100 border-slate-300 rounded focus:ring-primary" />
          </div>
        </Card>
      </div>

      <div className="mt-8 bg-slate-100 dark:bg-slate-800/40 rounded-lg p-4 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-medium text-slate-500">硬件状态: 正常</span>
          </div>
          <div className="h-4 w-[1px] bg-slate-300 dark:bg-slate-700"></div>
          <div className="text-xs text-slate-500">已选测试项: <span className="text-primary font-bold">3</span> / 12</div>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Clock size={14} />
          预计耗时: 约 45 秒
        </div>
      </div>
    </div>
  );
};

const SystemLogsView = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg bg-primary text-white">
            <FileText size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100 font-display">系统日志</h1>
            <p className="text-xs text-slate-500">工程模式 v2.4.0 • 实时诊断</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors font-medium text-sm text-slate-700 dark:text-slate-200">
            <Download size={14} /> 导出日志
          </button>
          <button className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            <Settings size={20} />
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2">
            {['全部级别', '信息 (INFO)', '警告 (WARN)', '错误 (ERROR)', '调试 (DEBUG)'].map((label, i) => (
              <button 
                key={label}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                  i === 0 
                    ? 'bg-primary/20 text-primary border border-primary/30' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input 
                type="text" 
                placeholder="搜索日志内容..." 
                className="pl-9 pr-4 py-1.5 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-xs w-64 focus:ring-1 focus:ring-primary text-slate-900 dark:text-slate-100"
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs text-slate-600 dark:text-slate-400">
              <Clock size={14} /> 最近 24 小时
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs text-slate-600 dark:text-slate-400">
              <Filter size={14} /> 高级筛选
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                <th className="px-6 py-4">时间戳</th>
                <th className="px-6 py-4">模块名称</th>
                <th className="px-6 py-4">日志级别</th>
                <th className="px-6 py-4">描述</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {MOCK_LOGS.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 text-xs font-mono text-slate-500">{log.timestamp}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-mono text-slate-700 dark:text-slate-300">
                      {log.module}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      log.level === 'INFO' ? 'bg-green-500/10 text-green-500' :
                      log.level === 'WARN' ? 'bg-yellow-500/10 text-yellow-500' :
                      log.level === 'ERROR' ? 'bg-red-500/10 text-red-500' :
                      'bg-blue-500/10 text-blue-500'
                    }`}>
                      {log.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-600 dark:text-slate-400">{log.description}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-primary">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <div>显示 1-6 条，共 2,430 条记录</div>
          <div className="flex gap-1">
            <button className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800"><ChevronLeft size={14} /></button>
            <button className="w-7 h-7 flex items-center justify-center rounded bg-primary text-white font-bold">1</button>
            <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-800">2</button>
            <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-800">3</button>
            <span className="px-1 self-center">...</span>
            <button className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800"><ChevronRight size={14} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

const HardwareConfigView = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MemoryStick className="text-primary" size={28} />
          <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100 font-display uppercase">硬件配置 <span className="text-xs font-normal text-slate-500 ml-2">Engineering Mode v4.2</span></h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 bg-green-500/10 text-green-500 text-xs font-bold rounded border border-green-500/20">状态: 正常</div>
          <button className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            <RefreshCw size={20} className="text-slate-500" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* CPU & GPU */}
          <div className="bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">核心处理器 (CPU) & 图形处理 (GPU)</h3>
              <span className="text-[10px] text-slate-500">实时温度: 42°C</span>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest">处理器架构</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">型号</span>
                    <span className="font-medium">Intel Core i9-13900H</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">核心/线程</span>
                    <span className="font-medium">14 Cores / 20 Threads</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">指令集</span>
                    <span className="font-medium">x86-64, AVX-512</span>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[28%]"></div>
                  </div>
                  <div className="flex justify-between mt-1 text-[10px] text-slate-500 font-mono">
                    <span>LOAD: 28% @ 4.2GHZ</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest">显卡信息</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">适配器</span>
                    <span className="font-medium">NVIDIA RTX 4070 Laptop</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">显存频率</span>
                    <span className="font-medium">8GB GDDR6</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">驱动版本</span>
                    <span className="font-medium">535.104.05</span>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[15%]"></div>
                  </div>
                  <div className="flex justify-between mt-1 text-[10px] text-slate-500 font-mono">
                    <span>VRAM USAGE: 1.1GB / 8GB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Storage */}
          <div className="bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <HardDrive size={18} className="text-primary" />
                <h3 className="font-bold text-slate-900 dark:text-slate-100">存储状态 (S.M.A.R.T)</h3>
              </div>
              <button className="text-[10px] text-primary font-bold hover:underline">导出报告</button>
            </div>
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-500 border-b border-slate-100 dark:border-slate-800">
                  <th className="pb-3 font-medium">参数项目</th>
                  <th className="pb-3 font-medium">当前值</th>
                  <th className="pb-3 font-medium">阈值</th>
                  <th className="pb-3 font-medium">状态</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                {[
                  { id: '01', name: '读取错误率', value: '100', threshold: '50', status: '优' },
                  { id: '05', name: '重映射扇区计数', value: '0', threshold: '10', status: '优' },
                  { id: '09', name: '通电时间计数', value: '1240 小时', threshold: '-', status: '正常' },
                  { id: 'BE', name: '气流温度', value: '34°C', threshold: '60', status: '优' },
                ].map(item => (
                  <tr key={item.id} className="text-slate-700 dark:text-slate-300">
                    <td className="py-3">{item.id} {item.name}</td>
                    <td className="py-3 font-mono">{item.value}</td>
                    <td className="py-3 font-mono">{item.threshold}</td>
                    <td className="py-3">
                      <span className={`inline-flex items-center gap-1 ${item.status === '优' ? 'text-green-500' : 'text-blue-500'}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          {/* RAM */}
          <div className="bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Cpu size={18} className="text-primary" />
              <h3 className="font-bold text-slate-900 dark:text-slate-100">内存模块 (RAM)</h3>
            </div>
            <div className="space-y-4">
              {[1, 2].map(i => (
                <div key={i} className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-bold text-primary uppercase">DIMM {i}</span>
                    <span className="text-[10px] px-1.5 py-0.5 bg-green-500/10 text-green-500 rounded font-bold">活跃</span>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-bold">Samsung 16GB DDR5</div>
                    <div className="text-[10px] text-slate-500">序列号: SAMS-5629-DDR5-X</div>
                  </div>
                  <div className="flex justify-between mt-3 text-[10px] text-slate-500 font-mono">
                    <span>频率: 4800 MHz</span>
                    <span>电压: 1.1V</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Battery */}
          <div className="bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Battery size={18} className="text-primary" />
              <h3 className="font-bold text-slate-900 dark:text-slate-100">电池健康与序列号</h3>
            </div>
            <div className="space-y-6">
              <div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[92%]"></div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase">设计容量</div>
                    <div className="text-sm font-bold">99.9 Wh</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase">实际容量</div>
                    <div className="text-sm font-bold text-green-500">92.4 Wh</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-[10px] text-slate-500 mb-1">电池组序列号</div>
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded font-mono text-[10px] text-slate-700 dark:text-slate-300">
                    BATT-LION-77XQ-2023-V9
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-[10px] text-slate-500">电芯制造商</div>
                    <div className="text-xs font-bold">LG Chem Energy</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-500">循环次数</div>
                    <div className="text-xs font-bold">42 Cycles</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [currentView, setCurrentView] = useState<View>('individual-test');
  const [cpuLoad, setCpuLoad] = useState(24);

  // Simulate CPU load changes
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuLoad(prev => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.min(Math.max(prev + delta, 10), 60);
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden font-sans">
      {/* Top Navigation */}
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark px-6 py-3 z-10">
        <div className="flex items-center gap-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white shadow-lg shadow-primary/30">
            <Zap size={20} fill="currentColor" />
          </div>
          <h2 className="text-lg font-bold tracking-tight font-display">工程模式工具 <span className="ml-2 text-xs font-normal text-slate-500">v2.4.0</span></h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
            <button className="flex h-8 w-8 items-center justify-center rounded text-slate-500 hover:text-primary transition-colors">
              <Settings size={18} />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded text-slate-500 hover:text-primary transition-colors">
              <HelpCircle size={18} />
            </button>
          </div>
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-blue-400 border border-slate-200 dark:border-slate-700 shadow-lg shadow-primary/20"></div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark flex flex-col">
          <nav className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
            <div className="mb-4">
              <h3 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">主要功能</h3>
            </div>
            <SidebarItem 
              icon={LayoutDashboard} 
              label="个体测试" 
              active={currentView === 'individual-test'} 
              onClick={() => setCurrentView('individual-test')} 
            />
            <SidebarItem 
              icon={PlayCircle} 
              label="自动化流水线" 
              active={currentView === 'automation'} 
              onClick={() => setCurrentView('automation')} 
            />
            <SidebarItem 
              icon={BarChart3} 
              label="历史报告" 
              active={currentView === 'history'} 
              onClick={() => setCurrentView('history')} 
            />
            
            <div className="pt-6 mb-4">
              <h3 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">系统监控</h3>
            </div>
            <SidebarItem 
              icon={Info} 
              label="系统信息" 
              active={currentView === 'system-info'} 
              onClick={() => setCurrentView('system-info')} 
            />
            <SidebarItem 
              icon={FileText} 
              label="实时日志" 
              active={currentView === 'real-time-logs'} 
              onClick={() => setCurrentView('real-time-logs')} 
            />
            <SidebarItem 
              icon={MemoryStick} 
              label="硬件配置" 
              active={currentView === 'hardware-config'} 
              onClick={() => setCurrentView('hardware-config')} 
            />
          </nav>
          
          <div className="p-4 border-t border-slate-200 dark:border-slate-800">
            <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-3 border border-primary/10">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[10px] font-bold text-primary uppercase tracking-tighter">CPU 负载</span>
                <span className="text-[10px] font-bold text-primary">{cpuLoad}%</span>
              </div>
              <div className="h-1 w-full bg-primary/20 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-primary" 
                  animate={{ width: `${cpuLoad}%` }}
                  transition={{ type: 'spring', stiffness: 50 }}
                />
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-[#f6f7f8] dark:bg-background-dark p-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {currentView === 'individual-test' && <IndividualTestView />}
              {currentView === 'real-time-logs' && <SystemLogsView />}
              {currentView === 'hardware-config' && <HardwareConfigView />}
              {(currentView === 'automation' || currentView === 'history' || currentView === 'system-info') && (
                <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
                  <LayoutDashboard size={48} className="mb-4 opacity-20" />
                  <p className="text-sm font-medium">该模块正在开发中...</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      
      {/* Footer Status Bar */}
      <footer className="h-8 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark px-4 flex items-center justify-between text-[10px] text-slate-500">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            系统状态: 正常运行
          </div>
          <div className="flex items-center gap-1.5">
            <Cpu size={10} />
            CPU: {cpuLoad}%
          </div>
          <div className="flex items-center gap-1.5">
            <HardDrive size={10} />
            存储: 85GB / 256GB
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span>最后更新: 10:21:45</span>
          <button className="flex items-center gap-1 text-primary hover:underline">
            <RefreshCw size={10} /> 实时刷新中
          </button>
        </div>
      </footer>
    </div>
  );
}
