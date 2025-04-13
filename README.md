# european-union-universalis
European Union Universalis. A mod for the game Europa Universalis IV 1.37.

European Union Universalis is a mod for the game Europa Universalis IV which recreates the current (year 2025) borders of the countries, but it's still set in the original start date of November 11, 1444.
In this project you will also find my EUU Dashboard, a very simple site built in html and js that I used to generate the country files in a much more appealing way than just copying and pasting a template file and changing stuff manually, leaving it open to errors.

Why? Why not.

## 🚀 Latest Release: EUU Dashboard v1.0

- Scrollable searchable file managers for `history/countries` and `common/countries`
- Auto-tag generator with real-time preview and local save
- Tag list manager with delete & download
- Modular components (header, footer, navbar) for easy maintenance

[Read full patch notes here](CHANGELOG.md)

Prticularities of this mod:
- Holy Roman Empire: Represents the European Union with the current 27 countries of the union represented as princes of the HRE. Germany is the Emperor at the start of the game.
Princes: Austria, Belgium, Bulgaria, Croatia, Cyprus, Czechia, Denmark, Estonia, Finland, France, Germany, Greece, Hungary, Ireland, Italy, Latvia, Lithuania, Luxembourg, Malta, Netherlands, Poland, Portugal, Romania, Slovakia, Spain, Sweden.
Electors: Germany, France, Italy, Netherlands, Belgium. (These are the founder states of the European Union so it's only fair.)
Free Cities: Cyprus, Luxembourg, Malta. (Note: This is way less than the 12 free cities required by the HRE mechanics. The emperor will have a negative modifier to Imperial Authority due to this.)
Why is Germany the Emperor? Why not.

- United Kingdom: Well, they're not in the European Union so they're not in the HRE like most of their neighbours but I still wanted to do something fun with them. I didn't form Great Britain but instead I made Wales, Scotland and Northern Ireland tributaries of England. Scotland has high liberty desire at the start of the game.

- Great Powers: They are calculated automatically by the game after starting the savefile. This is what you'll find in it in this version.
  1.
  2.
  3.
  4.
  5.
  6.
  7.
  8.

- Institutions and Technology: To make it make sense, I followed the wikipedia classification of developing country while setting up the institutions and technology level of all countries in the savefile. (https://en.wikipedia.org/wiki/Developing_country)
1. Developed countries: Feudalism embraced. All technologies level 3.
2. Emerging and developing countries: Feudalism not embraced but spawned in the capital province. All technologies level 2.
3. Least developed countries: Feudalism not embraced. All technologies level 1.

- Religion and Culture: It's a lot of work and I don't really know enough to make informed decisions that won't piss off anyone. They have remained unchanged from the religions assigned to the countries/provinces originally by the game, but this might change in future versions. 

- National Ideas: The national ideas of the original countries with some exceptions:
1. Formable nations: Spain, Ireland or Germany among others have chosen the new ideas and ambitions if prompted to do so.
2. Released countries: Any country that was released as a vassal of other country will have the ideas of the country it was formed with (Slovakia has Nitryan ideas, for example).

- Ongoing wars: You'll find that there are two ongoing wars at the start of the game. Russian conquest of Crimea and Israeli conquest of Palestine. These should be self-explanatory.

Future plans for this project:
I plan to update the mod with more details (more accurate religion map, provinces of interest, some set alliances, etc) when I find the time, energy and motivation to do so. Don't expect updates often but feel free to contribute to the project with a pull request that describes the suggested changes, or to make suggestions to me via discord.

I hope you enjoy playing it as much as I enjoyed making it and letting it run all night whilst I slept with the computer on observer mode to find out what happened in the morning.
If you play it and decide to make a video about it don't be shy about sharing it, I'm very curious to see what you do with this file. Any feedback on what nations feel super strong or super weak is also welcome.
