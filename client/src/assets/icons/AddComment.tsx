import * as React from "react";

function AddCommentSVG(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48"
            viewBox="0 96 960 960"
            width="48"
            {...props}
        >
            <path
                xmlns="http://www.w3.org/2000/svg"
                d="M450 656h60V526h130v-60H510V336h-60v130H320v60h130v130ZM80 976V236q0-23 18-41.5t42-18.5h680q23 0 41.5 18.5T880 236v520q0 23-18.5 41.5T820 816H240L80 976Zm60-145 75-75h605V236H140v595Zm0-595v595-595Z"
            />{" "}
        </svg>
    );
}

export default AddCommentSVG;
