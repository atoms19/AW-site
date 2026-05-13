
export type category = 'frontend' | 'backend'  | 'devops' | 'languages';

interface Skill {
	id: number,
	name: string,
	level: number,
	icon: string,
	category: category
	date: string,
};

export type { Skill };

let count = 0;
class Skill{
  constructor(name:string) { 
	   this.id=count++;
	 	this.name = name;
  }
  belongsTo(category: category) {
	 	this.category = category;
		return this;
  }
  isLevel(level: number) {
	 this.level = level;
	 return this;
  }
  hasIcon(icon: string,variant="original") {
	 this.icon = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}/${icon}-${variant}.svg` 
	 return this;
  }
  startedOn(date: string) {
	 this.date = date;
	 return this;
  }
}

let MySkills: Skill[] = []
let addSkill = (skill:Skill) => MySkills.push(skill); 

addSkill(new Skill('React').belongsTo('frontend').isLevel(4).hasIcon('react').startedOn('2020-01-01'));
//backend 
addSkill(new Skill('cloudflare').belongsTo('backend').isLevel(3).hasIcon('cloudflare').startedOn('2025-01-01'));
addSkill(new Skill('PostgreSQL').belongsTo('backend').isLevel(3).hasIcon('postgresql').startedOn('2020-01-01'));
addSkill(new Skill('redis').belongsTo('backend').isLevel(2).hasIcon('redis').startedOn('2024-01-01'));
addSkill(new Skill('express').belongsTo('backend').isLevel(4).hasIcon('express').startedOn('2022-01-01'));
addSkill(new Skill('cloudflare-workers').belongsTo('backend').isLevel(3).hasIcon('cloudflareworkers').startedOn('2025-01-01'));
//addSkill(new Skill('AWS').belongsTo('backend').isLevel(3).hasIcon('amazonwebservices','wordmark').startedOn('2024-01-01'));
addSkill(new Skill('nestjs').belongsTo('backend').isLevel(4).hasIcon('nestjs').startedOn('2024-01-01'));
addSkill(new Skill('prisma').belongsTo('backend').isLevel(4).hasIcon('prisma').startedOn('2023-01-01'));


//languages 
addSkill(new Skill('TypeScript').belongsTo('languages').isLevel(4).hasIcon('typescript').startedOn('2022-01-01'));
addSkill(new Skill('Node.js').belongsTo('languages').isLevel(4).hasIcon('nodejs').startedOn('2020-01-01'));
addSkill(new Skill('rust').belongsTo('languages').isLevel(1).hasIcon('rust').startedOn('2026-01-01'));
addSkill(new Skill('java').belongsTo('languages').isLevel(3).hasIcon('java').startedOn('2018-01-01'));

//devops
addSkill(new Skill('linux').belongsTo('devops').isLevel(3).hasIcon('linux').startedOn('2024-01-01'));
addSkill(new Skill('Docker').belongsTo('devops').isLevel(3).hasIcon('docker').startedOn('2023-02-01'));
addSkill(new Skill('git').belongsTo('devops').isLevel(4).hasIcon('git').startedOn('2018-01-01'));


//frontend 
addSkill(new Skill('Next.js').belongsTo('frontend').isLevel(4).hasIcon('nextjs').startedOn('2022-01-01'));
addSkill(new Skill('Tailwind CSS').belongsTo('frontend').isLevel(4).hasIcon('tailwindcss').startedOn('2022-01-01'));
addSkill(new Skill('react').belongsTo('frontend').isLevel(4).hasIcon('react').startedOn('2021-01-01'));
addSkill(new Skill('vue').belongsTo('frontend').isLevel(2).hasIcon('vuejs').startedOn('2022-01-01'));
addSkill(new Skill('svelte').belongsTo('frontend').isLevel(1).hasIcon('svelte').startedOn('2022-01-01'));


export { MySkills };
