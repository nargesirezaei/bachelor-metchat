import { Flex } from "./Flex";

export const Loading = () => {
  return (
    <Flex className="p-3 my-3" content="center" align="center">
      <div className="spinner-border" role="status">
        <span className="sr-only">Laster...</span>
      </div>
    </Flex>
  );
};
