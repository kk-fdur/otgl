// 🎃🎄🍫 季節のイベント占いデータ
const eventFortuneData = {
    halloween: {
        id: "halloween",
        title: "🎃 ハロウィン・特別ナイトリーディング",
        subtitle: "夜の帳が降りる時、不思議な札が告げるあなたの裏運勢",
        startMonth: 10, startDate: 15, // 10月15日から
        endMonth: 10, endDate: 31,     // 10月31日まで開く
        themeClass: "theme-halloween",
        usedCards: "今回使用したカード：黒猫タロット、ゴーストトランプ",
        cards: "【引いた手札】 全体: 死神(正) / 対人: 悪魔(逆) / 鍵: 月(正)",
        content: "ハロウィン期間だけの特別なメッセージです。あなたの心の奥底にある、まだ見ぬ才能が目覚める時。少しミステリアスな選択が、今月の運命を好転させるキッカケになりそうです。"
    },
    christmas: {
        id: "christmas",
        title: "🎄 聖夜のクリスマス・キャンドル占い",
        subtitle: "星降る夜に、あなたへ贈る幸運のメッセージ",
        startMonth: 12, startDate: 15, // 12月15日から
        endMonth: 12, endDate: 25,     // 12月25日まで開く
        themeClass: "theme-christmas",
        usedCards: "今回使用したカード：聖夜のオラクル、ゴールドトランプ",
        cards: "【引いた手札】 全体: 星(正) / 対人: 太陽(正) / 鍵: 審判(正)",
        content: "クリスマス限定の奇跡のメッセージ。これまで頑張ってきたことへのご褒美が届く聖なるシーズンです。大切な人への感謝の言葉が、より大きな幸福を呼び込みます。"
    },
    valentine: {
        id: "valentine",
        title: "🍫 秘密のバレンタイン・ショコラリーディング",
        subtitle: "甘くてちょっぴりビターな、恋と対人の特別な導き",
        startMonth: 2, startDate: 1,   // 2月1日から
        endMonth: 2, endDate: 15,      // 2月15日まで開く
        themeClass: "theme-valentine",
        usedCards: "今回使用したカード：チョコレートタロット、ハートトランプ",
        cards: "【引いた手札】 全体: 恋人(正) / 対人: 女帝(正) / 鍵: カップの2",
        content: "バレンタイン限定の愛のメッセージ。心が通じ合う温かい瞬間が増えそうです。自分自身の気持ちに素直になることで、滞っていた関係に甘い進展が訪れます。"
    }
};
