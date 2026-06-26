import { useState } from "react"

export default function Toc({ headings = [] }: any) {
	let [hidden, setHidden] = useState(false);

	return (
		<>
			<div className="toc">
				<button onClick={() => setHidden(!hidden)}>
					{hidden ? "toc" : "hide"}
				</button>

				{!hidden && (
					<div>
						{headings.map((heading: any) => (
							<div style={{ marginLeft: `${(heading.depth - 1) * 20}px` }} key={heading.slug}>
								<a href={`#${heading.slug}`}>{heading.text}</a>
							</div>
						))}
					</div>
				)}

			</div>
		</>
	)
}
