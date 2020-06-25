import React, { Fragment } from 'react';

/* 
LOGS LOOK LIKE THIS:

[{
    _id: number,
    referenceDate: Date,
    factorOfWellbeing: number,
    annotation: string
}]

*/

export const Overview = ({ logs }) => {
	return (
		<div>
			{logs.map((log) => (
				<p key={log._id}>
					date: {log.referenceDate.toString()}, factorOfWellbeing: {log.factorOfWellbeing},
					annotation: {log.annotation}
				</p>
			))}
		</div>
	);
};
