import './Tag.css';

// eslint-disable-next-line react/prop-types
const Tag = ({ label }) => {
    return (
        <div className="tag">
            {label}
        </div>
    );
}

export default Tag;
