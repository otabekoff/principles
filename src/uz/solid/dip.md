---
title: Qaramlikni inversiya qilish tamoyili (DIP)
description: Qaramlikni inversiya qilish tamoyili (Dependency Inversion Principle) bo'yicha to'liq qo'llanma.
icon: GitCommit
---

# Qaramlikni inversiya qilish tamoyili (DIP)

> "Konkretlikka emas, abstraktsiyaga bog'liq bo'ling." — Robert C. Martin

**Qaramlikni inversiya qilish tamoyili (DIP)** dasturning turli qismlari o'rtasidagi bog'liqlikni kamaytirish uchun asosiy qo'llanma hisoblanadi. U modullarning o'zaro qanday aloqada bo'lishini belgilaydi.

## Asosiy tushuncha

DIP ikkita asosiy qoidaga bo'linadi:
1. Yuqori darajadagi modullar quyi darajadagi modullarga bog'liq bo'lmasligi kerak. Ikkalasi ham abstraktsiyalarga bog'liq bo'lishi kerak.
2. Abstraktsiyalar tafsilotlarga (details) bog'liq bo'lmasligi kerak. Tafsilotlar abstraktsiyalarga bog'liq bo'lishi kerak.

"Yuqori darajadagi" modullar ilovangizning murakkab biznes mantiqini o'z ichiga oladi, "quyi darajadagi" modullar esa ma'lumotlar bazasi, fayllarni saqlash yoki SMS jo'natish kabi texnik ishlarni bajaradi. 

### Noto'g'ri namuna (Violates DIP)

Menejer to'g'ridan-to'g'ri past darajadagi xat jo'natuvchiga bog'langan:

```ts
// ❌ DIPga zid
class EmailSender {
  sendEmail(message: string) {
    console.log(`Email: ${message}`);
  }
}

class NotificationManager {
  private emailSender = new EmailSender();

  notify(message: string) {
    this.emailSender.sendEmail(message);
  }
}
```

### To'g'ri yechim (Adheres to DIP)

Oraga abstraktsiya (interfeys) qo'shamiz:

```ts
//  DIPga mos keladi
interface MessageSender {
  send(message: string): void;
}

class EmailSender implements MessageSender {
  send(message: string) {
    console.log(`Email: ${message}`);
  }
}

class NotificationManager {
  constructor(private sender: MessageSender) {}

  notify(message: string) {
    this.sender.send(message);
  }
}
```
Now we can inject any `MessageSender` (SMS, Email, Push) without modifying `NotificationManager`.
