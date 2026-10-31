// 🎃🎄🍫 季節のイベント占いデータ（共通運勢＋12星座別アドバイス）
const eventFortuneData = {
    halloween: {
        id: "halloween",
        title: "🎃 ハロウィン・特別ナイトリーディング",
        subtitle: "夜の帳が降りる時、不思議な札が告げるあなたの裏運勢",
        startMonth: 10, startDate: 15,
        endMonth: 10, endDate: 31,
        themeClass: "theme-halloween",
        usedCards: "今回使用したカード：黒猫タロット、ゴーストトランプ",
        // 全員に共通するイベントの全体運
        commonContent: "ハロウィン期間だけの特別なメッセージです。あなたの心の奥底にある、まだ見ぬ才能が目覚める時。少しミステリアスな選択が、今月の運命を好転させるキッカケになりそうです。",
        
        // 🌟 12星座別のラッキーアドバイス
        horoscope: {
            aries:       { name: "牡羊座", action: "夜風を感じながら散歩する", item: "黒猫のモチーフ" },
            taurus:      { name: "牡牛座", action: "少し贅沢なスイーツを食べる", item: "キャンドル" },
            gemini:      { name: "双子座", action: "秘密の計画をノートに書き出す", item: "紫色のペン" },
            cancer:      { name: "蟹座",   action: "古い映画やホラー映画を観る", item: "アンティークな鍵" },
            leo:         { name: "獅子座", action: "いつもと違う未知の道を歩く", item: "ゴールドの指輪" },
            virgo:       { name: "乙女座", action: "部屋の照明を少し暗くしてみる", item: "お気に入りの香水" },
            libra:       { name: "天秤座", action: "仮装気分で少し派手な服を着る", item: "ダークチョコレート" },
            scorpio:     { name: "蠍座",   action: "自分の直感を信じて即決する", item: "タロットカード" },
            sagittarius: { name: "射手座", action: "不思議な噂話に耳を傾ける", item: "星のチャーム" },
            capricorn:   { name: "山羊座", action: "普段は読まないジャンルの本を読む", item: "レトロなブックマーク" },
            aquarius:    { name: "水瓶座", action: "夜遅くに温かい飲み物を飲む", item: "マグカップ" },
            pisces:      { name: "魚座",   action: "夢日記をつけてみる", item: "シルクの枕カバー" }
        }
    },
    christmas: {
        id: "christmas",
        title: "🎄 聖夜のクリスマス・キャンドル占い",
        subtitle: "星降る夜に、あなたへ贈る幸運のメッセージ",
        startMonth: 12, startDate: 15,
        endMonth: 12, endDate: 25,
        themeClass: "theme-christmas",
        usedCards: "今回使用したカード：聖夜のオラクル、ゴールドトランプ",
        commonContent: "クリスマス限定の奇跡のメッセージ。これまで頑張ってきたことへのご褒美が届く聖なるシーズンです。大切な人への感謝の言葉が、より大きな幸福を呼び込みます。",
        horoscope: {
            aries:       { name: "牡羊座", action: "イルミネーションを見に行く", item: "赤いマフラー" },
            taurus:      { name: "牡牛座", action: "温かいスープを作る", item: "シナモンスティック" },
            gemini:      { name: "双子座", action: "手書きのメッセージカードを送る", item: "銀色のリボン" },
            cancer:      { name: "蟹座",   action: "お気に入りのクリスマスソングを聴く", item: "スノードーム" },
            leo:         { name: "獅子座", action: "自分に少し高価なプレゼントを買う", item: "シャンパングラス" },
            virgo:       { name: "乙女座", action: "1年の振り返りを日記に書く", item: "白い手帳" },
            libra:       { name: "天秤座", action: "部屋にモミの木やリースを飾る", item: "松ぼっくり" },
            scorpio:     { name: "蠍座",   action: "キャンドルの炎をじっと見つめる", item: "アロマキャンドル" },
            sagittarius: { name: "射手座", action: "星空を見上げて願い事をする", item: "ゴールドのピアス" },
            capricorn:   { name: "山羊座", action: "伝統的な焼き菓子を食べる", item: "シュトーレン" },
            aquarius:    { name: "水瓶座", action: "誰かのために小さなサプライズをする", item: "ギフトボックス" },
            pisces:      { name: "魚座",   action: "お風呂にゆっくり浸かってリラックスする", item: "バスソルト" }
        }
    },
    valentine: {
        id: "valentine",
        title: "🍫 秘密のバレンタイン・ショコラリーディング",
        subtitle: "甘くてちょっぴりビターな、恋と対人の特別な導き",
        startMonth: 2, startDate: 1,
        endMonth: 2, endDate: 15,
        themeClass: "theme-valentine",
        usedCards: "今回使用したカード：チョコレートタロット、ハートトランプ",
        commonContent: "バレンタイン限定の愛のメッセージ。心が通じ合う温かい瞬間が増えそうです。自分自身の気持ちに素直になることで、滞っていた関係に甘い進展が訪れます。",
        horoscope: {
            aries:       { name: "牡羊座", action: "直感で惹かれたカフェに入る", item: "ピンクのリップ" },
            taurus:      { name: "牡牛座", action: "カカオ分の高いチョコをじっくり味わう", item: "ビターショコラ" },
            gemini:      { name: "双子座", action: "好きな人や友達に軽い連絡を入れてみる", item: "スマホケース" },
            cancer:      { name: "蟹座",   action: "手作りのお菓子や料理に挑戦する", item: "エプロン" },
            leo:         { name: "獅子座", action: "自分の好きなところを3つ褒める", item: "ハートの鏡" },
            virgo:       { name: "乙女座", action: "机の上の整理整頓をする", item: "レターセット" },
            libra:       { name: "天秤座", action: "お花の香りのするアイテムを使う", item: "ローズのハンドクリーム" },
            scorpio:     { name: "蠍座",   action: "秘密のメッセージを心に秘める", item: "鍵付きのノート" },
            sagittarius: { name: "射手座", action: "行ったことのないお店を開拓する", item: "赤いスニーカー" },
            capricorn:   { name: "山羊座", action: "お気に入りのカフェで読書する", item: "コーヒーカップ" },
            aquarius:    { name: "水瓶座", action: "SNSで素敵な投稿にいいねをする", item: "ワイヤレスイヤホン" },
            pisces:      { name: "魚座",   action: "恋愛映画を観てキュンとする", item: "シルクのスカーフ" }
        }
    }
};
