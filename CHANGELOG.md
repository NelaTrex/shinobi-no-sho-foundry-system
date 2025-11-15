# CHANGELOG

## [1.13.3](https://github.com/SouOWendel/shinobi-no-sho/compare/v1.13.2...v1.13.3) (2024-12-14)


### Bug Fixes

* **macros:** fixed the defense macro for NPCs ([351029d](https://github.com/SouOWendel/shinobi-no-sho/commit/351029d20f7ad52b0eb651845ba8c6218688089a))

## [1.13.2](https://github.com/SouOWendel/shinobi-no-sho/compare/v1.13.1...v1.13.2) (2024-12-13)


### Bug Fixes

* **initiative:** fixed the initiative for NPC sheet (it was not calculated) ([22cee97](https://github.com/SouOWendel/shinobi-no-sho/commit/22cee97b561c41e3fa0c7a2e23a5613e8409dbc1))
* **macros:** fixed the macros of system to work on NPC sheet ([0b033a0](https://github.com/SouOWendel/shinobi-no-sho/commit/0b033a0bde3adcd2bf1c1ff987ae0e7ce658c1bb))

## [1.13.1](https://github.com/SouOWendel/shinobi-no-sho/compare/v1.13.0...v1.13.1) (2024-12-06)


### Bug Fixes

* **area template:** added custom field on 'armas' and 'tecnicas' ([a2e0466](https://github.com/SouOWendel/shinobi-no-sho/commit/a2e04660805405d681068aa48eef4b0030d9f280))

## [1.13.0](https://github.com/SouOWendel/shinobi-no-sho/compare/v1.12.0...v1.13.0) (2024-12-05)


### Features

* **areaTemplate:** added more options to calculate the area and modified the custom option ([30e9aa9](https://github.com/SouOWendel/shinobi-no-sho/commit/30e9aa929c6e8dc9a120530e3be3aea37127650b))


### Bug Fixes

* **general item:** changed the 'medium device' for 'default device' ([3169942](https://github.com/SouOWendel/shinobi-no-sho/commit/316994256f2ddbc522471d45aa1c20aa3df06114))
* **sheets:** translated 'name' placeholder for portuguese ([dd024d8](https://github.com/SouOWendel/shinobi-no-sho/commit/dd024d8ed0741c50ebdcf71c6316efb5a04f8464))

## [1.12.0](https://github.com/SouOWendel/shinobi-no-sho/compare/v1.11.0...v1.12.0) (2024-11-01)


### Features

* **actor:** added derived data to NPC sheet, this only include calculations for bonus ([0243f35](https://github.com/SouOWendel/shinobi-no-sho/commit/0243f354308eb67c2706652de99b3b392bbc7775))
* **d8roll:** adjust the parts of formula to exclude null and zero values ([ba863bf](https://github.com/SouOWendel/shinobi-no-sho/commit/ba863bf31dc1683ac1e5fd045fb371b15ecd5d00))
* **localization:** added abbreviations for skills to add on NPC sheet ([995e198](https://github.com/SouOWendel/shinobi-no-sho/commit/995e19884cc592a021f30932cbf0aab0996abeea))
* **localization:** added NPC type localization ([4d13e6b](https://github.com/SouOWendel/shinobi-no-sho/commit/4d13e6ba7afb9c95d5ef5e27f12ffad9ca35ccce))
* **localization:** added texts for token size configuration ([5d40301](https://github.com/SouOWendel/shinobi-no-sho/commit/5d40301b20416b0b44bc9102dbb5b663d8281306))
* **migration, settings, token bar:** added migration and his conditions, configured the token bar for system and brawl bar module ([9f3cf28](https://github.com/SouOWendel/shinobi-no-sho/commit/9f3cf28f68184533a63ca126b4a0185899530fbb))
* **migration:** added migration system with migrations for 'absorcao' on ninja sheet ([8b12911](https://github.com/SouOWendel/shinobi-no-sho/commit/8b129112df47ca4abc483628c9fbd85836f596b5))
* **NPC sheet templates:** created the layout of NPC sheet with tabs, new skills layout, modifications on combat abilities and more, similar to ninja sheet ([92f3c64](https://github.com/SouOWendel/shinobi-no-sho/commit/92f3c648c671ce052594639782cb3bb7f52845f2))
* **NPC:** created the NPC sheet with data structure, item organization, and some functions of the ninja sheet ([5325ea3](https://github.com/SouOWendel/shinobi-no-sho/commit/5325ea3f1138cdf4c19360cdf491fec04f78cad2))
* **settings:** settings for token syze system and migration version ([75fbec1](https://github.com/SouOWendel/shinobi-no-sho/commit/75fbec1f2ab4167739061ae21b60a2ecf79cdc2c))
* **templates.mjs:** added template parts of npc sheet with respective partials ([1c5f589](https://github.com/SouOWendel/shinobi-no-sho/commit/1c5f589d982cccf4da3b91d213725c22eb1cb0c9))
* **token sizes:** the active tokens on the scene now changes the size too. Added an option to deactive the changes on token size ([55c5efd](https://github.com/SouOWendel/shinobi-no-sho/commit/55c5efd56bb50acf12151820b1fa6db35921f6a8))


### Bug Fixes

* **actor ninja sheet:** deleted unnecessary div tag ([201831f](https://github.com/SouOWendel/shinobi-no-sho/commit/201831f99e805a3f359015ae7dde3fd4aade4a08))
* **actor ninja sheet:** fixed the scrollbar on skill tab ([1f68b02](https://github.com/SouOWendel/shinobi-no-sho/commit/1f68b02e939003fba50be1cc4103125bcf4e7331))
* **field:** fixed a name and value on sheet (absorcao) ([512d6ce](https://github.com/SouOWendel/shinobi-no-sho/commit/512d6ce425a68313dd14d7596677db7b325896e9))
* **ninja sheet:** changed the margin and padding of 'pericia livre' ([701ab15](https://github.com/SouOWendel/shinobi-no-sho/commit/701ab157140fd5c91cc6776870ab1f31c0f1a088))
* **ninja sheet:** fixed the icons of font awesome on combat tab ([c9c6217](https://github.com/SouOWendel/shinobi-no-sho/commit/c9c6217037a35ded77d0b11ccccf0cf4bc90fe86))

## [1.11.0](https://github.com/SouOWendel/shinobi-no-sho/compare/v1.10.2...v1.11.0) (2024-10-19)


### Features

* **actor ninja sheet:** added 'tamanho' field on sheet with localizations and data ([448d750](https://github.com/SouOWendel/shinobi-no-sho/commit/448d7505e016c5aca01d7bd65ea29e60862b0188))
* **actor ninja sheet:** added new row on inventory for device items ([2c95141](https://github.com/SouOWendel/shinobi-no-sho/commit/2c951419e70b75764776fe898e52a763148c0da4))
* **actor ninja sheet:** changed the path of 'dureza' data and some breaklines ([a393313](https://github.com/SouOWendel/shinobi-no-sho/commit/a393313304ba2b582ce933df7f42ade7bc430f40))
* **css/sass:** added styles for new skills and increase/decrease system ([74fea53](https://github.com/SouOWendel/shinobi-no-sho/commit/74fea53e127e777ee2279ddba9c71ede6e480d23))
* **css/sass:** refactor the header fields with second version and added input center utils class ([ff48508](https://github.com/SouOWendel/shinobi-no-sho/commit/ff48508c960d61049474ac36dcd77193625deeed))
* **dynamic token size:** now the size of tokens are changed dynamically ([f840159](https://github.com/SouOWendel/shinobi-no-sho/commit/f840159b13a156befe82a0f5f6925fecdcb88f9e))
* **field dureza:** added the data structure, styles and dureza field ([71a6970](https://github.com/SouOWendel/shinobi-no-sho/commit/71a69705fdd498c79b4ff8b8a6ad2e737cea276e))
* **general item sheet:** rearrangement of the layout and added 'usos' fields ([113cf48](https://github.com/SouOWendel/shinobi-no-sho/commit/113cf48d4b7c315cc9072121f2a1abdc5b0860ab))
* **general item:** added new types for techniques and general items and damage type for weapons ([d14a66a](https://github.com/SouOWendel/shinobi-no-sho/commit/d14a66a82ea9eedfe171e1b7df9590b1a7e7d308))
* **increase/decrease + new skills:** added 'voo' and an open expertise, overmore, added increase and decrease system with fields ([c68e6cc](https://github.com/SouOWendel/shinobi-no-sho/commit/c68e6cc1935a360c23a68243fe7303770262a2fa))
* **item geral sheet:** centralized the quantity label ([fafceb2](https://github.com/SouOWendel/shinobi-no-sho/commit/fafceb2f01673cfc10183888cc399a35e5750f55))
* **ninja actor inventory:** now 'dispositivos' are created on the own category ([5201996](https://github.com/SouOWendel/shinobi-no-sho/commit/52019967608cdf31f9fbc7eae6aaa749d6b8e98f))
* **onRoll:** added the name of 'pericia livre' now are displayed on chat rolls ([fa270aa](https://github.com/SouOWendel/shinobi-no-sho/commit/fa270aa23d7942797fe485f4acc05f3b627175e6))
* **size feature:** added dynamic changes on 'vigor' and 'força' ([b45050d](https://github.com/SouOWendel/shinobi-no-sho/commit/b45050d64a73c8f9bace1caf4cccfa3ed9ef1257))
* **size feature:** makes changes when the size changes on actors ([edb7a4c](https://github.com/SouOWendel/shinobi-no-sho/commit/edb7a4c781efa47ba30612c28082540b74efb135))
* **skills:** added two new skills: 'voo' and 'pericia livre' ([ae1aed6](https://github.com/SouOWendel/shinobi-no-sho/commit/ae1aed679fe37fb09864fa9ee2f6cf388f0947aa))
* **template.json:** added 'usos' for general items ([beaa5dc](https://github.com/SouOWendel/shinobi-no-sho/commit/beaa5dc45ba71d0b3708b21f793ecf3bff38b843))
* **tokenSizes:** adjust sizes ([adf9980](https://github.com/SouOWendel/shinobi-no-sho/commit/adf9980e072f0ece4aec9c3045a00c5e4c094990))


### Bug Fixes

* **dynamic inputs:** changed the method name because is reservad name ([9378f3e](https://github.com/SouOWendel/shinobi-no-sho/commit/9378f3eb1912edd56900c367b83e725226940b68))


### Reverts

* **template.json:** removed bonus on dureza attribute ([3c34676](https://github.com/SouOWendel/shinobi-no-sho/commit/3c34676c3bd7c6f997ef73acaae00b1a4eaf38c8))

## [1.10.2](https://github.com/SouOWendel/shinobi-no-sho/compare/v1.10.1...v1.10.2) (2024-10-10)


### Bug Fixes

* **areaTemplate:** fixed the condition that defines when the button is displayed ([4d79bb2](https://github.com/SouOWendel/shinobi-no-sho/commit/4d79bb260a9d082dd35a1a6dec32044a2e8b8d0a))

## [1.10.1](https://github.com/SouOWendel/shinobi-no-sho/compare/v1.10.0...v1.10.1) (2024-10-09)


### Bug Fixes

* **hasAreaTemplate:** fixed the condition that checks whether an area template exists ([4dbdc4a](https://github.com/SouOWendel/shinobi-no-sho/commit/4dbdc4a6a9794f6bee8663726be074b15e26075a))

## [1.10.0](https://github.com/SouOWendel/shinobi-no-sho/compare/v1.9.1...v1.10.0) (2024-10-07)


### Features

* **areaTemplate.hbs:** adjusted the layout, classes and names ([a967f9c](https://github.com/SouOWendel/shinobi-no-sho/commit/a967f9cee8936e2520b42b0dbf6b428ca5fe39d0))
* **areaTemplate:** filter and define area dat according to the system, add template controls and change the class name ([e58faa9](https://github.com/SouOWendel/shinobi-no-sho/commit/e58faa954f7ae4105d22404cd95441c80a4d834a))
* **areaTemplate:** prepare the environment for chat features and created the areaTemplate with layout and logic ([f396bfc](https://github.com/SouOWendel/shinobi-no-sho/commit/f396bfc125c89635eeb24680f06ee4c04fc985d7))
* **areaTemplate:** re-render the data of items on prepareTemplate calculations ([b032fa3](https://github.com/SouOWendel/shinobi-no-sho/commit/b032fa39b84e55b2e9039b46aba318d73f342329))
* **armas and gerais sheet:** has been added the areaTemplate in this items ([0cec6ed](https://github.com/SouOWendel/shinobi-no-sho/commit/0cec6ed0b3d90a4993e40254df2035a7291f76b9))
* **config and localizations:** added config variables for dropdowns with the respectives translates ([e615678](https://github.com/SouOWendel/shinobi-no-sho/commit/e6156782106bcf2d2cc4f70ac2e81842f24c898c))
* **css/sass:** adjusted the buttons and other properties of areaTemplate ([52bc0af](https://github.com/SouOWendel/shinobi-no-sho/commit/52bc0af855c31066cd1e6f78df34d6a92a1a4440))
* **css/sass:** layout for areaTemplate, adjusts on item-card ([814aa7b](https://github.com/SouOWendel/shinobi-no-sho/commit/814aa7bebe325eb733919e262f8fece69b4ec340))
* **item tecnicas sheet:** added data-dtype number for areaTemplate fields ([ad649ab](https://github.com/SouOWendel/shinobi-no-sho/commit/ad649ab3823d1e334e6aae6242555f5b34c68d57))
* **item-sheet:** added content class to scrollY, dropdowns, and array handler for techniques and equipments items ([e242d23](https://github.com/SouOWendel/shinobi-no-sho/commit/e242d236874f29208dc86608b844ccb0e471fb94))
* **localization:** changed 'Meia-esfera' to 'Meia esfera' ([065575e](https://github.com/SouOWendel/shinobi-no-sho/commit/065575e73de8b6ef5e456fc70a6dd1cb88457013))
* **localization:** changed and created a lot of keys and values with translates ([93950d6](https://github.com/SouOWendel/shinobi-no-sho/commit/93950d6df5d5a35b39400dedd949989218c394cc))
* **system.json:** changed the compatibility to v12 and changes on packs, grids and flags ([18369be](https://github.com/SouOWendel/shinobi-no-sho/commit/18369be7a96139df8ea107bf2c17196a9b45a657))


### Bug Fixes

* **field control:** fixed the areaTemplate control on item sheet changing the dataset ([4dddc68](https://github.com/SouOWendel/shinobi-no-sho/commit/4dddc6898adf726e9e9bbccbfa0efef1e7d7ec5b))
* **item-card:** fixed the path of combatAbilities ([f7981a2](https://github.com/SouOWendel/shinobi-no-sho/commit/f7981a2dc961c9add31adc3724b44b80465941f6))
* **ninja inventory:** fixed an 'a' tag variable syntax ([3d38e4a](https://github.com/SouOWendel/shinobi-no-sho/commit/3d38e4a9d951a737da974e883ecc44fd6fde3035))

## [1.9.1](https://github.com/SouOWendel/shinobi-no-sho/compare/v1.9.0...v1.9.1) (2024-08-07)


### Bug Fixes

* **macro pack:** fixed an error on general skill macro ([66d1c45](https://github.com/SouOWendel/shinobi-no-sho/commit/66d1c450f1e619aeac90e266184780c228a8a061))

## [1.9.0](https://github.com/SouOWendel/shinobi-no-sho/compare/v1.8.0...v1.9.0) (2024-08-07)


### Features

* **packs:** added foundry cli as dev dependency, added a script and also added a util script ([b4c83f7](https://github.com/SouOWendel/shinobi-no-sho/commit/b4c83f7a18f71b334f125e3a68e359e9d1ce90b5))
* **packs:** added macro pack on the system ([0261f6a](https://github.com/SouOWendel/shinobi-no-sho/commit/0261f6a62a830b9bdcda3e4ad46080a92db6be3c))


### Bug Fixes

* **d8roll:** fixed the roll mode of rolls assigning the private var to chat data with conditions ([d8fe869](https://github.com/SouOWendel/shinobi-no-sho/commit/d8fe8697b6f6d10c16ddd5b41c50d042a9203a07))
* **d8roll:** removed the number of dices on d8 dices to fix a problem with generic rolls with this type ([e9aba2e](https://github.com/SouOWendel/shinobi-no-sho/commit/e9aba2e8d0a3108714d5e53d06a830a664696b85))

## [1.8.0](https://github.com/SouOWendel/shinobi-no-sho/compare/v1.7.0...v1.8.0) (2024-08-04)


### Features

* **actor sheet rolls:** added ability feature to onRoll handler for roll abilities with total bonus with flavor on chat ([f6d2231](https://github.com/SouOWendel/shinobi-no-sho/commit/f6d2231655e1f6a67c25da832986eed16593d74b))
* **actor sheet rolls:** added roll of skill type using dataset and onRoll listener/hook ([8aace4e](https://github.com/SouOWendel/shinobi-no-sho/commit/8aace4e28602dbae9c2478aa15acfc7388d2bde0))
* **actor sheet rolls:** added rolls to combat abilities with dataset roll type and key ([26a4193](https://github.com/SouOWendel/shinobi-no-sho/commit/26a4193513535328400d5cd54a28003a91ef9ad6))
* **actor sheet rolls:** changed the object dataset ability name to generic name as 'key' ([25be504](https://github.com/SouOWendel/shinobi-no-sho/commit/25be504aaee6d897fc493243b1df368008dc746c))
* **d8roll class:** changed the static property isFumble to IsFailure ([b79b4a8](https://github.com/SouOWendel/shinobi-no-sho/commit/b79b4a8c41aca016bec73b2489f5a6eb5f6d6953))
* **d8Roll system function:** added condition to open the dialog to configure roll only when shift key boolean is true ([d48a8b3](https://github.com/SouOWendel/shinobi-no-sho/commit/d48a8b3f365f3bf5ca7921f9e4c4be0bf190a5bc))
* **d8roll template:** added the classes: degree, itsCritical, ItsFailure. Removed the critical data test ([b562cf0](https://github.com/SouOWendel/shinobi-no-sho/commit/b562cf0ed3eb90ecc82ac280e642483b21417f6e))
* **d8roll:** added chatTemplate option to d8roll ([a45d344](https://github.com/SouOWendel/shinobi-no-sho/commit/a45d344bc8432e946a9c45e5bdc12849a1a87d6f))
* **d8roll:** added d8roll class (extended for foundry Roll class) with some changes to display system rolls with critical, degree, bonus, and rollmode ([5bbcb4b](https://github.com/SouOWendel/shinobi-no-sho/commit/5bbcb4b453571cfc34cefcc127e30c7ddc1a9c4c))
* **d8roll:** added d8roll to dices of system and configure the rolls for abilities, skills and combat abilities ([8e6d962](https://github.com/SouOWendel/shinobi-no-sho/commit/8e6d962127040ebb351db1b4f5179733415afd05))
* **d8roll:** added hasDegree and hasCritical to filter when display or no that roll traits, changed 'fumble' to 'failure' ([e6e8f1c](https://github.com/SouOWendel/shinobi-no-sho/commit/e6e8f1c04f921ef40e7f357cebf987b9cbc40e6e))
* **d8roll:** added static method to calculate the degree for display on roll template ([bc82d5b](https://github.com/SouOWendel/shinobi-no-sho/commit/bc82d5b3eccd5a2d3437a0ebd00b579bbddbe9ac))
* **dice sass/css:** added styles for fix dice-flavor, added degree font styles, and styles for critical and failure dice results ([6874d9a](https://github.com/SouOWendel/shinobi-no-sho/commit/6874d9a98d6b5bc6bb1b39154d703fbd96991fa9))
* **roll degree:** the base calculation of grade for rolls was added along with its logic and the critical variable ([9bde03c](https://github.com/SouOWendel/shinobi-no-sho/commit/9bde03c6b4e170ae8737a6ce56d0a5fb2e577c0d))


### Bug Fixes

* **technique item sheet:** changed the chakra field cost to dropdown and added another field, update the item card ([9579edb](https://github.com/SouOWendel/shinobi-no-sho/commit/9579edbfd12f2d049c871ad354b4dd374231a2f7))

## [1.7.0](https://github.com/SouOWendel/shinobi-no-sho/compare/v1.6.0...v1.7.0) (2024-07-25)


### Features

* **config.mjs:** added linha to areaEfeito, vertexto on duration, and also replaced raridade to rarity ([97c5fe8](https://github.com/SouOWendel/shinobi-no-sho/commit/97c5fe8f6e0544b190943b559a163d32953b8f63))
* **localization:** added vertexto and linha translates for english and portuguese files ([2685230](https://github.com/SouOWendel/shinobi-no-sho/commit/268523069b350ad42caa324af696dceb32f2f823))
* **rarity:** changed the rarity field and keys for compatibility with Rarity Colors and modules for DND5e system ([2141ee6](https://github.com/SouOWendel/shinobi-no-sho/commit/2141ee6941b6a7d4fa7d5d59993e79ed3588833e))

## [1.6.0](https://github.com/SouOWendel/shinobi-no-sho/compare/v1.5.0...v1.6.0) (2024-07-20)


### Features

* **chat item card:** added characteristics spans to display on techniques items ([435bbf5](https://github.com/SouOWendel/shinobi-no-sho/commit/435bbf56e1677177ec642e5b4d40bef23c45e30a))

## [1.5.0](https://github.com/SouOWendel/shinobi-no-sho/compare/v1.4.0...v1.5.0) (2024-07-20)


### Features

* **readme:** added badges and getting started ([e9c4df6](https://github.com/SouOWendel/shinobi-no-sho/commit/e9c4df6ae23b27d87d588cc51db07ae68695b678))

## [1.4.0](https://github.com/SouOWendel/shinobi-no-sho/compare/v1.3.2...v1.4.0) (2024-07-20)


### Features

* **localization:** added english language, changed name and book discord, also added action and techniques translates ([5b6f961](https://github.com/SouOWendel/shinobi-no-sho/commit/5b6f961f4494d5aa3c4f59403236273abe595018))
* **sidebar:** changed the logo and added some styles for header ([8ddc89d](https://github.com/SouOWendel/shinobi-no-sho/commit/8ddc89db2243b7f0cf10d587d09463bbce2dd879))
* **system.json:** changed the title of system, removed the background, updated the verified version and grid keys ([8ed0012](https://github.com/SouOWendel/shinobi-no-sho/commit/8ed0012365e76acad663ebb9258422aa01874d54))
* **techniques and actions dropdown:** added subtypes (jikuukan and shunjutsu) and added more actions ([d271aba](https://github.com/SouOWendel/shinobi-no-sho/commit/d271aba3e092978abccb3f8a4987a36ddebbb3ba))


### Bug Fixes

* **template.json:** fixed the skill medicine, changed the ability from 'for' to 'int' ([ee639e5](https://github.com/SouOWendel/shinobi-no-sho/commit/ee639e58b8036ac8c5616a6e33c130c827b53754))

## [1.3.2](https://github.com/SouOWendel/shinobi-no-sho/compare/v1.3.1...v1.3.2) (2024-07-16)


### Bug Fixes

* **rename path:** renamed all path with new name of system ([0aee48b](https://github.com/SouOWendel/shinobi-no-sho/commit/0aee48b9d1975768229a9eaa031d2e3f55900bf3))
* **test:** test ([b647a61](https://github.com/SouOWendel/shinobi-no-sho/commit/b647a618ff3addeb9a055f64ea604c5d4d24e7a1))

## [1.3.1](https://github.com/SouOWendel/shinobi-no-sho/compare/v1.3.0...v1.3.1) (2024-07-16)


### Bug Fixes

* **credits:** changed the name of contributor and the discord tag ([05a9216](https://github.com/SouOWendel/shinobi-no-sho/commit/05a9216ff1f0e3064777e1ef7d7869ba384c08d5))
* **system:** changed the id for lowercase and added more info in authors array ([27e846b](https://github.com/SouOWendel/shinobi-no-sho/commit/27e846b3165f5b86f81d27b5d76733691ff0160d))

## [1.3.0](https://github.com/SouOWendel/shinobi-no-sho/compare/v1.2.1...v1.3.0) (2024-07-15)


### Features

* **bonus:** added bonus variable and template data key on vitality and chakra ([31bf5a8](https://github.com/SouOWendel/shinobi-no-sho/commit/31bf5a86c365524362ce6e4a8f60eff64cc5fbed))

## [1.2.1](https://github.com/SouOWendel/shinobi-no-sho/compare/v1.2.0...v1.2.1) (2024-07-13)


### Bug Fixes

* **core system:** the setup code was commented out due to an inconsistency in the code ([cbcaaca](https://github.com/SouOWendel/shinobi-no-sho/commit/cbcaacaef3ad7c4f13d437e4b1c09997710efeab))

## [1.2.0](https://github.com/SouOWendel/shinobi-no-sho/compare/v1.1.1...v1.2.0) (2024-07-13)


### Features

* **trackableAttributes:** added vitality and chakra to trackableAttributes, changed the 'atual' key to 'value' and the standard bars to new reference ([86fdd3f](https://github.com/SouOWendel/shinobi-no-sho/commit/86fdd3f03e981c4b0f5a58c82a48d04b8b28234a))


### Bug Fixes

* **chat item card:** added characteristics to display on chat ([c33bfd1](https://github.com/SouOWendel/shinobi-no-sho/commit/c33bfd16dc80f68f217ad2849b3150c56b8fc564))
* **localization:** changed actor type ninja to uppercase ([7b6e1ca](https://github.com/SouOWendel/shinobi-no-sho/commit/7b6e1ca94084dd11761478c3a87f8284d1e139af))
* **power item sheet:** fixed the description reference on system data ([477f483](https://github.com/SouOWendel/shinobi-no-sho/commit/477f48300f51d01416326b4ac7372c42573c9607))
* **techniques item sheet:** fixed the checkbox write function with handlebars helper ([02b3831](https://github.com/SouOWendel/shinobi-no-sho/commit/02b38311738d1e8ec93068261fd13c0f35da6781))

## [1.1.1](https://github.com/SouOWendel/shinobi-no-sho/compare/v1.1.0...v1.1.1) (2024-07-13)


### Bug Fixes

* **aptitude item sheet:** fixed the aptitude type on dropdown, added restrict type and special type ([e007bd4](https://github.com/SouOWendel/shinobi-no-sho/commit/e007bd48f3198bf4006a7a4c6aa00ffeac8ee011))

## [1.1.0](https://github.com/SouOWendel/shinobi-no-sho/compare/v1.0.0...v1.1.0) (2024-07-13)


### Features

* **chat item card:** added critical and toughness to technique item card on chat ([92cbe2a](https://github.com/SouOWendel/shinobi-no-sho/commit/92cbe2ad975d4c1b89fc1b34af3ab48b4f5d13f0))
* **core system:** added hook preCreateActor to apply prototypeToken modifications (actor link true, and disposition neutral) ([a3a0f83](https://github.com/SouOWendel/shinobi-no-sho/commit/a3a0f8365cf7eeea76716f3865739ec7101eda8d))


### Bug Fixes

* **initiative:** fixed the initiative roll data ([5006c68](https://github.com/SouOWendel/shinobi-no-sho/commit/5006c68eda3106c2e97ac430bc781f3360fa4ed7))
* **items sheet editor:** added min-height to fix display editor enter the all item sheet ([a4ade7d](https://github.com/SouOWendel/shinobi-no-sho/commit/a4ade7db537461fec4185a927c0153ead0b7c19b))
* **techniques item sheet:** added critical label ([a810cac](https://github.com/SouOWendel/shinobi-no-sho/commit/a810cac0fade8073fccca29c2dc3ec383825180e))


### Performance Improvements

* **template.json:** changed 'nivelCampanha' from 1 to 4, and changed the 'nivelShinobi' from 1 to Genin ([2ac7ffc](https://github.com/SouOWendel/shinobi-no-sho/commit/2ac7ffc475ef3f2edd37d6091b2019abd28e94ad))

## [1.0.0](https://github.com/SouOWendel/shinobi-no-sho/compare/v0.4.0...v1.0.0) (2024-07-13)


### ⚠ BREAKING CHANGES

* **first official release:** none, just launched the first version

### Features

* **first official release:** launch the v1 version ([a290db3](https://github.com/SouOWendel/shinobi-no-sho/commit/a290db346f75f4ea2a77c3975fe85aa7a700e025))
* **first official release:** launch the v1 version ([c32e3ef](https://github.com/SouOWendel/shinobi-no-sho/commit/c32e3ef6ea4cb3eb2b418db3c692b620658ec39f))

## [0.4.0](https://github.com/SouOWendel/shinobi-no-sho/compare/v0.3.0...v0.4.0) (2024-07-13)


### Features

* **actor sheet and config file:** added header informations and custom dropdown of social skills, also added filter to skills for trained and armor condition ([66b61a0](https://github.com/SouOWendel/shinobi-no-sho/commit/66b61a07b82ac372f95a900f1cf577f40718312b))
* **actor sheet:** added one new tab on options about skills part ([fc029e7](https://github.com/SouOWendel/shinobi-no-sho/commit/fc029e73c96f61ccfd11c93c36a81fa99dcaa99e))
* **actor:** added calculation of custom social skill field ([6ec5dd6](https://github.com/SouOWendel/shinobi-no-sho/commit/6ec5dd6977d3c1a0186a38ae35350f21936cb306))
* **armor item sheet:** fixed all checkbox of traits, added critical field, remove some fiels to damage ([52264f0](https://github.com/SouOWendel/shinobi-no-sho/commit/52264f06dc0bac4b9b01be8d7df1c35dc0b4b6f9))
* **armor item:** added toughness field ([0459db3](https://github.com/SouOWendel/shinobi-no-sho/commit/0459db3eb5fe614d4a8afa8d0a4ddd627763ff79))
* **assets:** added logo from rpg system Naruto 'Shinobi no Sho' ([44736f7](https://github.com/SouOWendel/shinobi-no-sho/commit/44736f7282d13e211818d325d465e59a72a91bc3))
* **chat item card:** added traits to card, the critical field, and 'other' fields ([08334b3](https://github.com/SouOWendel/shinobi-no-sho/commit/08334b3bf099b733cc87182de488591c7fcea59d))
* **chat item-card:** added item-card to display item info on chat ([04dc2d3](https://github.com/SouOWendel/shinobi-no-sho/commit/04dc2d3c20e8edbdc46803c6493884db230545af))
* **combat tab:** added all calculation of combat abilities and combat statistics, displayed the data and changed the data template ([b98f4d4](https://github.com/SouOWendel/shinobi-no-sho/commit/b98f4d4aa6600e9641ebad79d1fda0b4438134df))
* **config.mjs:** was added dropdowns about skills and combat abilities ([8fb7197](https://github.com/SouOWendel/shinobi-no-sho/commit/8fb7197d248f41969e276bc5f2eff40bee596f64))
* **css/sass:** added styles for tabs, overflow and scroll, also was added styles for chat item-card template ([3722b09](https://github.com/SouOWendel/shinobi-no-sho/commit/3722b09cb3eba412a5be46673fe0e1f1a09809de))
* **css/sass:** defined the max-width of input and select on combat statistics section ([00930ef](https://github.com/SouOWendel/shinobi-no-sho/commit/00930ef575eea08e687675beeb265d54300cb03b))
* **css/sass:** several adjustments and stylizations ([b60fd44](https://github.com/SouOWendel/shinobi-no-sho/commit/b60fd445b35895412806d5084fa8e9be8f41673b))
* **custom sidebar + credits:** added custom sidebar with links to system discord, twitter, author, official site, etc ([05224c6](https://github.com/SouOWendel/shinobi-no-sho/commit/05224c6e9a309cc1200e0a4f3b868e931b22cf9a))
* **initiative:** added initiative and IfInequals handlebars helper ([e730331](https://github.com/SouOWendel/shinobi-no-sho/commit/e730331eec1844fbd587c32354c5799605937dc5))
* **item-sheet:** changed the height of item-sheet from '440px' to '445px' ([e8fb4b5](https://github.com/SouOWendel/shinobi-no-sho/commit/e8fb4b523aee66f2974551c7319c8d0d16abead4))
* **items dropdown:** added all dropdown data and configuration of items (aptitudes, armors, weapons, general item, techniques and powers) ([2af6369](https://github.com/SouOWendel/shinobi-no-sho/commit/2af6369da7377a1125996fa412ae3077ed86dcee))
* **items sheet:** added 'rarity', 'alternative name', 'origin' fields and div content to tempt to overflow the scroll of sheets ([19746bb](https://github.com/SouOWendel/shinobi-no-sho/commit/19746bbe587c812688fc6fda47f6f9e2f6d31d54))
* **items sheet:** added container to description and characteristics editors ([7597124](https://github.com/SouOWendel/shinobi-no-sho/commit/75971244f86df3e7066f7457ec6162e9601ec94f))
* **items sheet:** added flexcol to form html to all items, this fixed the overflow of scroll ([5d67f31](https://github.com/SouOWendel/shinobi-no-sho/commit/5d67f31dd221060d64a7d90cd6252ec4b70f71cd))
* **localization:** added translates for header informations and added plus symbol to venefício skill ([a64e447](https://github.com/SouOWendel/shinobi-no-sho/commit/a64e4472d20ec5a7b49e30845f4aa4509e84bed1))
* **localization:** changed and added new abilities translates, also added combat abilities ([c9d4a4e](https://github.com/SouOWendel/shinobi-no-sho/commit/c9d4a4e95eea5998474143e60bc08de6d84b5fc5))
* **ninja combat tab:** added base field to combat abilities ([9f7c4b9](https://github.com/SouOWendel/shinobi-no-sho/commit/9f7c4b985451b9b2127638627d1d5cce924515f4))
* **ninja inventory:** added ryos field ([74fe1b1](https://github.com/SouOWendel/shinobi-no-sho/commit/74fe1b104e85278107a2404ee1684492c5a0d63f))
* **ninja sheet parts:** added data to display in tabulated items informations of aptitudes and powers, inventory and techniques ([e3d19e9](https://github.com/SouOWendel/shinobi-no-sho/commit/e3d19e914530acb5c0a3e23bb5bc874265d94764))
* **ninja sheet parts:** added localization for all displayed data ([bbebdd8](https://github.com/SouOWendel/shinobi-no-sho/commit/bbebdd8afbb3ac2dd20326a5ef6795153007f4dc))
* **ninja sheet skills:** splited the skills tab in general skills tab and social skills tab ([1a45d21](https://github.com/SouOWendel/shinobi-no-sho/commit/1a45d211c7a9d4e2ca0b9d1f8de631fc899a5448))
* **ninja sheet:** added dropdown fields to header, changed the abilities label to abbreviation and added absortion field to quick access container ([d16718d](https://github.com/SouOWendel/shinobi-no-sho/commit/d16718de6dbac7107223c60a78cb073e314e7527))
* **ninja sheet:** added feature to add multiple relations on biography t ab ([003389b](https://github.com/SouOWendel/shinobi-no-sho/commit/003389b16e6dcc03bd4a69bda2347c8b29d7f434))
* **ninja sheet:** changed dropdowns to input type text and added tabs to skills tab ([e3a9e33](https://github.com/SouOWendel/shinobi-no-sho/commit/e3a9e339ac0c1a0876a1b6f87307df6b7a0fb570))
* **ninja skills tab:** added custom field to calculate social skills value, also added guide to general skills treats ([e301068](https://github.com/SouOWendel/shinobi-no-sho/commit/e301068ec52c2bc481b675df39cac2175c781d02))
* **power item sheet:** added new tab to add acquired effects for powers ([b163736](https://github.com/SouOWendel/shinobi-no-sho/commit/b163736d66d478cafb77543804bc3210a99d3037))
* **shinobiNoSho main file:** created the 'ifEquals' helper of handlebars for conditions in layouts ([b573c42](https://github.com/SouOWendel/shinobi-no-sho/commit/b573c42b9318cb4c11d67dc690d91ff733d6824c))
* **system.json:** changed the wallpaper, was added manifest, changed the primary and secondary token bars, changed the grid distance ([fbfb840](https://github.com/SouOWendel/shinobi-no-sho/commit/fbfb8402d5881f25301152b2355ebaa7cd8c653b))
* **techniques item sheet:** added critical field and toughness field ([60d2428](https://github.com/SouOWendel/shinobi-no-sho/commit/60d2428ca863f6f056fa3350d6ab31d962a74eb1))
* **techniques item:** added subtype technique dropdown field ([7b6f20a](https://github.com/SouOWendel/shinobi-no-sho/commit/7b6f20a8a9b891215c016522a430f8950bb24efa))
* **template.json:** added 'raridade' key and deleted the 'classificao' key ([e59b55f](https://github.com/SouOWendel/shinobi-no-sho/commit/e59b55ff7251af979ff8da755c701b6b37363e5e))
* **template.json:** added all items data, changed all value of abilities from '10' to '1', added skill key to combat abilities and changed the value of skills to null ([2d492a0](https://github.com/SouOWendel/shinobi-no-sho/commit/2d492a001969c7cba0c13b955b5469eb982a381f))
* **template.json:** changed 'caracteristicas' to skills for 'caract', added 'acuidade', 'custom', 'dureza' e 'critico' ([848e359](https://github.com/SouOWendel/shinobi-no-sho/commit/848e359e2c7fd23ae5a28074d903d7d37b444094))
* **weapon sheet:** added new feature to add multiple damages to one weapon ([6c105b3](https://github.com/SouOWendel/shinobi-no-sho/commit/6c105b33df62daa7e5c7e2ad28cc97afb79da4c8))


### Bug Fixes

* **effects item part:** fixed the effects control icons style ([1604e4c](https://github.com/SouOWendel/shinobi-no-sho/commit/1604e4cf5d2bc63d11d84f442c25442d1d88af1b))
* **item-sheet:** fixed the delete feature of multiple damages in weapon item ([06615ed](https://github.com/SouOWendel/shinobi-no-sho/commit/06615ed7d47df65ba23d3d3943fcbfd967b143c8))

## [0.3.0](https://github.com/SouOWendel/shinobi-no-sho/compare/v0.2.0...v0.3.0) (2024-07-05)


### Features

* **actor ninja sheet:** was applied the ninja sheet layout with some stylizations ([2b595f5](https://github.com/SouOWendel/shinobi-no-sho/commit/2b595f54a56dbe7b00437c3a4f706accfc9c53d2))
* **actor sheet, 'inventario' and 'biografia':** created a sub-tabs for biografia tab, and several fields, also was created inventory filter with layout ([5cfc871](https://github.com/SouOWendel/shinobi-no-sho/commit/5cfc8719b586fb5d899d0ab7da6d6711d1fc27c3))
* **actor sheet:** changed the name of new items from 'New' to 'Novo(a)' ([8a7a5a1](https://github.com/SouOWendel/shinobi-no-sho/commit/8a7a5a19041d578478aac31bf88fdcdf425456b6))
* **actor sheet:** created label with localization for all skills ([3cb85b0](https://github.com/SouOWendel/shinobi-no-sho/commit/3cb85b040ac1c95b17d2251d733cac8dc2acc2b0))
* **all items:** changed the all items with tabulated fields with stylizations and new and respective tabs ([e8d410c](https://github.com/SouOWendel/shinobi-no-sho/commit/e8d410c76b5ffb3c9f980d886b4675413fdbbcdf))
* **config.mjs:** added skills (general and social) for register constants with localizations ([6f27529](https://github.com/SouOWendel/shinobi-no-sho/commit/6f275297bda6d7e78bb93154187e66a1331d0828))
* **css/sass:** added styles for ninja sheet and several items of system ([beb31a7](https://github.com/SouOWendel/shinobi-no-sho/commit/beb31a71b49e0bd47f3a3f500e17d216511c50d8))
* **css/sass:** added styles for sheet-body, combat tab, biography tab, and flex utilities ([8699af9](https://github.com/SouOWendel/shinobi-no-sho/commit/8699af97cf69688c7ae253e70efb79a686131fdc))
* **css/sass:** created some classes for tabulate with flex display ([fab7908](https://github.com/SouOWendel/shinobi-no-sho/commit/fab7908fba9d985dbc8e9f5fc7c7b183c96fe655))
* **css:** added styles for tabs on ninja sheet ([1682c07](https://github.com/SouOWendel/shinobi-no-sho/commit/1682c0753e74126a3f6e2c0994352621d4d1dd4f))
* **item-sheet:** changed the width from 620 to 520 pixels ([02035a1](https://github.com/SouOWendel/shinobi-no-sho/commit/02035a1fb7f60ccbdb9fdcf5f7053eb9af7794e4))
* **localization:** skills translates and new translates for items ([9e069ec](https://github.com/SouOWendel/shinobi-no-sho/commit/9e069ec0bc3ffcb743821141b9c8a9420dbe4cf1))
* **ninja part combat:** added all template data to fields values and names for read and write actions ([5a42768](https://github.com/SouOWendel/shinobi-no-sho/commit/5a42768440b025db91a5c2a87daef4b6fa9ea77e))
* **ninja part skills:** added all template data to fields and refactor HTML with handlebars loop ([9665330](https://github.com/SouOWendel/shinobi-no-sho/commit/966533079dfbac98b5623bba0d96db9fc52267e7))
* **ninja sheet parts:** added and tabulated informations of items with display flex ([79e7592](https://github.com/SouOWendel/shinobi-no-sho/commit/79e7592a7aa7f5a8aeba1941d737c0c96fb75189))
* **ninja sheet parts:** added list of items about techniques and aptitudes/powers ([da3fccc](https://github.com/SouOWendel/shinobi-no-sho/commit/da3fccc698f3d1bf973e55efae2be5d907fbb67c))
* **ninja sheet parts:** applied combat skills and combat statistics section layout with fields ([7eab20c](https://github.com/SouOWendel/shinobi-no-sho/commit/7eab20c95143e3d6753e7966a438cdd55506837d))
* **ninja sheet:** added all template data to fields and fixed the overflow scroll to tabs ([0036516](https://github.com/SouOWendel/shinobi-no-sho/commit/0036516f425100a19dee8ee7e579678751e3fcae))
* **ninja sheet:** created layout for family tab, added max vitality and chakra ([5072c40](https://github.com/SouOWendel/shinobi-no-sho/commit/5072c40fd6c92b2707b41eeef160cb4f96c05d82))
* **ninja skills part:** created a tab for general skills and social skills ([8c66091](https://github.com/SouOWendel/shinobi-no-sho/commit/8c66091e807e35dfedfff593cb5c1aca5a736dc1))
* **resources:** added some utility class styles (padding and bold) ([c0e2e58](https://github.com/SouOWendel/shinobi-no-sho/commit/c0e2e5849cb501f3055af7da5352874c421414c8))
* **system.json:** changed the background image and thumbnail of system to naruto wallpaper ([e679cbe](https://github.com/SouOWendel/shinobi-no-sho/commit/e679cbecea0e665aab690b4685e0bda25489e32c))
* **template.json:** changed ryos value from 0 to 100, because this is the standard value ([61d9185](https://github.com/SouOWendel/shinobi-no-sho/commit/61d91858b4fe5e465155deaf5158f90fd9dd09d4))
* **template.json:** changed the item type from 'geral' to 'gerais' ([5ac5ec3](https://github.com/SouOWendel/shinobi-no-sho/commit/5ac5ec34ac50c04c8973c9425e1c7690b4cff1a0))
* **template.json:** created data of ninja sheet with details informations and skills ([3a1f7ce](https://github.com/SouOWendel/shinobi-no-sho/commit/3a1f7cecff1ff0fd64d11e7ffcfc3f7262bbfebb))

## [0.2.0](https://github.com/SouOWendel/shinobi-no-sho/compare/v0.1.0...v0.2.0) (2024-06-26)


### Features

* **item tecnica:** created standard sheet for tecnica item ([d92873e](https://github.com/SouOWendel/shinobi-no-sho/commit/d92873edbebba2b90121c9bcca4ed2c87ab83fa7))
* **localization:** added base localizations for portuguese brazillian ([6f49eb8](https://github.com/SouOWendel/shinobi-no-sho/commit/6f49eb895abe857d2f4278aa71e4406b91db528d))
* **release please:** added release-please with specific system configurations ([1b73fda](https://github.com/SouOWendel/shinobi-no-sho/commit/1b73fda227238137340f977d30dd33a381e51d6f))
* **release please:** also added with release please the manifest and configurations of manifest ([13aa793](https://github.com/SouOWendel/shinobi-no-sho/commit/13aa793036504d35d6e32c82ecd30cae34197e10))
* **system.json:** added flags for hotReload function of Foundry ([1d8852b](https://github.com/SouOWendel/shinobi-no-sho/commit/1d8852bec74e7f4faa42d7030158bca4e8412547))
* **system.json:** replaced all boilerplate for system name (shinobiNoSho) and added assets media ([b5f653c](https://github.com/SouOWendel/shinobi-no-sho/commit/b5f653c600b8e532ffd7953eda9a2ae35c7eaea8))
* **template.json:** added 'tecnicas' item and rename 'equipamentos' to 'geral' ([766897d](https://github.com/SouOWendel/shinobi-no-sho/commit/766897de308a6a619b4c511b1048b76eeb4b2c44))
* **template.json:** created a sketch of ninja actor and items (weapons, armor, equipments, aptitudes and powers) ([69b3cf2](https://github.com/SouOWendel/shinobi-no-sho/commit/69b3cf28d7990c3c20f6c0b5631682ad2fdeeb11))
* **template.json:** was added abilities (vig, social, and combate), attributes, details and currency ([5ff67a7](https://github.com/SouOWendel/shinobi-no-sho/commit/5ff67a727417101ec954f14a10f5e97431f381a6))

## 0.1.0

- Add support for Foundry v12 and initial files.
