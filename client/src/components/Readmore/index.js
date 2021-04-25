import React, {useState} from 'react';

const ReadMore = ({ children, textClass }) => {
	const text = children;
	const [isReadMore, setIsReadMore] = useState(true);
	const toggleReadMore = () => {
		setIsReadMore(!isReadMore);
	};
	return (
		<p className={`${textClass}`} style={{ whiteSpace: 'break-spaces' }}>
			{isReadMore ? (text+'').slice(0, 430) : text}
			<span onClick={toggleReadMore} className="read-or-hide">
			<h3 className="m3-text-teal">{isReadMore ? `read more` : `show less`}</h3>          
			</span>
		</p>
	);
};

export default ReadMore;