import { MutatingDots } from 'react-loader-spinner';
import { LoaderWrapper } from './Loader.styled';

const Loader = () => {
  return (
    <LoaderWrapper>
      <MutatingDots
        height="100"
        width="100"
        color="rgb(63, 81, 181)"
        secondaryColor="rgb(63, 81, 181)"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </LoaderWrapper>
  );
};

export default Loader;
