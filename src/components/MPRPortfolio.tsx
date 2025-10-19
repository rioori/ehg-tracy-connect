import { Building2, BarChart3, Globe2, Sparkles } from "lucide-react";

const features = [
  {
    icon: Building2,
    title: "Euromonitor International",
    description: "Phân tích thị trường tiêu dùng toàn cầu",
    color: "from-mpr-blue to-mpr-blue-light"
  },
  {
    icon: BarChart3,
    title: "Fitch Solutions",
    description: "Dự báo kinh tế và tài chính",
    color: "from-mpr-purple to-purple-400"
  },
  {
    icon: Globe2,
    title: "Statista",
    description: "Dữ liệu và thống kê toàn cầu",
    color: "from-mpr-teal to-cyan-400"
  },
  {
    icon: Sparkles,
    title: "First Research & IBISWorld",
    description: "Phân tích ngành công nghiệp chi tiết",
    color: "from-indigo-500 to-purple-500"
  }
];

const stats = [
  { number: "10+", label: "Báo cáo mới mỗi ngày" },
  { number: "1000+", label: "Báo cáo có sẵn" },
  { number: "50+", label: "Ngành nghề" },
  { number: "24/7", label: "Hỗ trợ AI" }
];

export const MPRPortfolio = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-muted to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Nguồn Dữ Liệu Uy Tín Hàng Đầu
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            MPR tổng hợp báo cáo từ các tổ chức nghiên cứu thị trường hàng đầu thế giới,
            giúp bạn có cái nhìn toàn diện và chính xác về thị trường.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-card rounded-lg p-6 shadow-[var(--shadow-soft)] border border-border hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:scale-105">
              <div className={`bg-gradient-to-br ${feature.color} rounded-lg w-14 h-14 flex items-center justify-center mb-4`}>
                <feature.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-mpr-blue via-mpr-purple to-mpr-teal rounded-2xl p-8 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
