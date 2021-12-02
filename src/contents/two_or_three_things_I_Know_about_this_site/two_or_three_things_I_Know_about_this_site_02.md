---
title: ベースとなる技術ついて私が知っている二、三の事柄
permalink: /two_or_three_things_I_Know_about_this_site/02/index.html
eleventyNavigation:
  parent: two_or_three_things_I_Know_about_this_site
  key: ベースとなる技術ついて私が知っている二、三の事柄
  title: ベースとなる技術ついて私が知っている二、三の事柄
  order: 2
layout: layouts/page.njk
metaDesc:
date: 2021-06-07
updated: 2021-07-04
cssBodyId: page
tags:
  - rss
---

ここでは11ty/Eleventy _以外_ の技術に関して、以下、戯言を。

[[toc]]

### Bulma CSS Framework

- [Bootstrap](https://getbootstrap.com/)
- [MaterializeCSS](https://materializecss.com/)
- [Bourbon](https://github.com/thoughtbot/bourbon/) / [Neat](https://github.com/thoughtbot/neat) / [Bitters](https://github.com/thoughtbot/bitters) / [Refills](https://github.com/thoughtbot/refills)
- [Skeleton](http://getskeleton.com/)
- [Milligram](https://milligram.io/)
- [CodyHouse](https://codyhouse.co/)
- [skel](https://github.com/ajlkn/skel) via [HTML5 UP!](https://html5up.net/)

これらのトレンドが、自分の中であったのかなーと今にして思います。  
いや別に時と場合によっては、素のBootstrapに[Bootswatch](https://bootswatch.com/)を被せる程度、もしくは[Honoka](https://honokak.osaka/)を使うよ、程度の想いもありますが。  
ちなみに最初の2つ、割と重めに感じるので基本、素のままで使いたいかなぁ、ですが、それ以降は、それぞれの開発者様が提供しているSass/SCSSをイジりたいかな、ですね。  

…のですが、今回は`npm install bulma`しましたし、今後はこのパターンを採用すると思います。  
Bulmaの場合だと、Webpackでの利用方法ではありますが、[Add your own Bulma styles - With webpack](https://bulma.io/documentation/customize/with-webpack/#9-add-your-own-bulma-styles)とありますので、それを参考にしました。  
外部に公開している変数を先に書き換えて…何となくの感覚的にですが、微妙にうまく行かない事も無い事も無い気がしますが…それはともかく、次いで、Bulmaの各コンポーネントを`@import`する、と、分かってしまえば実に簡単な仕組みだなと。  
ちなみに、本家のこの作例だと、取り込まれない機能があります。  
このため`./node_modules/bulma/bulma.sass`を参照して下さい。  
感覚的には変数を書き換えるだけとは申しましたが、かなーりアチコチに飛んで、という印象ですが、そもそもそういうモノだからそれに従うしか、ですね。

[Tailwind CSS](https://tailwindcss.com/)も十分、視野に入っていました…が、使用を見送りました。  
所詮は戯言にしか過ぎませんが、コンポーネント指向のプロダクトを使う場合、いいのではないかと感じています。  
例えば「[Tailwind CSSが私には合わなかった理由 | コリス](https://coliss.com/articles/build-websites/operation/css/why-tailwind-css-is-not-for-me.html)」にありますが…本文、そのほとんどを自分は理解できませんでしたが、`@apply`を使いたい欲求に駆られるだろうな、でもコレ使っちゃうとTailwindの利点、消してしまわないか、でもPurgeできるのはいいよな、別にミリ秒を競うサイトを構築している訳じゃないにしても、みたいな？

および、恥ずかしながら自分、コンポーネントを独自で実装できないのですよね…  
ヘッダを全面画像、かつ、カルーセルにする、トップ固定のナビゲーションなどの実装を。  
起点は有料・無料のテンプレートありきで、そのため、Bourbonを核とするプロダクト群やHTML5 UP、CobyHouseなどは結構、有用かなと思っています…が、前者2つは現在、開発が止まっているな、という印象です。

### Nunjucks

個人的には、タブやスペースのインデントで管理しなければならないというデメリット…なのかな、それもありますが、記述量が格段に少ない[Jade/Pug](https://pugjs.org/)が好きですね。  
11ty/EleventyでもPugを扱えますが、[Nunjucks](https://mozilla.github.io/nunjucks/)とPugでは扱える機能に差があるので、初見ですがNunjucksを選択しました。

- [Template Language—Nunjucks | Eleventy, a simpler static site generator.](https://www.11ty.dev/docs/languages/nunjucks/)
- [Pug | Eleventy, a simpler static site generator.](https://www.11ty.dev/docs/languages/pug/)

もしもPugがNunjucksと同程度の機能を提供していたら当然使っていたと思いますし、Bulma CSSではなくTailwind CSSを選択していただろうな、と思います。

ちなみにPHPでは[Twig](https://twig.symfony.com/)一択でした、です。  
このため、Pugでデザインしても結局は素のHTMLにしないと使えない訳で、一方で[Phug](https://phug.selfbuild.fr/)や[pug-php/pug](https://github.com/pug-php/pug)も存在するらしいのですが、まだ試用すらしていない段階です。

### Laravel Mix …の採用は現在、見送ってます

現在リリースしているこのバージョンは、[Learn Eleventy From Scratch - Piccalilli](https://piccalil.li/course/learn-eleventy-from-scratch/)を参考にしたためで、それ以前、ゼロベースでLaravel Mixから構築していました。  
どこかの段階で切り替えたいとは思ってはいますが。

正直なトコロ、[Webpack](https://webpack.js.org/)ですら、よく分かってない、というのが本音です。  
具体的には、`npm install --save-dev HOGE`して、`webpack.config.js`にゴリゴリと、みたいな使い方できるのかと問われると、今の段階では[Laravel Mix](https://laravel-mix.com/)も含めて「無理です」としか。  
何と言いますかね、 Webpackの概念やインストールの日本語記事は豊富にヒットしますがその先、さぁ使ってみるぞ、じゃぁこのプロジェクトに実戦投入してみるか、の段階でアタマが真っ白になり、手が動かない、みたいな…という思いがありますね。  
これは別にWebpackだけに限らず、フロントエンド全般に言えるのではないかなーと以上老害の戯言…単なるスキル不足です、で片付く問題だと思いますが。

例えばPHPフレームワークをベースにしたプロダクトの場合、それが使っているからそれをそのままで使う、みたいな、あるプロダクトやスタータキットが使っているから、自分もそのままで使っているレベルでいいのではないか、ブラックボックスはブラックボックスのままに一旦はしておいて、別に特段構えて取り組むモノでもないかな、ですかねぇ…セキュリティが絡むとかなり危険かもしれませんが…

Laravel Mixに目を向けた理由ですが、これまたイマイチ状況が掴みにくいSass/SCSS周りを簡単に扱える、というのが大きいです…が、[Node.js](https://nodejs.org/ja/)のバージョンに依存する…のかな、このため、[nvm](https://github.com/nvm-sh/nvm)の使用が前提となる、かもしれませんが。

具体的には、下記の記事や11ty/Eleventyの[スタータプロジェクト](https://www.11ty.dev/docs/starter/)を参考にしました。  
思っていたよりも複雑ではなかったかな、という印象です…表層上を「撫でる」程度の利用レベルだと。

- [Compiling your front-end assets with Laravel Mix while your 11ty site builds, so you don't have to switch between processes - Mike Street - Lead Developer and CTO](https://www.mikestreety.co.uk/blog/using-laravel-mix-with-eleventy-11ty)
- [josephdyer/skeleventy: A skeleton boilerplate built with Eleventy.](https://github.com/josephdyer/skeleventy)

当初見えなかったのは、「どうやって11ty/EleventyとWebpackやLaravel Mixを連動させているのかな、それぞれのコンフィグで何かやってるのかな」でした。  
個人的な結論を言えば、「連動させていない」かなと思います。  
なのでもしも連動させているとすれば、`package.json`の`scripts`で起動をコントロールしているという印象です…が、`npm run`って今まで避けてきた課題でしたので、これを機会に本腰を入れて、になりました。  
それと例えば[Browsersync](https://www.browsersync.io/)やSass/SCSSは、WebpackやLaravel Mixでも11ty/Eleventyでも管理できるので、どの機能はどちらで管理するのか、といった切り分けは必要かもしれません…が、今は何となくの雰囲気で何とかなってるヨシ！といった状況ですね。

### じゃぁGulpは今後使わないの？

いやそれはないと思いますよ。  
チーム開発は別に、私自身に限っては、ですが。  
おそらくですが、今後も半分趣味でもあるHTMLテンプレート漁りはすると思います。  
その時、より深くイジりたいな、という欲求が生じた場合、Gulpをベースに環境を構築するのが手っ取り早いかな、という使い方になると思いますが。

今回、Gulpを採用しているのは、前述の「Learn Eleventy From Scratch」で、「ああ、Gulpのタスク分割って、こうやるんだ…」が、ようやく、ようやく分かったので…逆に言うと、Laravel Mixでもその方法が分かれば移行するのではないかと…
ちなみに、各機能を`module.exports`して、`gulpfile.js`で`require`してるだけと言えばそれだけですが…そこまで解説している日本語情報って…多分あるのかもしれませんが…
