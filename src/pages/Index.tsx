import { useState } from "react";
import { MPRChatForm } from "@/components/MPRChatForm";
import { EHGChatInterface } from "@/components/EHGChatInterface";
import { MPRPortfolio } from "@/components/MPRPortfolio";
import { MPRServiceIcons } from "@/components/MPRServiceIcons";
import { BarChart3 } from "lucide-react";

interface UserData {
  fullName: string;
  phoneNumber: string;
  email: string;
  countryCode: string;
  language: string;
}

const Index = () => {
  const [showChat, setShowChat] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleFormSubmit = (data: UserData) => {
    setUserData(data);
    setShowChat(true);
  };

  const handleBackToForm = () => {
    setShowChat(false);
    setUserData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background">
      {/* Header */}
      <header className="py-8 px-6 bg-gradient-to-r from-mpr-blue via-mpr-purple to-mpr-teal">
        <div className="container mx-auto">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <BarChart3 className="h-12 w-12 text-white" />
            </div>
            <div className="text-white">
              <h1 className="text-3xl font-bold">MPR</h1>
              <p className="text-sm opacity-90">Membership Premium Report</p>
            </div>
          </div>
          <div className="text-center">
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
              Giải pháp báo cáo thị trường chuyên nghiệp
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-mpr-blue to-mpr-purple bg-clip-text text-transparent mb-4">
                  MPR AI ASSISTANT
                </h1>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  TRỢ LÝ TÌM KIẾM BÁO CÁO THÔNG MINH
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  MPR - Membership Premium Report là giải pháp cung cấp báo cáo chuyên sâu thị trường toàn diện, 
                  giúp bạn đưa ra quyết định kinh doanh sáng suốt.
                </p>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <span className="text-mpr-blue">✓</span>
                    <span><strong>Báo cáo chuyên sâu:</strong> Phân tích chi tiết, dự báo chính xác về thị trường</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-mpr-purple">✓</span>
                    <span><strong>Cập nhật liên tục:</strong> 10 báo cáo mới mỗi ngày</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-mpr-teal">✓</span>
                    <span><strong>Nguồn uy tín:</strong> Euromonitor, Fitch Solutions, Statista, First Research, IBISWorld</span>
                  </div>
                </div>
              </div>

              {/* Service Icons */}
              <MPRServiceIcons />
            </div>

            {/* Right Form/Chat */}
            <div>
              {showChat && userData ? (
                <EHGChatInterface userData={userData} onBack={handleBackToForm} />
              ) : (
                <MPRChatForm onFormSubmit={handleFormSubmit} />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <MPRPortfolio />

      {/* Contact Section */}
      <section className="py-16 bg-card border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Liên hệ với chúng tôi</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Website</p>
              <a href="https://www.baocao.site/" target="_blank" rel="noopener noreferrer" className="text-mpr-blue hover:text-mpr-blue-dark font-medium">
                www.baocao.site
              </a>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Điện thoại</p>
              <a href="tel:+84867786086" className="text-mpr-blue hover:text-mpr-blue-dark font-medium">
                +84 867 786 086
              </a>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Địa chỉ</p>
              <p className="text-foreground font-medium">Ho Chi Minh, Phú Nhuận</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="bg-gradient-to-r from-mpr-blue to-mpr-blue-light text-white px-4 py-2 rounded-full text-sm font-medium">11-50 nhân viên</span>
            <span className="bg-gradient-to-r from-mpr-purple to-purple-400 text-white px-4 py-2 rounded-full text-sm font-medium">Technology & Information</span>
            <span className="bg-gradient-to-r from-mpr-teal to-cyan-400 text-white px-4 py-2 rounded-full text-sm font-medium">Thành lập 2024</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gradient-to-r from-mpr-navy to-foreground text-white">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm opacity-90">
            © 2024 MPR - Membership Premium Report. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
