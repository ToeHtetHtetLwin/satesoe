import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router'; // Router ပါရပါမယ်
import { HttpClient, HttpClientModule } from '@angular/common/http';
import gsap from 'gsap';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-chawtay',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './chawtay.component.html',
  styleUrl: './chawtay.component.css'
})
export class ChawtayComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router); // Router ကို inject လုပ်ပါ
  private http = inject(HttpClient);

  customerData: any = null;
  isAccepted = false;
  noCount = 0;
  yesScale = 1;

  sarcasticTexts = [
    'ကောက်နေတုန်း (No)',
    'တကယ်ကြီးလား? 🥺',
    'ထပ်စဉ်းစားပါဦးနော်...',
    'စိတ်မဆိုးပါနဲ့တော့...',
    'ချော့နေတယ်လေလို့! ❤️',
    'မရဘူး Yes ပဲ နှိပ်တော့!',
    'နောင်တရမယ်နော် 😜'
  ];

  floatingEmojis = ['💙', '✨', '🌸', '☁️', '🥺', '🦋'];

  ngOnInit() {
    const customerId = this.route.snapshot.paramMap.get('id');

    this.http.get<any[]>('/customers.json').subscribe({
      next: (data) => {
        // ID ကို ရှာမယ်
        const foundCustomer = data.find(c => c.id === customerId);

        if (foundCustomer) {
          this.customerData = foundCustomer;
          this.initFloatingBackground();
        } else {
          // ID မတွေ့ရင် Sorry page ကို redirect လုပ်မယ်
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        console.error('Data load error:', err);
        this.router.navigate(['/']);
      }
    });
  }

  get currentNoText() {
    return this.sarcasticTexts[this.noCount % this.sarcasticTexts.length];
  }

  initFloatingBackground() {
    const interval = setInterval(() => {
      if (!this.isAccepted) {
        const emoji = this.floatingEmojis[Math.floor(Math.random() * this.floatingEmojis.length)];
        this.spawnEmoji(emoji);
      } else {
        clearInterval(interval);
      }
    }, 600);
  }

  spawnEmoji(text: string) {
    const el = document.createElement('div');
    el.innerText = text;
    el.className = 'fixed text-2xl pointer-events-none z-0 select-none';
    el.style.left = Math.random() * 100 + 'vw';
    el.style.top = '110vh';
    el.style.opacity = '0.7';
    document.body.appendChild(el);

    gsap.to(el, {
      y: '-120vh',
      x: (Math.random() - 0.5) * 200,
      rotation: Math.random() * 360,
      duration: 5 + Math.random() * 5,
      ease: 'none',
      onComplete: () => el.remove()
    });
  }

  onNoClick() {
    this.noCount++;
    this.yesScale += 0.3;
    gsap.fromTo('.no-btn', { x: -5 }, { x: 5, duration: 0.1, repeat: 5, yoyo: true });
  }

  onYesClick() {
    this.isAccepted = true;
    this.fireConfetti();

    setTimeout(() => {
      gsap.from('.success-content', {
        opacity: 0,
        scale: 0.8,
        y: 30,
        duration: 0.8,
        ease: 'back.out(1.7)'
      });
    }, 100);
  }

  fireConfetti() {
    const end = Date.now() + 3000;
    // themeColor မရှိခဲ့ရင် default အရောင် သတ်မှတ်ပေးဖို့ logic
    const primaryColor = this.customerData?.themeColor || '#ff007f';
    const colors = [primaryColor, '#ffffff', '#60a5fa'];

    (function frame() {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors: colors });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors: colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    }());
  }
}