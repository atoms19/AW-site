import { useEffect, useRef } from "react";
import './Skills.css'
import type { category,Skill} from "./skill-config.ts";
import {MySkills} from "./skill-config.ts";



function Ring({ categories,skills, index}: { categories: category[],skills:Skill[],index:number  }) {
     if (index >= categories.length) return null; 
	  let radius = (categories.length - index)*10;
     let r = radius/2;
		return (
				<div className="ring" style={{ '--radius': `${radius}vw` } as React.CSSProperties}>
				<div className="skills-ring">
				{/*filter skills by category since each ring represents a category , we first filter the skills by the category of that ring*/}
				{skills.filter(skill => skill.category === categories[index]).map((skill,skillindex,filteredSkills) => {
            let degree = (Math.PI*2) * (skillindex/filteredSkills.length);
				  return  (
  					<div key={skill.id} className="skill" style={{ '--angle': `${degree}deg`,
					  '--x':`${r+(r*Math.cos(degree))}vw`,
					  '--y':`${r+(r*Math.sin(degree))}vw`
					} as React.CSSProperties}>
						<img src={skill.icon} className={'skill-image'} alt={skill.name} style={{
					}}/>
					</div>
				)})}
				</div>
					<Ring categories={categories} index={index+1} skills={skills}/> 
				</div>
		);
}



export default function Skills() {
        let skills =MySkills;
		  let categories = Array.from(new Set(skills.map(skill => skill.category)));


    return (
		<div>
        <div className="skills-container">

		  <Ring categories={categories} index={0} skills={skills}/>

		  </div>
		  </div>
    );
}
