import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const privileges = [
  { name: 'Барон', price: 10, features: ['Префикс [Барон]', 'Доступ к /kit baron', '2 дома'] },
  { name: 'Страж', price: 16, features: ['Префикс [Страж]', 'Доступ к /kit guard', '3 дома', 'Цветной ник'] },
  { name: 'Герой', price: 24, features: ['Префикс [Герой]', 'Доступ к /kit hero', '4 дома', 'Полёт в лобби'] },
  { name: 'Аспид', price: 56, features: ['Префикс [Аспид]', 'Доступ к /kit aspid', '6 домов', '/hat'] },
  { name: 'Сквид', price: 69, features: ['Префикс [Сквид]', 'Доступ к /kit squid', '8 домов', '/nick'] },
  { name: 'Глава', price: 87, features: ['Префикс [Глава]', 'Доступ к /kit chief', '10 домов', '/glow'] },
  { name: 'Элита', price: 149, features: ['Префикс [Элита]', 'Доступ к /kit elite', '12 домов', '/workbench'] },
  { name: 'Титан', price: 239, features: ['Префикс [Титан]', 'Доступ к /kit titan', '15 домов', '/fix'] },
  { name: 'Принц', price: 329, features: ['Префикс [Принц]', 'Доступ к /kit prince', '20 домов', '/ec'] },
  { name: 'Князь', price: 449, features: ['Префикс [Князь]', 'Доступ к /kit duke', '25 домов', '/fly'] },
  { name: 'Герцог', price: 699, features: ['Префикс [Герцог]', 'Доступ к /kit grand', '30 домов', '/god'] },
  { name: 'Спонсор', price: 850, features: ['Префикс [Спонсор]', 'Все киты', '50 домов', 'Все возможности'] }
];

const reviews = [
  { name: 'Максим_228', text: 'Лучший сервер! Админы адекватные, онлайн огонь 🔥', rating: 5 },
  { name: 'ProGamer2024', text: 'Играю уже полгода, купил Титана - не пожалел! Донат окупается', rating: 5 },
  { name: 'КристинаМайнкрафт', text: 'Очень крутые ивенты и конкурсы, выиграла привилегию!', rating: 5 },
  { name: 'ShadowNinja', text: 'Топовая экономика, нет читеров, поддержка быстро отвечает', rating: 5 },
  { name: 'BuilderPro', text: 'Играю с друзьями, создали свою гильдию. Сервер просто бомба!', rating: 5 },
  { name: 'DiamondHunter', text: 'Стабильный онлайн, нет лагов. Рекомендую всем!', rating: 5 },
  { name: 'RedstoneKing', text: 'Уникальные режимы игры, постоянные обновления. Красавцы!', rating: 5 },
  { name: 'MegaSteve', text: 'Купил привилегию Герцог - вау! Столько возможностей!', rating: 5 },
  { name: 'CraftyGirl', text: 'Дружное комьюнити, всегда помогут новичкам ❤️', rating: 5 },
  { name: 'EpicMiner2025', text: 'Зашёл попробовать - остался навсегда. Лучший сервер!', rating: 5 }
];

const rules = [
  'Запрещено использование читов и модификаций, дающих преимущество',
  'Запрещены оскорбления, мат и токсичное поведение',
  'Запрещён спам в чате и рекламирование других серверов',
  'Запрещён гриферство построек других игроков',
  'Запрещена продажа игровых ценностей за реальные деньги',
  'Уважайте администрацию и соблюдайте их указания',
  'Запрещено создание ловушек на спавне',
  'Багоюз и дюп запрещены и караются баном'
];

export default function Index() {
  const [activeSection, setActiveSection] = useState('main');
  const { toast } = useToast();
  const serverIP = 'RoomTimeServ.mc-join.me';

  const copyIP = () => {
    navigator.clipboard.writeText(serverIP);
    toast({
      title: '✅ IP скопирован!',
      description: 'Можешь подключаться к серверу',
    });
  };

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#1a0f2e] to-[#0a0a0a]">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b-2 border-primary/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h1 className="text-xl md:text-2xl text-primary animate-pulse-glow">
              ROOMTIMESERV
            </h1>
            <div className="flex flex-wrap gap-2">
              {['main', 'privileges', 'reviews', 'promo', 'support', 'rules'].map((section) => (
                <Button
                  key={section}
                  variant={activeSection === section ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => scrollToSection(section)}
                  className="text-xs md:text-sm pixel-corners hover:scale-105 transition-transform"
                >
                  {section === 'main' && 'Главная'}
                  {section === 'privileges' && 'Привилегии'}
                  {section === 'reviews' && 'Отзывы'}
                  {section === 'promo' && 'Промокоды'}
                  {section === 'support' && 'Поддержка'}
                  {section === 'rules' && 'Правила'}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section id="main" className="min-h-screen flex items-center justify-center pt-20 px-4">
        <div className="text-center max-w-4xl animate-fade-in">
          <div className="mb-8 animate-float">
            <h2 className="text-4xl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
              ROOMTIMESERV
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Лучший Minecraft сервер для настоящих геймеров
            </p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border-2 border-primary/50 pixel-corners p-6 md:p-8 mb-8 hover:border-primary transition-all animate-scale-in">
            <div className="flex flex-col items-center gap-4">
              <Badge className="text-sm md:text-base px-4 py-2 bg-secondary">IP сервера</Badge>
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary break-all">
                {serverIP}
              </p>
              <Button onClick={copyIP} size="lg" className="animate-pulse-glow">
                <Icon name="Copy" className="mr-2" size={20} />
                Скопировать IP
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button
              variant="outline"
              size="lg"
              className="pixel-corners hover:bg-[#5865F2] hover:text-white transition-all"
              asChild
            >
              <a href="https://discord.gg/WBrBCpUbkc" target="_blank" rel="noopener noreferrer">
                <Icon name="MessageCircle" className="mr-2" size={20} />
                Discord
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="pixel-corners hover:bg-[#0088cc] hover:text-white transition-all"
              asChild
            >
              <a href="https://t.me/RoomTimeSRV" target="_blank" rel="noopener noreferrer">
                <Icon name="Send" className="mr-2" size={20} />
                Telegram
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="pixel-corners hover:bg-[#0077ff] hover:text-white transition-all"
              asChild
            >
              <a href="https://vk.com/minercasoft" target="_blank" rel="noopener noreferrer">
                <Icon name="Users" className="mr-2" size={20} />
                Поддержка VK
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { icon: 'Users', label: 'Онлайн 24/7' },
              { icon: 'Zap', label: 'Без лагов' },
              { icon: 'Shield', label: 'Защита от читов' },
              { icon: 'Gift', label: 'Ежедневные ивенты' }
            ].map((item, idx) => (
              <Card key={idx} className="bg-card/30 border-primary/30 hover:border-primary transition-all hover:scale-105 animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <CardContent className="p-4 text-center">
                  <Icon name={item.icon as any} className="mx-auto mb-2 text-primary" size={32} />
                  <p className="text-sm font-bold">{item.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="privileges" className="min-h-screen py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-5xl text-center mb-12 text-primary">Привилегии</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {privileges.map((priv, idx) => (
              <Card
                key={idx}
                className="bg-gradient-to-br from-card/90 to-card/50 border-2 border-secondary/50 hover:border-primary transition-all hover:scale-105 pixel-corners animate-fade-in"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <CardHeader>
                  <CardTitle className="text-2xl text-primary flex items-center justify-between">
                    {priv.name}
                    <Badge className="bg-accent text-accent-foreground">{priv.price}₽</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {priv.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-sm">
                        <Icon name="Check" className="text-primary mt-0.5 flex-shrink-0" size={16} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-4 animate-pulse-glow" size="sm">
                    Купить
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="min-h-screen py-20 px-4 bg-gradient-to-b from-transparent via-secondary/10 to-transparent">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-5xl text-center mb-12 text-primary">Отзывы игроков</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, idx) => (
              <Card
                key={idx}
                className="bg-card/80 border-primary/30 hover:border-primary transition-all hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-primary">{review.name}</CardTitle>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Icon key={i} name="Star" className="text-accent fill-accent" size={16} />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="promo" className="min-h-screen py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-5xl text-center mb-12 text-primary">Промокоды</h2>
          <Card className="bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary/50 pixel-corners animate-scale-in">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl text-center text-primary">
                🎁 Введи команды и получи подарки!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-card/50 p-6 rounded-lg border-2 border-accent/50">
                <p className="text-xl md:text-2xl font-bold text-center mb-4">
                  Промокоды для активации на сервере:
                </p>
                <div className="space-y-3">
                  <div className="bg-background/50 p-4 rounded pixel-corners">
                    <code className="text-primary text-lg md:text-xl font-mono">/piona</code>
                  </div>
                  <div className="bg-background/50 p-4 rounded pixel-corners">
                    <code className="text-primary text-lg md:text-xl font-mono">/umQKoKiq</code>
                  </div>
                </div>
              </div>
              <p className="text-center text-muted-foreground">
                Введи эти команды на сервере и получи эксклюзивные награды!
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="support" className="min-h-screen py-20 px-4 bg-gradient-to-b from-transparent via-accent/10 to-transparent">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-5xl text-center mb-12 text-primary">Поддержка</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-card/80 border-[#5865F2]/50 hover:border-[#5865F2] transition-all hover:scale-105 animate-fade-in">
              <CardHeader>
                <Icon name="MessageCircle" className="mx-auto text-[#5865F2] mb-2" size={48} />
                <CardTitle className="text-center">Discord</CardTitle>
                <CardDescription className="text-center">Быстрая связь в Discord</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-[#5865F2] hover:bg-[#4752C4]" asChild>
                  <a href="https://discord.gg/WBrBCpUbkc" target="_blank" rel="noopener noreferrer">
                    Перейти
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/80 border-[#0088cc]/50 hover:border-[#0088cc] transition-all hover:scale-105 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <Icon name="Send" className="mx-auto text-[#0088cc] mb-2" size={48} />
                <CardTitle className="text-center">Telegram</CardTitle>
                <CardDescription className="text-center">Новости и поддержка</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-[#0088cc] hover:bg-[#0077bb]" asChild>
                  <a href="https://t.me/RoomTimeSRV" target="_blank" rel="noopener noreferrer">
                    Перейти
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/80 border-[#0077ff]/50 hover:border-[#0077ff] transition-all hover:scale-105 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <Icon name="Users" className="mx-auto text-[#0077ff] mb-2" size={48} />
                <CardTitle className="text-center">VK</CardTitle>
                <CardDescription className="text-center">Личная поддержка</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-[#0077ff] hover:bg-[#0066ee]" asChild>
                  <a href="https://vk.com/minercasoft" target="_blank" rel="noopener noreferrer">
                    Перейти
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="rules" className="min-h-screen py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-5xl text-center mb-12 text-primary">Правила сервера</h2>
          <Card className="bg-card/80 border-2 border-primary/50 pixel-corners animate-scale-in">
            <CardHeader>
              <CardTitle className="text-2xl text-center">📜 Обязательно к прочтению</CardTitle>
              <CardDescription className="text-center">
                Соблюдение правил обеспечивает комфортную игру для всех
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {rules.map((rule, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 p-4 bg-background/50 rounded-lg border border-primary/20 hover:border-primary/50 transition-all animate-fade-in"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <Badge className="bg-primary text-primary-foreground shrink-0">
                      {idx + 1}
                    </Badge>
                    <span className="text-sm md:text-base">{rule}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="bg-black/80 border-t-2 border-primary/30 py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-primary font-bold text-xl mb-2">ROOMTIMESERV</p>
          <p className="text-muted-foreground text-sm mb-4">
            Лучший Minecraft сервер • IP: {serverIP}
          </p>
          <div className="flex justify-center gap-4">
            <a href="https://discord.gg/WBrBCpUbkc" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <Icon name="MessageCircle" size={24} />
            </a>
            <a href="https://t.me/RoomTimeSRV" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <Icon name="Send" size={24} />
            </a>
            <a href="https://vk.com/minercasoft" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <Icon name="Users" size={24} />
            </a>
          </div>
          <p className="text-xs text-muted-foreground mt-4">© 2025 RoomTimeServ. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
