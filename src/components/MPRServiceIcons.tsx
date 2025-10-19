import { FileText, TrendingUp, Database, Users } from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "Báo cáo chuyên sâu",
    description: "Phân tích chi tiết thị trường"
  },
  {
    icon: TrendingUp,
    title: "Dự báo xu hướng", 
    description: "Nhận diện cơ hội tiềm năng"
  },
  {
    icon: Database,
    title: "Nguồn uy tín",
    description: "Dữ liệu từ tổ chức hàng đầu"
  },
  {
    icon: Users,
    title: "Cập nhật liên tục",
    description: "10 báo cáo mới mỗi ngày"
  }
];

export const MPRServiceIcons = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
      {services.map((service, index) => (
        <div key={index} className="bg-card rounded-lg p-6 text-center shadow-[var(--shadow-soft)] border border-border hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:scale-105">
          <div className="bg-gradient-to-br from-mpr-blue to-mpr-purple rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <service.icon className="h-8 w-8 text-white" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
          <p className="text-sm text-muted-foreground">{service.description}</p>
        </div>
      ))}
    </div>
  );
};
