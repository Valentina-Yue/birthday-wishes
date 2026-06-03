"""
生成生日祝福二维码脚本
需要安装：pip install qrcode pillow
"""

import qrcode
import os

def generate_birthday_qrcode():
    """
    生成生日祝福页面的二维码
    """
    # 方式1：如果页面部署在服务器上，使用URL
    # url = "https://your-domain.com/birthday/index.html"
    
    # 方式2：生成本地文件的二维码（文件需要放在手机上或可访问的位置）
    # 实际使用时，需要将HTML文件部署到可公网访问的服务器
    
    # 示例：生成带文字的二维码
    # 注意：二维码扫描后打开的是网页，需要先部署HTML文件
    
    print("=" * 50)
    print("生日祝福二维码生成器")
    print("=" * 50)
    
    # 方式A：生成普通文字二维码（简单但不如图片美观）
    message = "祝亲爱的朋友生日快乐！愿你的每一天都如炮仗花般灿烂绽放！🎂🎉"
    
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4,
    )
    qr.add_data(message)
    qr.make(fit=True)
    
    img = qr.make_image(fill_color="#ff6b35", back_color="#FFF8EB")
    img.save("birthday_qrcode.png")
    
    print("✅ 二维码已生成：birthday_qrcode.png")
    print("📱 使用手机扫描即可看到祝福语")
    print("\n💡 提示：如果要扫描后看到精美网页，请：")
    print("   1. 将HTML文件部署到服务器")
    print("   2. 使用网页URL生成二维码")

if __name__ == "__main__":
    generate_birthday_qrcode()