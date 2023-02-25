'use strict';

const fs = require('fs');

function compare_by_power(a,b) {
  if (a.power < b.power)
     return -1;
  if (a.power > b.power)
    return 1;
  return 0;
}

const troups_filename = 'troups.json';
//const troups_filename = 'troups_challenge.json';
const power_filename = 'power.json';
//const power_filename = 'power.json';

let troups_raw = fs.readFileSync(troups_filename);
let troups_data = JSON.parse(troups_raw);

let power_raw = fs.readFileSync(power_filename);
let power_data = JSON.parse(power_raw);

let troups_enriched = troups_data.map(i_troup => {
  return {
    ...i_troup,
    power: power_data[i_troup.name].by_lvl[i_troup.lvl - 1].attack_power
  };
});

console.dir(troups_enriched.sort(compare_by_power), {'maxArrayLength': null});

// wind_swordman 3
// wind_swordman 4
// wind_swordman 5
// wind_swordman 6
// wind_swordman 7
// infernal_warlock 2
// infernal_warlock 3
// infernal_warlock 4
// infernal_warlock 5
// infernal_warlock 6
// infernal_warlock 7
// priest 7
// ancient_dragon 6
// ancient_dragon 7
// frost_archers 7
// templar 6
// templar 7
// mace_warriors 7
// air_bender 1
// air_bender 7
// gale_rider 1
// gale_rider 6
// gale_rider 7
// frost_titan 7
// frost_titan 8
// gale_rider 8
// air_bender 8
// mace_warriors 8
// templar 8
// frost_archers 8
// ancient_dragon 8
// priest 8
// infernal_warlock 8
// wind_swordman 8
// frost_titan 9
// gale_rider 9
// air_bender 9
// mace_warriors 9
// templar 9
// frost_archers 9
// ancient_dragon 9
// priest 9
// infernal_warlock 9
// wind_swordman 9


// phase_apostle 6
// phase_apostle 7
// spellbreakers 7
// engulfing_dragon 7
// lighting_mage 7
// lighting_mage 8
// engulfing_dragon 8
// hunting_gunner 8
// nuns 8
// colossus 8
// crossbower 8
// lapidating_giant 8
// brawler 8
// spear_thrower 8
// berserker 8
// spellbreakers 8
// phase_apostle 8
// giant 8
// force_mage 8
// lighting_mage 9
// engulfing_dragon 9
// hunting_gunner 9
// nuns 9
// colossus 9
// crossbower 9
// lapidating_giant 9
// brawler 9
// spear_thrower 9
// berserker 9
// spellbreakers 9
// phase_apostle 9
// heal_wizards 9
// giant 9
// force_mage 9



// axe_thrower 9
// draugr 9
// drakes 9
// shadow_assassins 9
// dwarf_warriors 9
// hallberdies 9
// snowman 9
// shadow_ghosts 9
// rogue 9
// artic_wolves 9
// fire_mage 9


// archers 3
// archers 6
// archers 7
// spearmen 7
// royal_guards 8
// musketeers 8
// bomber 8
// spearmen 8
// archers 8
// swordsmen 8
// royal_guards 9
// musketeers 9
// bomber 9
// spearmen 9
// archers 9
// swordsmen 9

