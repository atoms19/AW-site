import { useEffect, useRef } from "react";
import './Skills.css'
type category = 'frontend' | 'backend' | 'database' | 'devops' | 'other';
interface Skill {
	id: number,
	name: string,
	level: number,
	icon: string,
	category: category
	date: string,
};
function Ring({ categories,skills, index}: { categories: category[],skills:Skill[],index:number  }) {
     if (index >= categories.length) return null;

	  let level = 50;
	  let radius = level * (categories.length - index+1);
		return (
				<div className="ring" style={{ '--radius': `${radius}px` } as React.CSSProperties}>

				<div className="skills-ring">
				{skills.filter(skill => skill.category === categories[index]).map((skill,skillindex) => {
				  let noOfSkillsInCategory = skills.filter(s => s.category === categories[index]).length;
				  let degree = 360 / skills.filter(s => s.category === categories[index]).length * skills.filter(s => s.category === categories[index]).indexOf(skills.filter(s => s.category === categories[index])[0]);
              let skillIndex = skills.filter(s => s.category === categories[index]).indexOf(skill);
				  let degreeOffest = 0 + (360 / noOfSkillsInCategory) * skillindex;
				  return  (
  					<div key={skill.id} className="skill" style={{ '--angle': `${degree}deg`,
					 '--x': `${ level * Math.cos((degree+(30)*skillIndex) * (Math.PI / 180))}%`,
					 '--y': `${level * Math.sin(((degree+(30)*skillIndex) * (Math.PI / 180)))}%`
					} as React.CSSProperties}>
						<img src={skill.icon} alt={skill.name} style={{

							width: '40px',
							height: '40px',
							borderRadius: '50%',
							border: '2px solid #fff',
							boxShadow: '0 0 5px rgba(0,0,0,0.3)',
						}}/>
							<span>{skillIndex}{degree}</span> 
					</div>
				)})}
				</div>
					<Ring categories={categories} index={index+1} skills={skills}/> 
				</div>
		);
}



export default function Skills() {
    const skills: Skill[] = [
        { id: 1, name: 'React', level: 4, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', category: 'frontend', date: '2020-01-01' },
        { id: 2, name: 'Node.js', level: 3, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', category: 'backend', date: '2020-01-01' },
        { id: 3, name: 'MongoDB', level: 3, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', category: 'database', date: '2020-01-01' },
        { id: 4, name: 'Docker', level: 2, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', category: 'devops', date: '2020-01-01' },
        { id: 5, name: 'Git', level: 4, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', category: 'other', date: '2020-01-01' },
		  { id: 6, name: 'TypeScript', level: 4, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', category: 'frontend', date: '2020-01-01' },
		  { id: 7, name: 'Express', level: 3, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', category: 'backend', date: '2020-01-01' },
		  { id: 8, name: 'PostgreSQL', level: 3, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', category: 'database', date: '2020-01-01' },
		  { id: 9, name: 'Kubernetes', level: 2, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg', category: 'devops', date: '2020-01-01' },
		  { id: 10, name: 'Linux', level: 4, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', category: 'other', date: '2020-01-01' },
		  
    ];
		  let categories = Array.from(new Set(skills.map(skill => skill.category)));


    return (
		<div>
        <div className="skills-container">

		  <Ring categories={categories} index={0} skills={skills}/>

		  </div>
		  </div>
    );
}
