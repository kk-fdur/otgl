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
    },
        midsummer: {
        id: "midsummer",
        title: "☀️ 聖真夏の夜のミッドサマー・リーディング",
        subtitle: "太陽が最も長く輝く神秘の特異日、妖精たちが囁くあなたの未来",
        startMonth: 6, startDate: 15, // 6月15日から
        endMonth: 6, endDate: 25,     // 6月25日まで開く
        themeClass: "theme-midsummer",
        usedCards: "今回使用したカード：ミッドサマーオラクル、妖精タロット",
        commonContent: "太陽のエネルギーが最高潮に達する夏至の季節。あなたの心に秘められた情熱や、これまで影に隠れていた本当の願いが、眩い光によって照らし出される時です。少し大胆な一歩が、運命を大きく動かします。",
        horoscope: {
            aries:       { name: "牡羊座", action: "朝一番に太陽の光を浴びる", item: "ゴールドのアクセサリー" },
            taurus:      { name: "牡牛座", action: "ハーブティーをゆっくり淹れて飲む", item: "ミントの葉" },
            gemini:      { name: "双子座", action: "お気に入りの音楽を聴きながら散歩する", item: "黄色いリボン" },
            cancer:      { name: "蟹座",   action: "窓辺に季節の生花を飾る", item: "ガラスのフラワーベース" },
            leo:         { name: "獅子座", action: "キャンドルの灯りで瞑想してみる", item: "シトリンの原石" },
            virgo:       { name: "乙女座", action: "リネン素材の服や小物を身につける", item: "白いコットンのハンカチ" },
            libra:       { name: "天秤座", action: "大切な人に感謝のメッセージを送る", item: "花の香りのアロマ" },
            scorpio:     { name: "蠍座",   action: "夜、静かに鏡を見つめて自分と対話する", item: "アンティーク風の鏡" },
            sagittarius: { name: "射手座", action: "裸足で芝生の上を少し歩いてみる", item: "サンダル" },
            capricorn:   { name: "山羊座", action: "これからの半年間の目標をノートに書く", item: "お気に入りの万年筆" },
            aquarius:    { name: "水瓶座", action: "夕暮れ時の空をじっと眺める", item: "琥珀色のグラス" },
            pisces:      { name: "魚座",   action: "枕の下に好きなカードを忍ばせて眠る", item: "シルクの布" }
        }
    }
};
