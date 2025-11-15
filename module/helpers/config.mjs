export const shinobiNoSho = {};

/**
 * The set of ability Scores used within the system.
 * @type {Object}
 */
shinobiNoSho.abilities = {
  for: 'shinobiNoSho.ability.for.long',
  des: 'shinobiNoSho.ability.des.long',
  agi: 'shinobiNoSho.ability.agi.long',
  per: 'shinobiNoSho.ability.per.long',
  int: 'shinobiNoSho.ability.int.long',
  vig: 'shinobiNoSho.ability.vig.long',
	esp: 'shinobiNoSho.ability.esp.long',
  car: 'shinobiNoSho.ability.car.long',
	man: 'shinobiNoSho.ability.man.long',
};

shinobiNoSho.abilityAbbreviations = {
  for: 'shinobiNoSho.ability.for.abbr',
  des: 'shinobiNoSho.ability.des.abbr',
  agi: 'shinobiNoSho.ability.agi.abbr',
  per: 'shinobiNoSho.ability.per.abbr',
  int: 'shinobiNoSho.ability.int.abbr',
  vig: 'shinobiNoSho.ability.vig.abbr',
	esp: 'shinobiNoSho.ability.esp.abbr',
  car: 'shinobiNoSho.ability.car.abbr',
	man: 'shinobiNoSho.ability.man.abbr',
};

shinobiNoSho.periciasSociaisCustom = {
	for: 'shinobiNoSho.ability.for.long',
  des: 'shinobiNoSho.ability.des.long',
  agi: 'shinobiNoSho.ability.agi.long',
  per: 'shinobiNoSho.ability.per.long',
  int: 'shinobiNoSho.ability.int.long',
  vig: 'shinobiNoSho.ability.vig.long',
	esp: 'shinobiNoSho.ability.esp.long',
  car: 'shinobiNoSho.ability.car.long',
	man: 'shinobiNoSho.ability.man.long',
	arte: "shinobiNoSho.skills.geral.arte",
};

shinobiNoSho.periciaVooCustom = {
	esp: 'shinobiNoSho.ability.esp.abbr',
	arte: 'shinobiNoSho.skills.geral.arte'
};

shinobiNoSho.skills = {
	geral: {
		acrobacia: "shinobiNoSho.skills.geral.acrobacia",
		arte: "shinobiNoSho.skills.geral.arte",
		atletismo: "shinobiNoSho.skills.geral.atletismo",
		ciencias: "shinobiNoSho.skills.geral.ciencias",
		cultura: "shinobiNoSho.skills.geral.cultura",
		ocultismo: "shinobiNoSho.skills.geral.ocultismo",
		concentracao: "shinobiNoSho.skills.geral.concentracao",
		disfarces: "shinobiNoSho.skills.geral.disfarces",
		escapar: "shinobiNoSho.skills.geral.escapar",
		furtividade: "shinobiNoSho.skills.geral.furtividade",
		animais: "shinobiNoSho.skills.geral.animais",
		mecanismos: "shinobiNoSho.skills.geral.mecanismos",
		medicina: "shinobiNoSho.skills.geral.medicina",
		prestidigitacao: "shinobiNoSho.skills.geral.prestidigitacao",
		procurar: "shinobiNoSho.skills.geral.procurar",
		prontidao: "shinobiNoSho.skills.geral.prontidao",
		rastrear: "shinobiNoSho.skills.geral.rastrear",
		veneficio: "shinobiNoSho.skills.geral.veneficio",
		voo: "shinobiNoSho.skills.geral.voo",
		pericia_1: "shinobiNoSho.skills.geral.pericia_1"
	},
	social: {
		atuacao: "shinobiNoSho.skills.social.atuacao",
		mudarAtitude: "shinobiNoSho.skills.social.mudarAtitude",
		barganha: "shinobiNoSho.skills.social.barganha",
		blefar: "shinobiNoSho.skills.social.blefar",
		intimidacao: "shinobiNoSho.skills.social.intimidacao",
		obterInfo: "shinobiNoSho.skills.social.obterInfo",
	}
};

shinobiNoSho.skillsAbbr = {
	geral: {
		acrobacia: "shinobiNoSho.skills.geral.acrobacia",
		arte: "shinobiNoSho.skills.geral.arte",
		atletismo: "shinobiNoSho.skills.geral.atletismo",
		ciencias: "shinobiNoSho.skills.geral.ciencias",
		cultura: "shinobiNoSho.skills.geral.cultura",
		ocultismo: "shinobiNoSho.skills.geral.ocultismo",
		concentracao: "shinobiNoSho.skills.geral.concentracao",
		disfarces: "shinobiNoSho.skills.geral.disfarces",
		escapar: "shinobiNoSho.skills.geral.escapar",
		furtividade: "shinobiNoSho.skills.geral.furtividade",
		animais: "shinobiNoSho.skillsAbbr.geral.animais",
		mecanismos: "shinobiNoSho.skills.geral.mecanismos",
		medicina: "shinobiNoSho.skills.geral.medicina",
		prestidigitacao: "shinobiNoSho.skills.geral.prestidigitacao",
		procurar: "shinobiNoSho.skills.geral.procurar",
		prontidao: "shinobiNoSho.skills.geral.prontidao",
		rastrear: "shinobiNoSho.skills.geral.rastrear",
		veneficio: "shinobiNoSho.skills.geral.veneficio",
		voo: "shinobiNoSho.skills.geral.voo",
		pericia_1: "shinobiNoSho.skills.geral.pericia_1"
	},
	social: {
		atuacao: "shinobiNoSho.skills.social.atuacao",
		mudarAtitude: "shinobiNoSho.skills.social.mudarAtitude",
		barganha: "shinobiNoSho.skills.social.barganha",
		blefar: "shinobiNoSho.skills.social.blefar",
		intimidacao: "shinobiNoSho.skills.social.intimidacao",
		obterInfo: "shinobiNoSho.skillsAbbr.social.obterInfo",
	}
};

shinobiNoSho.header = {
	lateralidade: {
		destro: "shinobiNoSho.NinjaSheet.lateralidade.destro",
		canhoto: "shinobiNoSho.NinjaSheet.lateralidade.canhoto",
		ambidestro: "shinobiNoSho.NinjaSheet.lateralidade.ambidestro"
	},
	tendencia: {
		lealBondoso: "shinobiNoSho.NinjaSheet.tendencia.lealBondoso",
		neutroBondoso: "shinobiNoSho.NinjaSheet.tendencia.neutroBondoso",
		caoticoBondoso: "shinobiNoSho.NinjaSheet.tendencia.caoticoBondoso",
		lealNeutro: "shinobiNoSho.NinjaSheet.tendencia.lealNeutro",
		neutro: "shinobiNoSho.NinjaSheet.tendencia.neutro",
		caoticoNeutro: "shinobiNoSho.NinjaSheet.tendencia.caoticoNeutro",
		lealMaligno: "shinobiNoSho.NinjaSheet.tendencia.lealMaligno",
		neutroMaligno: "shinobiNoSho.NinjaSheet.tendencia.neutroMaligno",
		caoticoMaligno: "shinobiNoSho.NinjaSheet.tendencia.caoticoMaligno",
	},
	genero: {
		masculino: "shinobiNoSho.NinjaSheet.genero.masculino",
		feminino: "shinobiNoSho.NinjaSheet.genero.feminino"
	},
	afinidade: {
		katon: "shinobiNoSho.ITEMS.tecnicas.elemento.katon",
		fuuton: "shinobiNoSho.ITEMS.tecnicas.elemento.fuuton",
		raiton: "shinobiNoSho.ITEMS.tecnicas.elemento.raiton",
		doton: "shinobiNoSho.ITEMS.tecnicas.elemento.doton",
		suiton: "shinobiNoSho.ITEMS.tecnicas.elemento.suiton",
	}
};

shinobiNoSho.combatAbilities = {
	CC: "shinobiNoSho.combatAbilities.CC",
	CD: "shinobiNoSho.combatAbilities.CD",
	E: "shinobiNoSho.combatAbilities.E",
	LM: "shinobiNoSho.combatAbilities.LM"
}

shinobiNoSho.ITEMS = {
	dropdown: {
		aptidoes: {
			tipoAptidao: {
				combate: "shinobiNoSho.ITEMS.aptidoes.tipoAptidao.combate",
				manobra: "shinobiNoSho.ITEMS.aptidoes.tipoAptidao.manobra",
				geral: "shinobiNoSho.ITEMS.aptidoes.tipoAptidao.geral",
				tecnica: "shinobiNoSho.ITEMS.aptidoes.tipoAptidao.tecnica",
				shinobi: "shinobiNoSho.ITEMS.aptidoes.tipoAptidao.shinobi",
				restrita: "shinobiNoSho.ITEMS.aptidoes.tipoAptidao.restrita",
				especial: "shinobiNoSho.ITEMS.aptidoes.tipoAptidao.especial"
			}
		},
		tecnicas: {
			tipoCustoChakra: {
				numero: "shinobiNoSho.ITEMS.tecnicas.tipoCustoChakra.numero",
				vertexto: "shinobiNoSho.ITEMS.generico.acao.vertexto"
			},
			origem: {
				aptidao: "shinobiNoSho.ITEMS.tecnicas.origem.aptidao",
				poder: "shinobiNoSho.ITEMS.tecnicas.origem.poder",
				tecnica: "shinobiNoSho.ITEMS.tecnicas.origem.tecnica",
				arma: "shinobiNoSho.ITEMS.tecnicas.origem.arma",
				armadura: "shinobiNoSho.ITEMS.tecnicas.origem.armadura",
				geral: "shinobiNoSho.ITEMS.tecnicas.origem.geral"
			},
			areaEfeito: {
				cone: "shinobiNoSho.ITEMS.tecnicas.areaEfeito.cone",
				circulo: "shinobiNoSho.ITEMS.tecnicas.areaEfeito.circulo",
				cilindro: "shinobiNoSho.ITEMS.tecnicas.areaEfeito.cilindro",
				esfera: "shinobiNoSho.ITEMS.tecnicas.areaEfeito.esfera",
				onda: "shinobiNoSho.ITEMS.tecnicas.areaEfeito.onda",
				linha: "shinobiNoSho.ITEMS.tecnicas.areaEfeito.linha",
				outro: "shinobiNoSho.ITEMS.tecnicas.areaEfeito.outro"
			},
			tipo: {
				projetil: "shinobiNoSho.ITEMS.tecnicas.tipo.projetil",
				area: "shinobiNoSho.ITEMS.tecnicas.tipo.area",
				suporte: "shinobiNoSho.ITEMS.tecnicas.tipo.suporte",
				corpoacorpo: "shinobiNoSho.ITEMS.tecnicas.tipo.corpoacorpo",
				toque: "shinobiNoSho.ITEMS.tecnicas.tipo.toque",
				aflicao: "shinobiNoSho.ITEMS.tecnicas.tipo.aflicao",
				compulsao: "shinobiNoSho.ITEMS.tecnicas.tipo.compulsao",
				fantasma: "shinobiNoSho.ITEMS.tecnicas.tipo.fantasma"
			},
			subtipo: {
				controleChakra: "shinobiNoSho.ITEMS.tecnicas.subtipo.controleChakra",
				kinjutsu: "shinobiNoSho.ITEMS.tecnicas.subtipo.kinjutsu",
				hijutsu: "shinobiNoSho.ITEMS.tecnicas.subtipo.hijutsu",
				jikuukan: "shinobiNoSho.ITEMS.tecnicas.subtipo.jikuukan",
				shunjutsu: "shinobiNoSho.ITEMS.tecnicas.subtipo.shunjutsu",
				outro: "shinobiNoSho.ITEMS.tecnicas.subtipo.outro"
			},
			tipoJutsu: {
				ninjutsu: "shinobiNoSho.ITEMS.tecnicas.tipoJutsu.ninjutsu",
				genjutsu: "shinobiNoSho.ITEMS.tecnicas.tipoJutsu.genjutsu",
				taijutsu: "shinobiNoSho.ITEMS.tecnicas.tipoJutsu.taijutsu",
			},
			elemento: {
				katon: "shinobiNoSho.ITEMS.tecnicas.elemento.katon",
				fuuton: "shinobiNoSho.ITEMS.tecnicas.elemento.fuuton",
				raiton: "shinobiNoSho.ITEMS.tecnicas.elemento.raiton",
				doton: "shinobiNoSho.ITEMS.tecnicas.elemento.doton",
				suiton: "shinobiNoSho.ITEMS.tecnicas.elemento.suiton",
				outro: "shinobiNoSho.ITEMS.tecnicas.elemento.outro"
			},
			ranking: {
				e: "shinobiNoSho.ITEMS.tecnicas.ranking.e",
				d: "shinobiNoSho.ITEMS.tecnicas.ranking.d",
				c: "shinobiNoSho.ITEMS.tecnicas.ranking.c",
				b: "shinobiNoSho.ITEMS.tecnicas.ranking.b",
				a: "shinobiNoSho.ITEMS.tecnicas.ranking.a",
				s: "shinobiNoSho.ITEMS.tecnicas.ranking.s",
			},
			duracao: {
				instantanea: "shinobiNoSho.ITEMS.tecnicas.duracao.instantanea",
				concentracao: "shinobiNoSho.ITEMS.tecnicas.duracao.concentracao",
				sustentada: "shinobiNoSho.ITEMS.tecnicas.duracao.sustentada",
				continua: "shinobiNoSho.ITEMS.tecnicas.duracao.continua",
				permanente: "shinobiNoSho.ITEMS.tecnicas.duracao.permanente",
				vertexto: "shinobiNoSho.ITEMS.generico.acao.vertexto"
			}
		},
		armas: {
			tipoDano: {
				corte: "shinobiNoSho.ITEMS.armas.tipoDano.corte",
				perfuracao: "shinobiNoSho.ITEMS.armas.tipoDano.perfuracao",
				esmagamento: "shinobiNoSho.ITEMS.armas.tipoDano.esmagamento",
				fogo: "shinobiNoSho.ITEMS.armas.tipoDano.fogo"
			},
			tipo: {
				natural: "shinobiNoSho.ITEMS.armas.tipo.natural",
				simples: "shinobiNoSho.ITEMS.armas.tipo.simples",
				marcial: "shinobiNoSho.ITEMS.armas.tipo.marcial",
				especial: "shinobiNoSho.ITEMS.armas.tipo.especial"
			},
			subtipo: {
				leve: "shinobiNoSho.ITEMS.armas.subtipo.leve",
				mediana: "shinobiNoSho.ITEMS.armas.subtipo.mediana",
				longa: "shinobiNoSho.ITEMS.armas.subtipo.longa",
				pesada: "shinobiNoSho.ITEMS.armas.subtipo.pesada",
				arremesso: "shinobiNoSho.ITEMS.armas.subtipo.arremesso",
				disparo: "shinobiNoSho.ITEMS.armas.subtipo.disparo",
				explosivo: "shinobiNoSho.ITEMS.armas.subtipo.explosivo",
				municao: "shinobiNoSho.ITEMS.armas.subtipo.municao"
			}
		},
		armaduras: {
			tipo: {
				leve: "shinobiNoSho.ITEMS.armaduras.tipo.leve",
				pesada: "shinobiNoSho.ITEMS.armaduras.tipo.pesada"
			}
		},
		geral: {
			tipo: {
				comum: "shinobiNoSho.ITEMS.geral.tipo.comum",
				animais: "shinobiNoSho.ITEMS.geral.tipo.animais",
				veiculos: "shinobiNoSho.ITEMS.geral.tipo.veiculos",
				servicos: "shinobiNoSho.ITEMS.geral.tipo.servicos",
				dispositivoLeve: "shinobiNoSho.ITEMS.geral.tipo.dispositivoLeve",
				dispositivoPadrao: "shinobiNoSho.ITEMS.geral.tipo.dispositivoPadrao",
				dispositivoPesado: "shinobiNoSho.ITEMS.geral.tipo.dispositivoPesado",
			}
		},
		generico: {
			alcance: {
				pessoal: "shinobiNoSho.ITEMS.generico.alcance.pessoal",
				toque: "shinobiNoSho.ITEMS.generico.alcance.toque",
				distancia: "shinobiNoSho.ITEMS.generico.alcance.distancia",
			},
			acao: {
				padrao: "shinobiNoSho.ITEMS.generico.acao.padrao",
				movimento: "shinobiNoSho.ITEMS.generico.acao.movimento",
				parcial: "shinobiNoSho.ITEMS.generico.acao.parcial",
				livre: "shinobiNoSho.ITEMS.generico.acao.livre",
				reacao: "shinobiNoSho.ITEMS.generico.acao.reacao",
				completa: "shinobiNoSho.ITEMS.generico.acao.completa",
				vertexto: "shinobiNoSho.ITEMS.generico.acao.vertexto",
			},
			rarity: {
				common: "shinobiNoSho.ITEMS.generico.rarity.common",
				uncommon: "shinobiNoSho.ITEMS.generico.rarity.uncommon",
				rare: "shinobiNoSho.ITEMS.generico.rarity.rare",
				veryrare: "shinobiNoSho.ITEMS.generico.rarity.veryrare",
				legendary: "shinobiNoSho.ITEMS.generico.rarity.legendary",
				artifact: "shinobiNoSho.ITEMS.generico.rarity.artifact",
			}
		}
	}
}

shinobiNoSho.templateAreas = {
		onda: 'shinobiNoSho.ITEMS.areas.onda',
		linha: 'shinobiNoSho.ITEMS.areas.linha',
		esfera: 'shinobiNoSho.ITEMS.areas.esfera',
		cilindro: 'shinobiNoSho.ITEMS.areas.cilindro',
		circulo: 'shinobiNoSho.ITEMS.areas.circulo',
		cone: 'shinobiNoSho.ITEMS.areas.cone',
		meiaEsfera: 'shinobiNoSho.ITEMS.areas.meiaEsfera',
};

shinobiNoSho.regraDeArea = {
	porEspirito: "shinobiNoSho.ITEMS.regraDeArea.porEspirito",
	porInteligencia: "shinobiNoSho.ITEMS.regraDeArea.porInteligencia",
	porArte: "shinobiNoSho.ITEMS.regraDeArea.porArte",
	porLidarAnimais: "shinobiNoSho.ITEMS.regraDeArea.porLidarAnimais",
	porMecanismos: "shinobiNoSho.ITEMS.regraDeArea.porMecanismos",
	porRastrear: "shinobiNoSho.ITEMS.regraDeArea.porRastrear",
	custom: "shinobiNoSho.ITEMS.regraDeArea.custom"
};

shinobiNoSho.tamanhos = {
	minusculo: "shinobiNoSho.tamanhos.minusculo",
	diminuto: "shinobiNoSho.tamanhos.diminuto",
	miudo: "shinobiNoSho.tamanhos.miudo",
	pequeno: "shinobiNoSho.tamanhos.pequeno",
	medio: "shinobiNoSho.tamanhos.medio",
	grande: "shinobiNoSho.tamanhos.grande",
	enorme: "shinobiNoSho.tamanhos.enorme",
	imenso: "shinobiNoSho.tamanhos.imenso",
	colossal: "shinobiNoSho.tamanhos.colossal",
	incrivel: "shinobiNoSho.tamanhos.incrivel",
};

shinobiNoSho.tokenSizes = {
	minusculo: 0.5,
	diminuto: 0.5,
	miudo: 0.5,
	pequeno: 0.5,
	medio: 1,
	grande: 2,
	enorme: 3,
	imenso: 4,
	colossal: 5,
	incrivel: 6,
};

/**
 * A selection of actor attributes that can be tracked on token resource bars.
 * @type {string[]}
 * @deprecated since v10
 */
shinobiNoSho.trackableAttributes = [
  "attributes.vitalidade", "attributes.chakra", "attributes.absorcao"
];