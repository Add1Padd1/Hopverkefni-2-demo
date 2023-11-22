# Hopverkefni-2
Hópverkefni 2 - Hópur 1
Keyra skal verkefnið með npm install og svo npm run dev

// Verkefnið er sett með index.html þar sem innihald síðunnar birtist í, styles.css sem er notað fyrir útlit og grid.css sem er notað til að ná skalanleika. 

// Erum síðan með js skrár sem sjá um javascript og interactivity á síðunni.

api.js inniheldur öll föll sem fetcha upplýsingar úr viðeigandi linkum og returnar þeim.

ui.js inniheldur öll föll sem fara í að rendera upplýsingarnar úr api og rendera síðurnar sem við viljum að birtist.

index.js tekur ui föllin og sér um hvaða síða er birt á skjánum undir hvaða kringumstæðum ásamt því að sjá til þess að hægt sé að fara fram og afturábak í history.

package.json er skrá sem er notuð til að installa scriptum, t.d. dev sem er notað til að runna browser sync, lint sem sýnir syntax villur í kóðanum, prettier sem hjálpar að gera kóðann eins smooth og hægt er og loks build sem birtir einungis js. html. og css. skrárnar á vef svo að netlify útgáfan getur runnað án þess að veita notendum of margar upplýsingar.

Hópmeðlimir: 
Arnaldur Ólafsson, Add1Padd1 á Github
Sævar Axel, SaevarIII á Github
Atlas Hendrik Ósk Dagbjarts, Atlas-Hendrik á GitHub

Skipt var verkefninu í þrennt:

Arnaldur sá um að redda almennri tengingu við vefþjón og html og láta viðeigandi upplýsingar birtast á forsíðu, vörusíðu, vörulista og vöruflokk (valin virkni).

Sævar Axel sá um að redda almennum skalanleika síðunnar, semsagt gridi og föll sem breyta hvernig staðsetning boxa breytist eftir því sem síðan minnkar eða stækka. Það er gert til að auka sveigjanleika síðunnar eftir skjástærð eða t.d. ef síðan væri notuð á mobile.

Atlas Hendrik sá um að redda almennu útliti síðunnar, semsagt styles.css og öllum klösum sem voru gerðir fyrir alla elementa síðunnar.
