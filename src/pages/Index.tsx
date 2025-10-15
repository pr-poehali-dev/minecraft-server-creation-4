import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const privileges = [
  { 
    name: 'Барон', 
    price: 10, 
    commands: ['/kit Барон', '/salary', '/crawl'],
    features: ['Префикс [Барон] в чате и табе', '2 точки домов', '2 региона по 40,000 блоков', '6 слотов на аукционе', 'Задержка телепорта 7 сек']
  },
  { 
    name: 'Страж', 
    price: 16, 
    commands: ['/kit Страж', '/suicide', '/dchat'],
    features: ['Префикс [Страж] в чате и табе', '2 точки домов', '2 региона по 45,000 блоков', '7 слотов на аукционе', 'Задержка телепорта 6 сек', '✔ Возможности Барона']
  },
  { 
    name: 'Герой', 
    price: 24, 
    commands: ['/kit Герой'],
    features: ['Префикс [Герой] в чате и табе', 'Все возможности Стража', 'Дополнительные бонусы']
  },
  { 
    name: 'Аспид', 
    price: 56, 
    commands: ['/kit Аспид', '/clear', '/feed', '/heal', '/me'],
    features: ['Префикс [Аспид] в чате и табе', '2 точки домов', '2 региона по 60,000 блоков', '9 слотов на аукционе', 'Задержка телепорта 6 сек', '✔ Возможности привилегий ниже']
  },
  { 
    name: 'Сквид', 
    price: 69, 
    commands: ['/kit Сквид', '/back', '/ec', '/wbench', '/ad', '/buy', '/sell', '/name'],
    features: ['Префикс [Сквид] в чате и табе', '3 точки домов', '3 региона по 75,000 блоков', '10 слотов на аукционе', 'Задержка телепорта 5 сек', '✔ Возможности привилегий ниже']
  },
  { 
    name: 'Глава', 
    price: 87, 
    commands: ['/kit Глава', '/salary', '/bc', '/ext', '/am toggle', '/msgtoggle', '/paytoggle', '/tptoggle', '/feed Ник', '/heal Ник', '/exp'],
    features: ['Префикс [Глава] в чате и табе', '3 точки домов', '4 региона по 100,000 блоков', '11 слотов на аукционе', 'Задержка телепорта 4 сек', '✔ Возможности привилегий ниже']
  },
  { 
    name: 'Элита', 
    price: 149, 
    commands: ['/kit Элита', '/time', '/weather', '/loom', '/carttable', '/beezooka', '/kittycannon', '/firework', '/name (цветной)'],
    features: ['Префикс [Элита] в чате и табе', '3 точки домов', '5 регионов по 150,000 блоков', '12 слотов на аукционе', 'Задержка телепорта 4 сек', '✔ Возможности привилегий ниже']
  },
  { 
    name: 'Титан', 
    price: 239, 
    commands: ['/kit Титан', '/jump', '/afk', '/setwarp', '/delwarp', '/repair'],
    features: ['Префикс [Титан] в чате и табе', '4 точки домов', '6 регионов по 200,000 блоков', '13 слотов на аукционе', 'Задержка телепорта 3 сек', 'Не кикает за АФК', '✔ Возможности привилегий ниже']
  },
  { 
    name: 'Принц', 
    price: 329, 
    commands: ['/kit Принц', '/smithtable', '/stonecutter', '/grindstone'],
    features: ['Префикс [Принц] в чате и табе', '5 точек домов', '7 регионов по 250,000 блоков', '14 слотов на аукционе', 'Задержка телепорта 3 сек', '✔ Возможности привилегий ниже']
  },
  { 
    name: 'Князь', 
    price: 449, 
    commands: ['/kit Князь', '/fly', '/amute', '/enchant', '/anvil', '/speed', '/salary', '/exp'],
    features: ['Префикс [Князь] в чате и табе', '7 точек домов', '10 регионов по 350,000 блоков', '15 слотов на аукционе', 'Задержка телепорта 2 сек', '✔ Возможности привилегий ниже']
  },
  { 
    name: 'Герцог', 
    price: 699, 
    commands: ['/kit Крушитель', '/enchant', '/anvil', '/speed', '/salary', '/exp'],
    features: ['Префикс [Герцог] в чате и табе', '10 точек домов', '15 регионов по 500,000 блоков', '15 слотов на аукционе', 'Вход на заполненный сервер', 'Нет задержки телепортации', '✔ Возможности привилегий ниже']
  },
  { 
    name: 'Спонсор', 
    price: 850, 
    commands: ['Все команды сервера'],
    features: ['Префикс [Спонсор] в чате и табе', 'Все киты сервера', '50 точек домов', 'Максимальные регионы', 'Все возможности сервера', 'VIP поддержка']
  }
];

const extraItems = [
  { name: 'Донат-кейс', price: 60, description: 'Случайные ценные предметы', icon: 'Gift' },
  { name: '1000 токенов', price: 2, description: 'Внутриигровая валюта', icon: 'Coins' }
];

const reviews = [
  { name: 'Lololoshka', text: 'Один из лучших серверов, на которых я играл! Отличная работа команды 🎮', rating: 5, sponsor: true },
  { name: 'FixPlay', text: 'Рекомендую всем своим подписчикам! Стабильный, интересный сервер с крутыми ивентами 🔥', rating: 5, sponsor: true },
  { name: 'OneTwo', text: 'Играю регулярно с друзьями. Админы молодцы, сервер топ! 💎', rating: 5, sponsor: true },
  { name: 'Максим_228', text: 'Лучший сервер! Админы адекватные, онлайн огонь 🔥', rating: 5 },
  { name: 'ProGamer2024', text: 'Играю уже полгода, купил Титана - не пожалел! Донат окупается', rating: 5 },
  { name: 'КристинаМайнкрафт', text: 'Очень крутые ивенты и конкурсы, выиграла привилегию!', rating: 5 },
  { name: 'ShadowNinja', text: 'Топовая экономика, нет читеров, поддержка быстро отвечает', rating: 5 },
  { name: 'BuilderPro', text: 'Играю с друзьями, создали свою гильдию. Сервер просто бомба!', rating: 5 },
  { name: 'DiamondHunter', text: 'Стабильный онлайн, нет лагов. Рекомендую всем!', rating: 5 },
  { name: 'RedstoneKing', text: 'Уникальные режимы игры, постоянные обновления. Красавцы!', rating: 5 }
];

const rules = [
  'Запрещено использование читов и модификаций, дающих преимущество',
  'Запрещены оскорбления, мат и токсичное поведение',
  'Запрещён спам в чате и рекламирование других серверов',
  'Запрещён гриферство построек других игроков',
  'Запрещена продажа игровых ценностей за реальные деньги',
  'Уважайте администрацию и соблюдайте их указания',
  'Запрещено создание ловушек на спавне',
  'Багоюз и дюп запрещены и караются баном',
  'Попытки махинаций оплатами наказываются баном без возврата средств',
  'Предоставьте чек оплаты при проблемах с донатом'
];

const antiCheatPrograms = [
  { name: 'SystemInformer', desc: 'Позволяет залезть в память устройства и свойства процессов' },
  { name: 'USB-DriveLog', desc: 'Отслеживание присоединения/отключения USB флешек' },
  { name: 'USB-Deview', desc: 'Отслеживание присоединения/отключения USB устройств' },
  { name: 'ExecutedProgramsList', desc: 'Поиск и анализ ранее запускавшихся приложений' },
  { name: 'WinPrefetchView', desc: 'Подробный анализ папки Prefetch для поиска читов' },
  { name: 'LastActivityView', desc: 'Анализ активности ПК для поиска читов' },
  { name: 'CachedProgramsList', desc: 'Поиск информации о запускавшихся файлах' },
  { name: 'OpenSaveFilesView', desc: 'Поиск информации о запускавшихся файлах в памяти' }
];

export default function Index() {
  const [activeSection, setActiveSection] = useState('main');
  const [cart, setCart] = useState<any[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [purchaseNickname, setPurchaseNickname] = useState('');
  const [onlinePlayers, setOnlinePlayers] = useState(127);
  const { toast } = useToast();
  const serverIP = 'RoomTimeServ.mc-join.me';

  const copyIP = () => {
    navigator.clipboard.writeText(serverIP);
    toast({
      title: '✅ IP скопирован!',
      description: 'Можешь подключаться к серверу',
    });
  };

  const addToCart = (item: any) => {
    setCart([...cart, item]);
    toast({
      title: '✅ Добавлено в корзину!',
      description: `${item.name} добавлен в корзину`,
    });
  };

  const removeFromCart = (index: number) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  };

  const handlePurchase = async () => {
    if (!purchaseNickname.trim()) {
      toast({
        title: '❌ Ошибка',
        description: 'Введите ваш никнейм',
        variant: 'destructive'
      });
      return;
    }

    try {
      const response = await fetch('https://functions.poehali.dev/68a6dcd5-1846-4cd5-b898-1a2be8697e6a', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname: purchaseNickname,
          items: cart,
          total_price: getTotalPrice()
        })
      });

      const data = await response.json();

      if (data.success) {
        const telegramMessage = encodeURIComponent(data.telegram_message);
        const telegramUrl = `https://t.me/KarpovST1M?text=${telegramMessage}`;
        window.open(telegramUrl, '_blank');
        
        toast({
          title: '✅ Заказ оформлен!',
          description: `Товары будут выданы на сервере ${data.server_ip}`,
        });
        
        setCart([]);
        setPurchaseNickname('');
        setCartOpen(false);
      }
    } catch (error) {
      toast({
        title: '❌ Ошибка',
        description: 'Не удалось оформить заказ',
        variant: 'destructive'
      });
    }
  };

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlinePlayers(prev => {
        const change = Math.floor(Math.random() * 5) - 2;
        const newValue = prev + change;
        return Math.max(100, Math.min(150, newValue));
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#1a0f2e] to-[#0a0a0a] relative">
      <div 
        className="fixed inset-0 z-0 opacity-40"
        style={{
          backgroundImage: 'url(https://cdn.poehali.dev/projects/d81d0294-984b-4c6d-9ba1-24a278b745a2/files/f570c8ca-3676-4d9e-8b01-08bbe6176ab3.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(1px) brightness(0.7)'
        }}
      />
      <div className="relative z-10">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b-2 border-primary/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h1 className="text-xl md:text-2xl text-primary animate-pulse-glow">
              ROOMTIMESERV
            </h1>
            <div className="flex flex-wrap gap-2 items-center">
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
              <Sheet open={cartOpen} onOpenChange={setCartOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="relative pixel-corners">
                    <Icon name="ShoppingCart" size={18} />
                    {cart.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-accent">
                        {cart.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-card/95 backdrop-blur-md border-primary/30">
                  <SheetHeader>
                    <SheetTitle className="text-primary">Корзина</SheetTitle>
                    <SheetDescription>
                      {cart.length === 0 ? 'Корзина пуста' : `Товаров: ${cart.length}`}
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {cart.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-primary/20">
                        <div>
                          <p className="font-bold text-primary">{item.name}</p>
                          <p className="text-sm text-muted-foreground">{item.price}₽</p>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeFromCart(idx)}
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    ))}
                    {cart.length > 0 && (
                      <div className="space-y-4 pt-4 border-t border-primary/20">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Итого:</span>
                          <span className="text-primary">{getTotalPrice()}₽</span>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="nickname">Ваш никнейм в Minecraft</Label>
                          <Input
                            id="nickname"
                            placeholder="Введите ник"
                            value={purchaseNickname}
                            onChange={(e) => setPurchaseNickname(e.target.value)}
                            className="bg-background/50 border-primary/30"
                          />
                        </div>
                        <Button
                          className="w-full animate-pulse-glow"
                          onClick={handlePurchase}
                        >
                          Оформить заказ
                        </Button>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      <section id="main" className="min-h-screen flex items-center justify-center pt-20 px-4 relative overflow-hidden">
        <div 
          className="absolute left-10 top-1/2 -translate-y-1/2 w-80 h-96 opacity-20 pointer-events-none select-none"
          style={{
            backgroundImage: 'url(https://cdn.poehali.dev/projects/d81d0294-984b-4c6d-9ba1-24a278b745a2/files/fe2c644e-7c50-4df9-8255-d8c752d00c7a.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.7)'
          }}
        />
        <div 
          className="absolute right-10 top-1/2 -translate-y-1/2 w-96 h-[28rem] opacity-30 pointer-events-none select-none"
          style={{
            backgroundImage: 'url(https://cdn.poehali.dev/projects/d81d0294-984b-4c6d-9ba1-24a278b745a2/files/8dfb5e30-d579-4a46-9509-b727255a9167.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.6) contrast(1.2)'
          }}
        />
        <div className="absolute top-20 left-10 text-6xl animate-float opacity-50">⛏️</div>
        <div className="absolute top-40 right-20 text-5xl animate-float opacity-50" style={{ animationDelay: '1s' }}>💎</div>
        <div className="absolute bottom-20 left-1/4 text-7xl animate-float opacity-50" style={{ animationDelay: '2s' }}>🟩</div>
        <div className="absolute bottom-40 right-1/3 text-5xl animate-float opacity-50" style={{ animationDelay: '1.5s' }}>⚔️</div>
        <div className="text-center max-w-4xl animate-fade-in relative z-10">
          <div className="mb-8 animate-float">
            <h2 className="text-4xl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
              ROOMTIMESERV
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4">
              Лучший Minecraft сервер для настоящих геймеров
            </p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <Badge className="bg-accent/20 text-accent border border-accent px-4 py-2 text-sm animate-pulse">
                <Icon name="Star" className="mr-1" size={14} />
                При поддержке Lololoshka & FixPlay
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-card/50 backdrop-blur-sm border-2 border-primary/50 pixel-corners p-6 hover:border-primary transition-all animate-scale-in">
              <div className="flex flex-col items-center gap-4">
                <Badge className="text-sm md:text-base px-4 py-2 bg-secondary">IP сервера</Badge>
                <p className="text-2xl md:text-3xl font-bold text-primary break-all">
                  {serverIP}
                </p>
                <Button onClick={copyIP} size="lg" className="animate-pulse-glow w-full">
                  <Icon name="Copy" className="mr-2" size={20} />
                  Скопировать IP
                </Button>
              </div>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border-2 border-accent/50 pixel-corners p-6 hover:border-accent transition-all animate-scale-in">
              <div className="flex flex-col items-center gap-4">
                <Badge className="text-sm md:text-base px-4 py-2 bg-accent">Онлайн сейчас</Badge>
                <div className="flex items-baseline gap-2">
                  <p className="text-4xl md:text-5xl font-bold text-accent animate-pulse">
                    {onlinePlayers}
                  </p>
                  <Icon name="Users" className="text-accent" size={32} />
                </div>
                <p className="text-sm text-muted-foreground">игроков на сервере</p>
              </div>
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
              { icon: 'Users', label: 'Онлайн 24/7', value: '24/7' },
              { icon: 'Zap', label: 'Без лагов', value: '0ms' },
              { icon: 'Shield', label: 'Защита от читов', value: '100%' },
              { icon: 'Clock', label: 'Работаем', value: '2+ года' }
            ].map((item, idx) => (
              <Card key={idx} className="bg-card/30 border-primary/30 hover:border-primary transition-all hover:scale-105 animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <CardContent className="p-4 text-center">
                  <Icon name={item.icon as any} className="mx-auto mb-2 text-primary" size={32} />
                  <p className="text-2xl font-bold text-accent mb-1">{item.value}</p>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="privileges" className="min-h-screen py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-5xl text-center mb-12 text-primary">Привилегии и товары</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
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
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-2 font-bold">Команды:</p>
                    <div className="space-y-1">
                      {priv.commands.map((cmd, cIdx) => (
                        <code key={cIdx} className="block text-xs bg-background/50 p-1 rounded text-primary">
                          {cmd}
                        </code>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2 font-bold">Возможности:</p>
                    <ul className="space-y-1">
                      {priv.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2 text-xs">
                          <Icon name="Check" className="text-primary mt-0.5 flex-shrink-0" size={12} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button 
                    className="w-full animate-pulse-glow" 
                    size="sm"
                    onClick={() => addToCart({ name: priv.name, price: priv.price, type: 'privilege' })}
                  >
                    <Icon name="ShoppingCart" className="mr-2" size={16} />
                    В корзину
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl text-center mb-6 text-secondary">Дополнительные товары</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {extraItems.map((item, idx) => (
                <Card
                  key={idx}
                  className="bg-gradient-to-br from-accent/20 to-secondary/20 border-2 border-accent/50 hover:border-accent transition-all hover:scale-105 pixel-corners animate-fade-in"
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Icon name={item.icon as any} className="text-accent" size={40} />
                      <div className="flex-1">
                        <CardTitle className="text-xl text-primary">{item.name}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </div>
                      <Badge className="bg-accent text-accent-foreground text-lg">{item.price}₽</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full animate-pulse-glow" 
                      onClick={() => addToCart({ name: item.name, price: item.price, type: 'extra' })}
                    >
                      <Icon name="ShoppingCart" className="mr-2" size={16} />
                      В корзину
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-center text-muted-foreground mt-4 text-sm">
              💡 Товары можно покупать бесконечно и в любом количестве
            </p>
          </div>
        </div>
      </section>

      <section id="reviews" className="min-h-screen py-20 px-4 bg-gradient-to-b from-transparent via-secondary/10 to-transparent">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-5xl text-center mb-12 text-primary">Отзывы и спонсоры</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, idx) => (
              <Card
                key={idx}
                className={`${review.sponsor ? 'bg-gradient-to-br from-accent/30 to-secondary/30 border-accent' : 'bg-card/80 border-primary/30'} hover:border-primary transition-all hover:scale-105 animate-fade-in`}
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg text-primary">{review.name}</CardTitle>
                      {review.sponsor && (
                        <Badge className="bg-accent text-accent-foreground">Спонсор</Badge>
                      )}
                    </div>
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
          
          <Card className="bg-card/80 border-2 border-primary/50 pixel-corners animate-scale-in mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-center">📜 Основные правила</CardTitle>
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

          <Card className="bg-card/80 border-2 border-secondary/50 pixel-corners animate-scale-in">
            <CardHeader>
              <CardTitle className="text-2xl text-center">🛡️ Античит программы</CardTitle>
              <CardDescription className="text-center">
                Программы для проверки игроков на читы
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {antiCheatPrograms.map((program, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`}>
                    <AccordionTrigger className="text-left">
                      <span className="text-primary font-bold">{program.name}</span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{program.desc}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <p className="text-sm text-muted-foreground mt-4 p-3 bg-background/50 rounded border border-primary/20">
                ⚠️ Важно: Проверяющие с рангом Method имеют возможность требовать установить другие программы.
              </p>
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
    </div>
  );
}