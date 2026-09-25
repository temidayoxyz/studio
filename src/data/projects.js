/**
 * The index — fifty shipped sites.
 *
 * `slug`      verified against the live deployment (non-ASCII names are transliterated,
 *             e.g. "Rörliga" → rorliga, "Måne" → mane — never stripped).
 * `brand`     the project's own accent, read out of its compiled CSS.
 * `lit`       the same hue lifted into a legible register for use on the dark plates.
 * `deep`      the same hue dropped, for swatches shown on paper.
 * `face`      the specimen face its name is set in.
 * `mark`      monogram tile treatment.
 */

import { siteUrl } from './studio.js'

export const DISCIPLINES = [
  'Craft & Goods',
  'Food & Drink',
  'Culture',
  'Hospitality',
  'Outdoors',
  'Health',
  'Professional',
  'Product & Tech',
  'The studio',
]

export const PROJECTS = [
  {
    n: 1, name: 'Aureline', slug: 'aureline', discipline: 'Craft & Goods', place: 'Provence, France',
    blurb: 'Small-batch botanical skincare. Every ingredient named, every bottle numbered.',
    face: 'serif', mark: 'hairline',
    brand: '#9C6B4A', lit: '#ECA372', deep: '#A16942',
  },
  {
    n: 2, name: 'Formwork', slug: 'formwork', discipline: 'Professional', place: 'Copenhagen, Denmark',
    blurb: 'A studio designing civic and cultural buildings — libraries, concert halls, public institutions.',
    face: 'grotesk', mark: 'lower',
    brand: '#6FA3C4', lit: '#6EC0F2', deep: '#4688AF',
  },
  {
    n: 3, name: 'Kroma', slug: 'kroma', discipline: 'Product & Tech', place: 'Zurich, Switzerland',
    blurb: 'Precision analog synthesizers and mastering-grade audio hardware, built in small runs.',
    face: 'geo', mark: 'notch',
    brand: '#E0452B', lit: '#FF7D60', deep: '#DC4127',
  },
  {
    n: 4, name: 'Northern Current', slug: 'northern-current', discipline: 'Food & Drink', place: 'Bergen, Norway',
    blurb: 'Small-lot specialty coffee, roasted in Bergen, with transparent sourcing and a journal.',
    face: 'serif', mark: 'ring',
    brand: '#C8552B', lit: '#FF8F66', deep: '#C8552B',
  },
  {
    n: 5, name: 'Meridian', slug: 'meridian', discipline: 'Craft & Goods', place: 'La Chaux-de-Fonds, Switzerland',
    blurb: 'Mechanical watches built by hand in small series, on movements of its own design.',
    face: 'display', mark: 'bar',
    brand: '#C9A25A', lit: '#D9AF61', deep: '#9F7930',
  },
  {
    n: 6, name: 'Hellige', slug: 'hellige', discipline: 'Culture', place: 'Malmö, Sweden',
    blurb: 'A museum of modern and contemporary art. Current exhibition, programme, archive.',
    face: 'grotesk', mark: 'notch',
    brand: '#2E4FB0', lit: '#86B1FF', deep: '#2E4FB0',
  },
  {
    n: 7, name: 'Fjellverk', slug: 'fjellverk', discipline: 'Outdoors', place: 'Oslo, Norway',
    blurb: 'Packs, tents and shells tested where they are made — in the mountains above the city.',
    face: 'geo', mark: 'solid',
    brand: '#E8572A', lit: '#FF8257', deep: '#D94818',
  },
  {
    n: 8, name: 'Blue Hour', slug: 'blue-hour', discipline: 'Culture', place: 'Copenhagen, Denmark',
    blurb: 'An independent jazz label. New music on vinyl, recorded live, pressed in small runs.',
    face: 'display', mark: 'ring',
    brand: '#C77B2E', lit: '#F1A258', deep: '#B66C19',
  },
  {
    n: 9, name: 'Halvorsen & Voss', slug: 'halvorsen-voss', discipline: 'Professional', place: 'Bergen, Norway',
    blurb: 'A law firm practising commercial, maritime and dispute resolution since 1947.',
    face: 'serif', mark: 'bar',
    brand: '#7A2E2B', lit: '#F39A93', deep: '#7A2E2B',
  },
  {
    n: 10, name: 'Hav', slug: 'hav', discipline: 'Hospitality', place: 'Oslo, Norway',
    blurb: 'A seafood restaurant on the fjord. Twelve courses, one ocean, a kitchen that follows the tide.',
    face: 'display', mark: 'hairline',
    brand: '#C9A24B', lit: '#D7B059', deep: '#9F7A1A',
  },
  {
    n: 11, name: 'Lattice', slug: 'lattice', discipline: 'Product & Tech', place: null,
    blurb: 'A background job platform for engineering teams — reliable queues, scheduling, observability.',
    face: 'grotesk', mark: 'lower',
    brand: '#1A5CFF', lit: '#5EAAFF', deep: '#1A5CFF',
  },
  {
    n: 12, name: 'Sigrid Dahl', slug: 'sigrid-dahl', discipline: 'Culture', place: 'Reykjavík, Iceland',
    blurb: 'Documentary photography of the North Atlantic’s fishing communities.',
    face: 'serif', mark: 'notch',
    brand: '#C74E36', lit: '#FF8C71', deep: '#C74E36',
  },
  {
    n: 13, name: 'Leire', slug: 'leire', discipline: 'Craft & Goods', place: 'Copenhagen, Denmark',
    blurb: 'Functional ceramics thrown by hand, glazed in small batches, fired in their own kiln.',
    face: 'display', mark: 'ring',
    brand: '#B0653A', lit: '#F0A074', deep: '#B0653A',
  },
  {
    n: 14, name: 'Kvart', slug: 'kvart', discipline: 'Culture', place: 'Copenhagen, Denmark',
    blurb: 'An independent publishing house. Twelve books a year on the Nordic landscape.',
    face: 'geo', mark: 'bar',
    brand: '#A3542C', lit: '#F49D75', deep: '#A3542C',
  },
  {
    n: 15, name: 'Halde', slug: 'halde', discipline: 'Food & Drink', place: 'Wachau, Austria',
    blurb: 'A family wine estate on the steep terraces of the Wachau valley. Grüner Veltliner, Riesling, time.',
    face: 'serif', mark: 'solid',
    brand: '#6E1E2A', lit: '#F5989D', deep: '#6E1E2A',
  },
  {
    n: 16, name: 'Klint', slug: 'klint', discipline: 'Craft & Goods', place: 'Copenhagen, Denmark',
    blurb: 'Steel bicycles, hand-welded in a Copenhagen workshop, made for the city and the roads beyond it.',
    face: 'grotesk', mark: 'bar',
    brand: '#E8B93A', lit: '#E8B93A', deep: '#A57800',
  },
  {
    n: 17, name: 'Korn', slug: 'korn', discipline: 'Food & Drink', place: 'Copenhagen, Denmark',
    blurb: 'Sourdough, rye and laminated pastries baked overnight in Nørrebro, and gone by noon.',
    face: 'display', mark: 'lower',
    brand: '#E4B368', lit: '#E4B368', deep: '#A57628',
  },
  {
    n: 18, name: 'Sillage', slug: 'sillage', discipline: 'Craft & Goods', place: 'Paris, France',
    blurb: 'A parfumerie compounding scents by hand in small batches. Eight perfumes, one idea.',
    face: 'serif', mark: 'ring',
    brand: '#D99A5E', lit: '#E7A76A', deep: '#AD7134',
  },
  {
    n: 19, name: 'Stilla', slug: 'stilla', discipline: 'Hospitality', place: 'Småland, Sweden',
    blurb: 'Nine cabins on a lake. Silence, forest, and a sauna that faces the water.',
    face: 'display', mark: 'hairline',
    brand: '#5C7259', lit: '#8EC787', deep: '#4C7846',
  },
  {
    n: 20, name: 'Socker', slug: 'socker', discipline: 'Food & Drink', place: 'Stockholm, Sweden',
    blurb: 'Bean-to-bar chocolate from single-origin cacao, in batches of four hundred bars.',
    face: 'geo', mark: 'notch',
    brand: '#C89B3C', lit: '#DCAE51', deep: '#A47803',
  },
  {
    n: 21, name: 'Rörliga', slug: 'rorliga', discipline: 'Culture', place: 'Stockholm, Sweden',
    blurb: 'A documentary film festival, and the year of moving images it puts on.',
    face: 'grotesk', mark: 'solid',
    brand: '#D64541', lit: '#FF8076', deep: '#D64541',
  },
  {
    n: 22, name: 'Styrka', slug: 'styrka', discipline: 'Health', place: 'Gothenburg, Sweden',
    blurb: 'Barbells, kettlebells and coaching that treats lifting as a skill, not a punishment.',
    face: 'geo', mark: 'bar',
    brand: '#C8F135', lit: '#C8F135', deep: '#6E9000',
  },
  {
    n: 23, name: 'Tråd', slug: 'trad', discipline: 'Craft & Goods', place: 'Copenhagen, Denmark',
    blurb: 'Sweaters knitted by hand from traceable Nordic wool, in small numbered runs.',
    face: 'serif', mark: 'lower',
    brand: '#6E5C44', lit: '#EDB170', deep: '#A47641',
  },
  {
    n: 24, name: 'Mun', slug: 'mun', discipline: 'Health', place: 'Copenhagen, Denmark',
    blurb: 'Modern dentistry in Østerbro, with honest prices and appointments that start on time.',
    face: 'grotesk', mark: 'ring',
    brand: '#1E8A8A', lit: '#50CBCB', deep: '#1E8A8A',
  },
  {
    n: 25, name: 'Nordfärd', slug: 'nordfard', discipline: 'Hospitality', place: 'Gothenburg, Sweden',
    blurb: 'Small expedition voyages along the Arctic coast. Sixty guests, two scientists, the slow route north.',
    face: 'display', mark: 'hairline',
    brand: '#E8B93A', lit: '#EFBF42', deep: '#A57800',
  },
  {
    n: 26, name: 'Kvarter', slug: 'kvarter', discipline: 'Professional', place: 'Stockholm, Sweden',
    blurb: 'Residential development in the growing districts — brick, wood, balconies that face the street.',
    face: 'grotesk', mark: 'notch',
    brand: '#B4522E', lit: '#FF9671', deep: '#B4522E',
  },
  {
    n: 27, name: 'Stråke', slug: 'strake', discipline: 'Craft & Goods', place: 'Gothenburg, Sweden',
    blurb: 'New violins, restorations and bows, made by hand in one room since 1994.',
    face: 'serif', mark: 'bar',
    brand: '#C9A24B', lit: '#DEB660', deep: '#9F7A1A',
  },
  {
    n: 28, name: 'Växthus', slug: 'vaxthus', discipline: 'Outdoors', place: 'Malmö, Sweden',
    blurb: 'A plant nursery. Indoor plants grown slowly, and a potting bench that is always open.',
    face: 'geo', mark: 'lower',
    brand: '#C89B3C', lit: '#E3B458', deep: '#A47803',
  },
  {
    n: 29, name: 'Signal', slug: 'signal', discipline: 'Culture', place: 'Stockholm, Sweden',
    blurb: 'A podcast studio and independent audio publisher. Eight shows, one room.',
    face: 'display', mark: 'notch',
    brand: '#2E6FD8', lit: '#70B4FF', deep: '#2E6FD8',
  },
  {
    n: 30, name: 'Leksak', slug: 'leksak', discipline: 'Craft & Goods', place: 'Copenhagen, Denmark',
    blurb: 'Wooden blocks, cars and stacking toys, sanded by hand and built to be played with for years.',
    face: 'display', mark: 'solid',
    brand: '#D95C3B', lit: '#FF8B69', deep: '#CF5332',
  },
  {
    n: 31, name: 'Kontoret', slug: 'kontoret', discipline: 'Professional', place: 'Malmö, Sweden',
    blurb: 'Bookkeeping, payroll and taxes for small businesses, by people who answer the phone.',
    face: 'grotesk', mark: 'ring',
    brand: '#C9A24B', lit: '#D0AA52', deep: '#9F7A1A',
  },
  {
    n: 32, name: 'Brygg', slug: 'brygg', discipline: 'Food & Drink', place: 'Tromsø, Norway',
    blurb: 'Six beers, brewed under the midnight sun since 2012, poured by the water.',
    face: 'geo', mark: 'hairline',
    brand: '#D98E2B', lit: '#F0A345', deep: '#B56D00',
  },
  {
    n: 33, name: 'Studio N', slug: 'studio-n', discipline: 'Craft & Goods', place: 'Oslo, Norway',
    blurb: 'Rings, pendants and commissioned pieces in silver and gold, made one at a time.',
    face: 'serif', mark: 'notch',
    brand: '#C8A24B', lit: '#D7B05A', deep: '#9F7A1B',
  },
  {
    n: 34, name: 'Fritid', slug: 'fritid', discipline: 'Outdoors', place: 'Gothenburg, Sweden',
    blurb: 'A sailing club — lessons for children and adults, and a fleet of club boats.',
    face: 'display', mark: 'bar',
    brand: '#D84A2A', lit: '#FF8362', deep: '#D74929',
  },
  {
    n: 35, name: 'Varmt', slug: 'varmt', discipline: 'Hospitality', place: 'Helsinki, Finland',
    blurb: 'A sauna house by the water, and a cold one hidden under the stairs.',
    face: 'geo', mark: 'lower',
    brand: '#C4501F', lit: '#FF8F61', deep: '#C4501F',
  },
  {
    n: 36, name: 'Nabo', slug: 'nabo', discipline: 'Culture', place: 'Copenhagen, Denmark',
    blurb: 'An independent bookstore — new fiction, translated literature, a reading room, coffee.',
    face: 'serif', mark: 'ring',
    brand: '#C98A3D', lit: '#E8A75B', deep: '#AE711E',
  },
  {
    n: 37, name: 'Siv', slug: 'siv', discipline: 'Craft & Goods', place: 'Stockholm, Sweden',
    blurb: 'Heirloom throws, scarves and table runners, woven on wooden looms from Swedish wool and linen.',
    face: 'display', mark: 'solid',
    brand: '#A8532F', lit: '#F79B76', deep: '#A8532F',
  },
  {
    n: 38, name: 'Havne', slug: 'havne', discipline: 'Food & Drink', place: 'Bergen, Norway',
    blurb: 'A fish market on the quay, and a restaurant that cooks what the day’s boats bring in.',
    face: 'grotesk', mark: 'hairline',
    brand: '#E2703A', lit: '#FF915C', deep: '#CA5A21',
  },
  {
    n: 39, name: 'Fjell', slug: 'fjell', discipline: 'Outdoors', place: 'Norway',
    blurb: '214 volunteer mountain rescuers, on call 365 nights a year. We go out so you can go up.',
    face: 'geo', mark: 'notch',
    brand: '#E8532C', lit: '#FF805A', deep: '#DA461D',
  },
  {
    n: 40, name: 'Kompass', slug: 'kompass', discipline: 'Hospitality', place: 'Copenhagen, Denmark',
    blurb: 'Slow rail journeys through Europe — sleeper trains, small stations, and the places in between.',
    face: 'display', mark: 'bar',
    brand: '#D98E32', lit: '#F0A34B', deep: '#B56D00',
  },
  {
    n: 41, name: 'Trehus', slug: 'trehus', discipline: 'Hospitality', place: 'Hemsedal, Norway',
    blurb: 'Three wooden cabins with wood stoves, silent forests, and the best mountain light in the valley.',
    face: 'serif', mark: 'lower',
    brand: '#C8552E', lit: '#FF8F68', deep: '#C8552E',
  },
  {
    n: 42, name: 'Måne', slug: 'mane', discipline: 'Craft & Goods', place: 'Copenhagen, Denmark',
    blurb: 'A perfumery with three scents, named for the moon.',
    face: 'display', mark: 'ring',
    brand: '#B98A2F', lit: '#DDAD56', deep: '#A57713',
  },
  {
    n: 43, name: 'Bølge', slug: 'bolge', discipline: 'Outdoors', place: 'Klitmøller, Denmark',
    blurb: 'Surf lessons on the North Sea. Wetsuits all year, and the friendliest cold water in Europe.',
    face: 'grotesk', mark: 'solid',
    brand: '#E2572B', lit: '#FF855A', deep: '#D64C1E',
  },
  {
    n: 44, name: 'Ur', slug: 'ur', discipline: 'Craft & Goods', place: 'Uppsala, Sweden',
    blurb: 'An independent watchmaker, at a bench by the window, on a street of small shops.',
    face: 'serif', mark: 'notch',
    brand: '#B08D4F', lit: '#DAAE61', deep: '#9C7A3C',
  },
  {
    n: 45, name: 'Kino', slug: 'kino', discipline: 'Culture', place: 'Oslo, Norway',
    blurb: 'An independent cinema — two screens, one bar, and a programmer with opinions.',
    face: 'geo', mark: 'bar',
    brand: '#A32C2C', lit: '#FF8A82', deep: '#A32C2C',
  },
  {
    n: 46, name: 'Atlas', slug: 'atlas', discipline: 'Craft & Goods', place: 'Berlin, Germany',
    blurb: 'A map shop and letterpress studio — antique maps, custom city charts, printing that leaves a dent.',
    face: 'display', mark: 'hairline',
    brand: '#B5482A', lit: '#FF9071', deep: '#B5482A',
  },
  {
    n: 47, name: 'Haven', slug: 'haven', discipline: 'Outdoors', place: 'Rotterdam, Netherlands',
    blurb: '84 plots, a greenhouse, chickens, and neighbours who grow dinner together. Everyone is welcome.',
    face: 'serif', mark: 'lower',
    brand: '#C8502E', lit: '#FF8D69', deep: '#C8502E',
  },
  {
    n: 48, name: 'Rytme', slug: 'rytme', discipline: 'Culture', place: 'Copenhagen, Denmark',
    blurb: 'A music school and rehearsal studio — lessons, twelve soundproofed rooms, and a stage.',
    face: 'grotesk', mark: 'ring',
    brand: '#E84B6B', lit: '#FF7993', deep: '#DA3D60',
  },
  {
    n: 49, name: 'Sol', slug: 'sol', discipline: 'Professional', place: 'Amsterdam, Netherlands',
    blurb: 'A member-owned solar cooperative — 47 rooftops, 2,300 members, energy that belongs to them.',
    face: 'geo', mark: 'solid',
    brand: '#F5A623', lit: '#F5A623', deep: '#B86D00',
  },
  {
    n: 50, name: 'Studio', slug: 'studio', discipline: 'The studio', place: null,
    blurb: 'This index. Fifty independent sites, one room, and the method that produced them.',
    face: 'display', mark: 'notch',
    brand: '#C9A227', lit: '#D8B13B', deep: '#A07A00',
  },
]

export const url = (p) => siteUrl(p.slug)
