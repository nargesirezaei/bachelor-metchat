import classNames from "classnames";

export const Interesser = ({ interess, isActive, onClick, className }) => {
    return (
        <>
            <button
                className={classNames("intress-btn me-2", className, {
                    active: isActive,
                })}
                onClick={onClick}
            >
                {interess.title}
            </button>
        </>
    );
};
