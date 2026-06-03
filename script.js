/**
 * 生日祝福页面交互脚本
 * 功能：飘落花瓣效果、烟花效果、日期显示等
 */

// ========== 页面加载完成后初始化 ==========
document.addEventListener('DOMContentLoaded', function() {
    // 显示当前日期
    displayCurrentDate();
    
    // 创建飘落花瓣效果
    createFallingPetals();
    
    // 初始化烟花按钮
    initFireworkButton();
    
    // 创建炮仗花装饰
    createFlowerDecorations();
});

// ========== 显示当前日期 ==========
function displayCurrentDate() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        dateElement.textContent = `${year}.${month}.${day}`;
    }
}

// ========== 创建飘落花瓣效果 ==========
function createFallingPetals() {
    const container = document.getElementById('petalContainer');
    if (!container) return;
    
    const petalCount = 50; // 花瓣数量
    
    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        
        // 随机属性
        const size = Math.random() * 12 + 6; // 6-18px
        const left = Math.random() * 100; // 0-100%
        const delay = Math.random() * 10; // 0-10s
        const duration = Math.random() * 6 + 4; // 4-10s
        const rotateStart = Math.random() * 360;
        
        petal.style.width = size + 'px';
        petal.style.height = size + 'px';
        petal.style.left = left + '%';
        petal.style.animationDelay = delay + 's';
        petal.style.animationDuration = duration + 's';
        petal.style.transform = `rotate(${rotateStart}deg)`;
        
        // 随机颜色变化（炮仗花颜色范围）
        const hue = Math.random() * 20 + 20; // 20-40度（橙红色范围）
        petal.style.background = `linear-gradient(135deg, 
            hsl(${hue}, 100%, 55%), 
            hsl(${hue + 10}, 100%, 60%))`;
        
        container.appendChild(petal);
    }
}

// ========== 烟花效果 ==========
function initFireworkButton() {
    const btn = document.getElementById('fireworkBtn');
    if (btn) {
        btn.addEventListener('click', function() {
            createFireworks();
            // 添加点击反馈
            showClickFeedback();
        });
    }
}

// 创建烟花效果
function createFireworks() {
    const colors = ['#ff4500', '#ff6b35', '#ff8c42', '#ffb347', '#ffcc66', '#ff3333'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            createSingleFirework(colors[Math.floor(Math.random() * colors.length)]);
        }, i * 80);
    }
    
    // 播放祝贺提示
    showBirthdayMessage();
}

// 创建单个烟花粒子
function createSingleFirework(color) {
    const firework = document.createElement('div');
    firework.className = 'firework';
    
    // 随机位置
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight * 0.6 + window.innerHeight * 0.2;
    
    firework.style.position = 'fixed';
    firework.style.left = x + 'px';
    firework.style.top = y + 'px';
    firework.style.width = '8px';
    firework.style.height = '8px';
    firework.style.borderRadius = '50%';
    firework.style.backgroundColor = color;
    firework.style.boxShadow = `0 0 15px ${color}`;
    firework.style.pointerEvents = 'none';
    firework.style.zIndex = '999';
    
    document.body.appendChild(firework);
    
    // 动画扩散
    let scale = 1;
    let opacity = 1;
    let dx = (Math.random() - 0.5) * 10;
    let dy = (Math.random() - 0.5) * 10 - 2;
    let xPos = x;
    let yPos = y;
    
    function animate() {
        scale += 0.1;
        opacity -= 0.02;
        xPos += dx;
        yPos += dy;
        dy += 0.3; // 重力效果
        
        firework.style.transform = `translate(${xPos - x}px, ${yPos - y}px) scale(${scale})`;
        firework.style.opacity = opacity;
        
        if (opacity > 0 && scale < 8) {
            requestAnimationFrame(animate);
        } else {
            firework.remove();
        }
    }
    
    requestAnimationFrame(animate);
}

// 显示点击反馈
function showClickFeedback() {
    const btn = document.getElementById('fireworkBtn');
    const originalText = btn.textContent;
    btn.textContent = '🎉 生日快乐！🎉';
    setTimeout(() => {
        btn.textContent = originalText;
    }, 1500);
}

// 弹出生日祝福提示
function showBirthdayMessage() {
	const messages = [
    "🎂 生日快乐！",
    "🌸 66大顺，万事如意！",
    "💝 Sei glücklich！",
    ];

    
    const msg = messages[Math.floor(Math.random() * messages.length)];
    
    // 创建临时提示
    const toast = document.createElement('div');
    toast.textContent = msg;
    toast.style.position = 'fixed';
    toast.style.bottom = '20%';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = 'rgba(0,0,0,0.8)';
    toast.style.color = '#ff8c42';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '50px';
    toast.style.fontSize = '1.1rem';
    toast.style.fontWeight = 'bold';
    toast.style.zIndex = '1000';
    toast.style.fontFamily = "'Noto Serif SC', serif";
    toast.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
    toast.style.border = '1px solid #ff8c42';
    toast.style.animation = 'fadeInOut 2s ease forwards';
    
    // 添加动画样式
    if (!document.querySelector('#toastStyle')) {
        const style = document.createElement('style');
        style.id = 'toastStyle';
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
                15% { opacity: 1; transform: translateX(-50%) translateY(0); }
                85% { opacity: 1; transform: translateX(-50%) translateY(0); }
                100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}

// ========== 创建炮仗花装饰元素 ==========
function createFlowerDecorations() {
    const bg = document.getElementById('flowerBg');
    if (!bg) return;
    
    // 创建漂浮的炮仗花装饰
    const decorationCount = 12;
    
    for (let i = 0; i < decorationCount; i++) {
        const decor = document.createElement('div');
        decor.className = 'flower-decoration';
        
        const size = Math.random() * 80 + 40;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 20 + 15;
        
        decor.style.width = size + 'px';
        decor.style.height = size + 'px';
        decor.style.left = left + '%';
        decor.style.top = top + '%';
        decor.style.position = 'absolute';
        decor.style.animation = `float ${duration}s ease-in-out infinite`;
        decor.style.animationDelay = delay + 's';
        
        bg.appendChild(decor);
    }
    
    // 添加浮动动画
    if (!document.querySelector('#floatStyle')) {
        const style = document.createElement('style');
        style.id = 'floatStyle';
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(5deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

// ========== 添加音乐控制（可选，用户点击后播放）==========
// 由于浏览器策略，音乐需要用户交互才能播放
// 如果需要音乐，可以取消下面的注释

/*
let audio = null;
let isPlaying = false;

function initMusic() {
    const musicControl = document.getElementById('musicControl');
    if (musicControl) {
        musicControl.style.display = 'block';
        const toggleBtn = document.getElementById('musicToggle');
        
        audio = new Audio('birthday-music.mp3'); // 需要准备音乐文件
        audio.loop = true;
        
        toggleBtn.addEventListener('click', function() {
            if (isPlaying) {
                audio.pause();
                toggleBtn.textContent = '🔊 播放音乐';
            } else {
                audio.play();
                toggleBtn.textContent = '🔇 暂停音乐';
            }
            isPlaying = !isPlaying;
        });
    }
}
*/