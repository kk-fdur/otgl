const tarotDeck = [
    {
        name: "0. 愚者 (The Fool)",
        image: "images/00_fool.png",
        upright: "新しい旅のはじまりです。\n心を軽くして、少しだけ自由に進むとよいでしょう。",
        reversed: "迷いや不安があるかもしれません。\n一歩ずつ、安心できる方向へ進めばよいでしょう。"
    },
    {
        name: "1. 陰陽師 (The Onmyouji)",
        image: "images/01_magician.png",
        upright: "あなたの力が静かに育っています。\n自分のペースで、しっかり使ってみるとよいでしょう。",
        reversed: "まだ準備が整っていないように感じられるかもしれません。\n焦らず、ひとつずつ整えていくとよいでしょう。"
    },
    {
        name: "2. 御巫 (The Mikannagi)",
        image: "images/02_priestess.png",
        upright: "直感がやさしくささやいています。\n小さな気づきにも耳を傾けてみるとよいでしょう。",
        reversed: "心の声が聞き取りにくいときもあります。\n静かな時間をつくって、安心して向き合うとよいでしょう。"
    },
    {
        name: "3. 女帝 (The Empress)",
        image: "images/03_empress.png",
        upright: "豊かさとやすらぎがそっと訪れます。\n自分をいたわる時間を大切にするとよいでしょう。",
        reversed: "無理をしていないか、ときどき見直すとよいでしょう。\n休むことも、ちゃんとした大事な行動です。"
    },
    {
        name: "4. 皇帝 (The Emperor)",
        image: "images/04_emperor.png",
        upright: "安定をつくる時です。\n計画を整えて、着実に進むとよいでしょう。",
        reversed: "頑固さが少し重く感じられることもあります。\n柔らかさを少し足してみるとよいでしょう。"
    },
    {
        name: "5. 神主 (The Kannusi)",
        image: "images/05_hirophant.png",
        upright: "知恵や伝統があなたを支えています。\n信頼できるものを大切にしながら進むとよいでしょう。",
        reversed: "古い考えにとらわれている気がするかもしれません。\n新しい視点を、やさしく受け入れるとよいでしょう。"
    },
    {
        name: "6. 恋人 (The Lovers)",
        image: "images/06_lovers.png",
        upright: "つながりの時間が大切な時です。\n心を開いて、温かい関係を育むとよいでしょう。",
        reversed: "気持ちのすれ違いを感じているかもしれません。\n本音を、やさしく伝えてみるとよいでしょう。"
    },
    {
        name: "7. 戦車 (The Chariot)",
        image: "images/07_chariot.png",
        upright: "意志がしっかりしている時です。\n目標に向かって、落ち着いて前へ進むとよいでしょう。",
        reversed: "勢いが少し乱れているように見えます。\nペースを整えて、ゆっくり進めばよいでしょう。"
    },
    {
        name: "8. 力 (Strength)",
        image: "images/08_strength.png",
        upright: "優しさと強さが同時にある時です。\n静かに乗り越えていけるでしょう。",
        reversed: "気持ちが強すぎて、心が疲れているかもしれません。\n自分をいたわる時間も大事にするとよいでしょう。"
    },
    {
        name: "9. 隠者 (The Hermit)",
        image: "images/09_hermit.png",
        upright: "少し離れて考える時間が必要です。\n静かに内側を見て、答えを見つけるとよいでしょう。",
        reversed: "孤独を感じていることもあるでしょう。\n一人で抱え込まず、そっと手を伸ばすとよいでしょう。"
    },
    {
        name: "10. 運命の輪 (Wheel of Fortune)",
        image: "images/10_wheel of fortune.png",
        upright: "大きな変化がやってくる時です。\n流れに乗って、自然に進むとよいでしょう。",
        reversed: "変化に少し怖さを感じているかもしれません。\n急がず、少しずつ受け止めていくとよいでしょう。"
    },
    {
        name: "11. 正義 (The Justice)",
        image: "images/11_justice.png",
        upright: "公平さと誠実さが大事な時です。\n冷静に見て、整然と進むとよいでしょう。",
        reversed: "偏りや混乱が少しあるように感じられます。\n本音を見極めて、やさしく整えるとよいでしょう。"
    },
    {
        name: "12. 吊るされた男 (The Hanged Man)",
        image: "images/12_hanged_man.png",
        upright: "一度立ち止まる時間が必要です。\n今は、見えなかったものが見えてくるでしょう。",
        reversed: "動き出したくても少しつまずいているかもしれません。\n立ち止まって、心を整えるとよいでしょう。"
    },
    {
        name: "13. 死神 (Death)",
        image: "images/13_death.png",
        upright: "終わりと始まりが重なる時です。\n手放すことで、やわらかな新しい道が開くでしょう。",
        reversed: "変化への戸惑いがあるかもしれません。\n時間をかけて、少しずつ受け入れていくとよいでしょう。"
    },
    {
        name: "14. 節制 (Temperance)",
        image: "images/14_temperance.png",
        upright: "バランスが大切な時です。\n穏やかに進めば、心も整っていくでしょう。",
        reversed: "偏りが少し気になるときです。\n自分に優しく、ほどよいペースを見つけるとよいでしょう。"
    },
    {
        name: "15. 悪魔 (The Devil)",
        image: "images/15_devil.png",
        upright: "執着や不安に気づくときです。\nそれを見つめて、自分を守る選択をするとよいでしょう。",
        reversed: "束縛から少し抜け出せる時です。\n自由になるために、やさしく手放すとよいでしょう。"
    },
    {
        name: "16. 塔 (The Tower)",
        image: "images/16_tower.png",
        upright: "大きな変化がやってくる時です。\n古いものを手放して、新しい流れを受け入れるとよいでしょう。",
        reversed: "変化に少し怖さを感じているかもしれません。\n慌てず、静かに一歩ずつ進むとよいでしょう。"
    },
    {
        name: "17. 星 (The Star)",
        image: "images/17_star.png",
        upright: "希望がちゃんとあります。\n自分を信じて、まっすぐ進むとよいでしょう。",
        reversed: "落ち込みや不安が一時的に強いときです。\n少し休んで、安心できる場所を探すとよいでしょう。"
    },
    {
        name: "18. 月 (The Moon)",
        image: "images/18_moon.png",
        upright: "直感を信じてみるとよいでしょう。\n見えないものが、やがて少しずつ見えてくるでしょう。",
        reversed: "心が混乱している時もあります。\n思い込みをほどいて、静かな気持ちを取り戻すとよいでしょう。"
    },
    {
        name: "19. 太陽 (The Sun)",
        image: "images/19_sun.png",
        upright: "明るさと喜びが広がる時です。\n前向きな気持ちを大切にするとよいでしょう。",
        reversed: "少し光が薄く感じるときもあります。\n自分の内側に、やさしい気持ちを灯すとよいでしょう。"
    },
    {
        name: "20. 審判 (Judgement)",
        image: "images/20_judgement.png",
        upright: "振り返ると、進むべき道が見えてくるでしょう。\n自分の答えを信じて、決めるとよいでしょう。",
        reversed: "決断を先に延ばしているときです。\n少しずつでも、答えに向かって進むとよいでしょう。"
    },
    {
        name: "21. 世界 (The World)",
        image: "images/21_world.png",
        upright: "大きな満足と完成が近いようです。\n今の自分を、ちゃんと認めるとよいでしょう。",
        reversed: "まだつながりが十分でない気がするかもしれません。\nひとつずつ整えて、やわらかく進むとよいでしょう。"
    }
];

window.tarotDeck = tarotDeck;
