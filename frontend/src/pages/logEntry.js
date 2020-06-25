import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const LogEntry = ({ onLogEntry }) => {
    const [factorOfWellbeing, setFactorOfWellbeing] = useState('');
    const [annotation, setAnnotation] = useState('');

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onLogEntry({ factorOfWellbeing, annotation});
    };

    return (
        <div>
        <form onSubmit={handleSubmit}>
    <input
    type="number"
    placeholder="Factor of Wellbeing"
    value={factorOfWellbeing}
    onChange={(event) => {
        setFactorOfWellbeing(event.target.value);
    }}
    />
    <input
    type="text"
    placeholder="Personal Annotaion"
    value={annotation}
    onChange={(event) => {
        setAnnotation(event.target.value);
    }}
    />

    <input type="submit" />
        </form>
        <Link to="/overview">Click to submit</Link>
    </div>
);
};
