import React, { useState, useMemo } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  PiggyBank, 
  Target, 
  Hourglass, 
  Calculator,
  Heart,
  Home,
  Coffee,
  Activity,
  Car,
  Zap,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Slider } from './components/Slider';
import { InfoCard } from './components/InfoCard';
import { ExpenseCategories, ExpenseKey } from './types';

// Constants
const COLORS = ['#10B981', '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899', '#F43F5E'];
const SAVINGS_GROWTH_RATE = 0.04; // 4% constant for accumulation phase per requirement

const App: React.FC = () => {
  // --- 1. State Management ---

  // Module 1: Expenses
  const [expenses, setExpenses] = useState<ExpenseCategories>({
    housing: 12000,     // 住房固定
    food: 10000,        // 餐饮生鲜
    consumables: 3000,  // 日常消耗
    medical: 2000,      // 医保看病
    transport: 2000,    // 交通快递
    hobbies: 5000       // 电子女友 (Hobbies/Entertainment)
  });

  // Module 2: FIRE Rates
  const [returnRate, setReturnRate] = useState<number>(4);      // Slider A: 0-100%
  const [withdrawalRate, setWithdrawalRate] = useState<number>(4); // Slider B: 0-100%

  // Module 4: Income
  const [annualIncome, setAnnualIncome] = useState<number>(100000); // 0-300,000

  // --- 2. Calculations ---

  // Total Annual Expense
  const totalAnnualExpense = useMemo(() => {
    return Object.values(expenses).reduce((a: number, b: number) => a + b, 0);
  }, [expenses]);

  // Standard FIRE Number (25x Rule)
  const baseFireNumber = useMemo(() => {
    return totalAnnualExpense * 25;
  }, [totalAnnualExpense]);

  // Dynamic FIRE Number based on Return Rate (If you live purely off interest: Fund = Exp / ReturnRate)
  const returnBasedFireNumber = useMemo(() => {
    if (returnRate <= 0) return 0;
    return totalAnnualExpense / (returnRate / 100);
  }, [totalAnnualExpense, returnRate]);

  // Dynamic FIRE Number based on Withdrawal Rate (Fund = Exp / WithdrawalRate)
  const withdrawalBasedFireNumber = useMemo(() => {
    if (withdrawalRate <= 0) return 0;
    return totalAnnualExpense / (withdrawalRate / 100);
  }, [totalAnnualExpense, withdrawalRate]);

  // Years Sustainable (Simple Cash: Fund / Expense)
  const yearsSustainableByReturn = useMemo(() => {
    if (totalAnnualExpense === 0) return 999;
    return returnBasedFireNumber / totalAnnualExpense;
  }, [returnBasedFireNumber, totalAnnualExpense]);

  const yearsSustainableByWithdrawal = useMemo(() => {
    if (totalAnnualExpense === 0) return 999;
    return withdrawalBasedFireNumber / totalAnnualExpense;
  }, [withdrawalBasedFireNumber, totalAnnualExpense]);

  // Time to Goal (Accumulation Phase)
  // Logic: 
  // Yearly Savings = Income - Expense
  // Target = withdrawalBasedFireNumber (User usually targets the withdrawal rate scenario)
  // Growth = 4% (SAVINGS_GROWTH_RATE)
  // Formula for N years: n = ln((Target * r / Savings) + 1) / ln(1 + r)
  const yearlySavings = annualIncome - totalAnnualExpense;
  
  const yearsToReachGoal = useMemo(() => {
    const target = withdrawalBasedFireNumber;
    
    if (target <= 0) return 0;
    if (yearlySavings <= 0) return Infinity;

    // Mathematical Model: Future Value of Annuity (Ordinary)
    // Target = Savings * [ (1 + r)^n - 1 ] / r
    // Solve for n:
    // (Target * r / Savings) = (1 + r)^n - 1
    // (Target * r / Savings) + 1 = (1 + r)^n
    // ln(...) = n * ln(1 + r)
    
    const numerator = Math.log(((target * SAVINGS_GROWTH_RATE) / yearlySavings) + 1);
    const denominator = Math.log(1 + SAVINGS_GROWTH_RATE);
    
    return numerator / denominator;
  }, [withdrawalBasedFireNumber, yearlySavings]);

  // --- 3. Handlers ---
  const handleExpenseChange = (key: ExpenseKey, value: number) => {
    setExpenses(prev => ({ ...prev, [key]: value }));
  };

  // --- 4. Chart Data ---
  const expenseChartData = [
    { name: '住房固定', value: expenses.housing },
    { name: '餐饮生鲜', value: expenses.food },
    { name: '日常消耗', value: expenses.consumables },
    { name: '医保看病', value: expenses.medical },
    { name: '交通快递', value: expenses.transport },
    { name: '电子女友', value: expenses.hobbies },
  ];

  const formatMoney = (val: number) => 
    new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 p-2 rounded-lg">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">FIRE <span className="text-emerald-600">Planner</span></h1>
          </div>
          <div className="text-xs font-mono text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            v2.0 Beta
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Inputs & Config */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Section 1: Expenses */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-emerald-500" />
                  年平均支出
                </h2>
                <span className="text-2xl font-bold text-emerald-600 font-mono">
                  {formatMoney(totalAnnualExpense)}
                </span>
              </div>
              
              <div className="p-6 space-y-5">
                <Slider 
                  label="住房固定" 
                  description="房租、房贷、物业费"
                  min={0} max={50000} value={expenses.housing} 
                  onChange={(v) => handleExpenseChange('housing', v)} unit="¥" 
                />
                <Slider 
                  label="餐饮生鲜" 
                  description="外卖、买菜、聚餐"
                  min={0} max={50000} value={expenses.food} 
                  onChange={(v) => handleExpenseChange('food', v)} unit="¥" 
                />
                <Slider 
                  label="日常消耗" 
                  description="日用品、水电网"
                  min={0} max={50000} value={expenses.consumables} 
                  onChange={(v) => handleExpenseChange('consumables', v)} unit="¥" 
                />
                <Slider 
                  label="医保看病" 
                  description="保险费、药品、体检"
                  min={0} max={50000} value={expenses.medical} 
                  onChange={(v) => handleExpenseChange('medical', v)} unit="¥" 
                />
                <Slider 
                  label="交通快递" 
                  description="通勤、打车、网购运费"
                  min={0} max={50000} value={expenses.transport} 
                  onChange={(v) => handleExpenseChange('transport', v)} unit="¥" 
                />
                <Slider 
                  label="电子女友" 
                  description="娱乐、游戏、订阅、爱好"
                  min={0} max={50000} value={expenses.hobbies} 
                  onChange={(v) => handleExpenseChange('hobbies', v)} unit="¥" 
                  highlight={true}
                />
              </div>
              
              {/* Expense Chart */}
              <div className="h-48 w-full bg-gray-50 flex items-center justify-center border-t border-gray-100">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expenseChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {expenseChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => formatMoney(value)} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="text-xs text-gray-400 absolute pointer-events-none">支出分布</div>
              </div>
            </div>

            {/* Section 4: Income Input */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-6">
                <PiggyBank className="w-5 h-5 text-blue-500" />
                储蓄能力设定
              </h2>
              <Slider 
                label="年平均收入 (税后)" 
                min={0} max={300000} step={1000}
                value={annualIncome} 
                onChange={setAnnualIncome} 
                unit="¥" 
                highlight
              />
              <div className="mt-4 p-4 bg-blue-50 rounded-xl flex justify-between items-center border border-blue-100">
                <span className="text-sm text-blue-800 font-medium">预计年储蓄额</span>
                <span className={`text-xl font-bold font-mono ${yearlySavings > 0 ? 'text-blue-700' : 'text-red-500'}`}>
                  {formatMoney(yearlySavings)}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">
                假设储蓄年化复利增长: {(SAVINGS_GROWTH_RATE * 100).toFixed(1)}%
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Results & Analysis */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Standard FIRE Indicator */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <InfoCard 
                title="基础版 FIRE 目标"
                description="基于传统的 4% 法则 (支出 × 25)"
                value={formatMoney(baseFireNumber)}
                subValue={`可支撑 ${25} 年 (如果不进行投资)`}
                icon={Target}
                colorClass="text-purple-600"
              />
              <InfoCard 
                title="达成目标所需时间"
                description="基于当前收支与 4% 复利"
                value={yearlySavings <= 0 ? "无法达成" : (yearsToReachGoal === Infinity ? "遥不可及" : `${yearsToReachGoal.toFixed(1)} 年`)}
                subValue={yearlySavings > 0 ? `大概在 ${new Date().getFullYear() + Math.ceil(yearsToReachGoal)} 年退休` : "请增加收入或减少支出"}
                icon={Hourglass}
                colorClass={yearsToReachGoal < 15 ? "text-emerald-600" : "text-amber-500"}
              />
            </div>

            {/* Advanced Scenarios Container */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
               <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-indigo-500" />
                  动态 FIRE 模拟
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  调节回报率与提取率，查看所需的退休本金变化
                </p>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                
                {/* Scenario A: Return Rate Driven */}
                <div className="space-y-6 relative">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <h3 className="font-bold text-gray-700">假设 A: 靠利息生活</h3>
                  </div>
                  
                  <Slider 
                    label="年平均投资回报率" 
                    min={0.1} max={20} step={0.1}
                    value={returnRate} 
                    onChange={setReturnRate} 
                    unit="%" 
                  />
                  
                  <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100 mt-4">
                    <div className="text-xs text-emerald-600 uppercase font-semibold mb-1">所需本金 (仅靠收益覆盖支出)</div>
                    <div className="text-2xl font-bold text-emerald-700 font-mono mb-2">
                      {returnRate > 0 ? formatMoney(returnBasedFireNumber) : "∞"}
                    </div>
                    <div className="h-px bg-emerald-200 w-full my-2"></div>
                    <div className="flex justify-between items-center text-sm">
                       <span className="text-emerald-800">资金利用效率</span>
                       <span className="font-mono font-medium text-emerald-900">
                         100% 本金保留
                       </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    <span className="font-semibold">逻辑公式：</span> 本金 = 年支出 ÷ 回报率。<br/>
                    回报率越高，所需本金越低。假设本金不动，仅花掉当年产生的收益。
                  </p>
                </div>

                {/* Vertical Divider */}
                <div className="hidden md:block absolute left-1/2 top-6 bottom-6 w-px bg-gray-100 -ml-px"></div>

                {/* Scenario B: Withdrawal Rate Driven */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-orange-500" />
                    <h3 className="font-bold text-gray-700">假设 B: 资产变现 (4%法则)</h3>
                  </div>

                  <Slider 
                    label="年安全提取率" 
                    min={0.1} max={20} step={0.1}
                    value={withdrawalRate} 
                    onChange={setWithdrawalRate} 
                    unit="%" 
                  />

                  <div className="bg-orange-50 rounded-xl p-5 border border-orange-100 mt-4">
                    <div className="text-xs text-orange-600 uppercase font-semibold mb-1">所需本金 (本金递减模式)</div>
                    <div className="text-2xl font-bold text-orange-700 font-mono mb-2">
                      {withdrawalRate > 0 ? formatMoney(withdrawalBasedFireNumber) : "∞"}
                    </div>
                    <div className="h-px bg-orange-200 w-full my-2"></div>
                    <div className="flex justify-between items-center text-sm">
                       <span className="text-orange-800">名义支撑年限 (现金流)</span>
                       <span className="font-mono font-medium text-orange-900">
                         {yearsSustainableByWithdrawal.toFixed(1)} 年
                       </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    <span className="font-semibold">逻辑公式：</span> 本金 = 年支出 ÷ 提取率。<br/>
                    提取率越高，所需本金越少，但资金耗尽风险增加。
                  </p>
                </div>

              </div>
            </div>

            {/* Math Explanation Card */}
            <div className="bg-slate-900 rounded-2xl shadow-lg border border-slate-800 p-6 text-slate-300">
              <h3 className="text-white font-bold flex items-center gap-2 mb-4">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                核心计算模型
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="text-emerald-400 font-semibold mb-2">储蓄累积模型</h4>
                  <div className="font-mono bg-slate-800 p-3 rounded text-xs mb-2">
                     n = ln((Target × r / AnnualSaving) + 1) ÷ ln(1 + r)
                  </div>
                  <p className="text-xs text-slate-400">
                    其中 r = 4% (保守理财收益), n = 所需年数。此公式计算定投复利下达到目标金额的时间。
                  </p>
                </div>
                <div>
                  <h4 className="text-orange-400 font-semibold mb-2">FIRE 基础公式</h4>
                  <div className="font-mono bg-slate-800 p-3 rounded text-xs mb-2">
                     FIRE Number = AnnualExpense ÷ WithdrawalRate
                  </div>
                  <p className="text-xs text-slate-400">
                    若设定提取率为 4%，则 FIRE Number = 年支出 × 25。这是最经典的 FIRE 黄金法则。
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default App;