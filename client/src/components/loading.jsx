import { Flex } from "./Flex";

export const Loading = () => {
    return (
        <Flex className="p-3 my-3" content="center" align="center">
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </Flex>
    );
};
